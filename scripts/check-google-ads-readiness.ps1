$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$scriptPath = Join-Path $root "script.js"
$privacyPath = Join-Path $root "privacy-policy.html"
$robotsPath = Join-Path $root "robots.txt"
$sitemapPath = Join-Path $root "sitemap.xml"
$riskyClaimsPath = Join-Path $PSScriptRoot "google-ads-risky-claims.txt"

$failures = [System.Collections.Generic.List[string]]::new()

function Require-File {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        $failures.Add("Missing required file: $Path")
    }
}

function Require-Match {
    param(
        [string]$Content,
        [string]$Pattern,
        [string]$Message
    )
    if ($Content -notmatch $Pattern) {
        $failures.Add($Message)
    }
}

function Reject-Match {
    param(
        [string]$Content,
        [string]$Pattern,
        [string]$Message
    )
    if ($Content -match $Pattern) {
        $failures.Add($Message)
    }
}

Require-File $indexPath
Require-File $scriptPath
Require-File $privacyPath
Require-File $robotsPath
Require-File $sitemapPath
Require-File $riskyClaimsPath

if ($failures.Count -eq 0) {
    $index = Get-Content -LiteralPath $indexPath -Raw -Encoding utf8
    $clientScript = Get-Content -LiteralPath $scriptPath -Raw -Encoding utf8
    $privacy = Get-Content -LiteralPath $privacyPath -Raw -Encoding utf8
    $robots = Get-Content -LiteralPath $robotsPath -Raw -Encoding utf8
    $sitemap = Get-Content -LiteralPath $sitemapPath -Raw -Encoding utf8
    $publicContent = "$index`n$clientScript`n$privacy`n$robots`n$sitemap"

    Require-Match $index 'AW-18220207101' "Google Ads tag AW-18220207101 is missing from index.html."
    Require-Match $index 'id="privacyConsent"' "The lead form consent checkbox is missing."
    Require-Match $clientScript 'privacyConsent\.checked' "The lead form does not enforce consent before WhatsApp."
    Require-Match $index 'href="privacy-policy\.html"' "The public privacy policy link is missing."
    Require-Match $privacy '<h1>.+</h1>' "The privacy policy page has no visible H1 heading."
    Require-Match $index '<link rel="canonical" href="https://www\.tuba\.kz/">' "Homepage canonical must use https://www.tuba.kz/."
    Require-Match $robots 'Sitemap:\s+https://www\.tuba\.kz/sitemap\.xml' "robots.txt sitemap URL must use the canonical www host."
    Require-Match $sitemap '<loc>https://www\.tuba\.kz/</loc>' "sitemap.xml must contain the canonical homepage URL."
    Require-Match $sitemap '<loc>https://www\.tuba\.kz/privacy-policy\.html</loc>' "sitemap.xml must contain the privacy policy URL."

    Reject-Match $publicContent 'href="#"' "Placeholder href=# link found in public files."
    Reject-Match $publicContent 'https://tuba\.kz/' "Non-canonical https://tuba.kz/ URL found; use https://www.tuba.kz/."

    $riskyClaims = Get-Content -LiteralPath $riskyClaimsPath -Encoding utf8 |
        Where-Object { $_ -and -not $_.StartsWith("#") }

    foreach ($claim in $riskyClaims) {
        Reject-Match $publicContent $claim "Unverified advertising claim detected: $claim"
    }
}

if ($failures.Count -gt 0) {
    Write-Host "Google Ads readiness check FAILED:" -ForegroundColor Red
    foreach ($failure in $failures) {
        Write-Host " - $failure" -ForegroundColor Red
    }
    exit 1
}

Write-Host "Google Ads readiness check PASSED." -ForegroundColor Green
Write-Host "Verified: Google tag, privacy policy, consent, canonical host, discovery files, and risky-claim guardrails."
