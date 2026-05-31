/* Client-side logic for tuba.kz custom furniture store */

// Target WhatsApp Configuration
const WA_NUMBER = "77479043494";

/* 1. Header Scroll Effect */
const header = document.getElementById("siteHeader");

function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

/* 2. Theme Toggler (Light & Dark Theme) */
const themeToggle = document.getElementById("themeToggle");
const sunIcon = themeToggle.querySelector(".sun-icon");
const moonIcon = themeToggle.querySelector(".moon-icon");

// Check previous settings or system defaults
const savedTheme = localStorage.getItem("tuba-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
  document.documentElement.setAttribute("data-theme", "dark");
  sunIcon.style.display = "block";
  moonIcon.style.display = "none";
} else {
  document.documentElement.setAttribute("data-theme", "light");
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("tuba-theme", "light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("tuba-theme", "dark");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
});

/* 3. Mobile Navigation Burger overlay */
const burgerToggle = document.getElementById("burgerToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

function toggleMobileMenu() {
  const isExpanded = burgerToggle.getAttribute("aria-expanded") === "true";
  burgerToggle.setAttribute("aria-expanded", !isExpanded);
  header.classList.toggle("menu-open");
  mobileMenu.classList.toggle("is-active");
  
  if (!isExpanded) {
    document.body.style.overflow = "hidden"; // Disable scroll when menu is open
  } else {
    document.body.style.overflow = ""; // Enable scroll
  }
}

burgerToggle.addEventListener("click", toggleMobileMenu);

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    burgerToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("menu-open");
    mobileMenu.classList.remove("is-active");
    document.body.style.overflow = "";
  });
});

/* 4. Style Laboratory Tabs Morphing */
const styleOptions = document.querySelectorAll(".style-option");
const stylePreviewImage = document.getElementById("stylePreviewImage");
const stylePreviewTag = document.getElementById("stylePreviewTag");
const stylePreviewTitle = document.getElementById("stylePreviewTitle");
const stylePreviewText = document.getElementById("stylePreviewText");

styleOptions.forEach(option => {
  option.addEventListener("click", () => {
    // Remove active state
    styleOptions.forEach(opt => {
      opt.classList.remove("is-active");
      opt.setAttribute("aria-selected", "false");
    });
    
    // Add active state to clicked tab
    option.classList.add("is-active");
    option.setAttribute("aria-selected", "true");
    
    // Apply fade-out animation classes
    stylePreviewImage.style.opacity = "0.3";
    stylePreviewImage.style.transform = "scale(0.98)";
    
    setTimeout(() => {
      // Change contents
      stylePreviewImage.src = option.dataset.image;
      stylePreviewImage.alt = option.dataset.title;
      stylePreviewTag.textContent = option.dataset.style;
      stylePreviewTitle.textContent = option.dataset.title;
      stylePreviewText.textContent = option.dataset.text;
      
      // Apply fade-in back
      stylePreviewImage.style.opacity = "1";
      stylePreviewImage.style.transform = "scale(1)";
    }, 200);
    
    // Auto-update Style select field in Calculator form
    const formStyle = document.getElementById("style");
    if (formStyle) {
      formStyle.value = option.dataset.style;
      updateLeadSummary();
    }
  });
});

/* 5. Portfolio Category Filter Logic */
const filterButtons = document.querySelectorAll(".filter-btn");
const categoryGroups = document.querySelectorAll(".portfolio-category-group");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    
    const filterValue = button.dataset.filter;
    
    categoryGroups.forEach(group => {
      const category = group.dataset.category;
      if (filterValue === "all" || category === filterValue) {
        group.classList.remove("hidden");
      } else {
        group.classList.add("hidden");
      }
    });
  });
});

/* 6. Portfolio Image Lightbox Modal */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    const src = item.dataset.src;
    const title = item.dataset.title;
    lightboxImage.src = src;
    lightboxImage.alt = title;
    lightboxCaption.innerHTML = `<strong>${title}</strong>`;
    
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* 7. Kazakhstan Telephone Autocorrector & Auto-masking */
function formatKzPhone(value) {
  let digits = value.replace(/\D/g, "");
  
  // Normalize leading character (usually 8 or 7)
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }
  if (!digits.startsWith("7") && digits.length > 0) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);
  
  // Build mask +7 (7XX) XXX-XX-XX
  let formatted = "";
  if (digits.length > 0) {
    formatted = "+7";
  }
  if (digits.length > 1) {
    formatted += " (" + digits.slice(1, 4);
  }
  if (digits.length >= 4) {
    formatted += ") ";
  }
  if (digits.length > 4) {
    formatted += digits.slice(4, 7);
  }
  if (digits.length > 7) {
    formatted += "-" + digits.slice(7, 9);
  }
  if (digits.length > 9) {
    formatted += "-" + digits.slice(9, 11);
  }
  return formatted;
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    phoneInput.value = formatKzPhone(phoneInput.value);
    
    // Clear validation styles
    phoneInput.classList.remove("error");
    phoneError.classList.remove("show");
    
    updateLeadSummary();
  });
}

/* 8. Progressive Form Calculations (Live Lead Summary) */
const leadForm = document.getElementById("leadForm");
const serviceSelect = document.getElementById("service");
const styleSelect = document.getElementById("style");
const dimensionsInput = document.getElementById("dimensions");
const stageSelect = document.getElementById("stage");
const messageInput = document.getElementById("message");
const leadSummary = document.getElementById("leadSummary");

// Steps Indicator Selectors
const stepIndicator1 = document.getElementById("stepIndicator1");
const stepIndicator2 = document.getElementById("stepIndicator2");
const stepIndicator3 = document.getElementById("stepIndicator3");

function updateLeadSummary() {
  if (!leadSummary) return;
  
  const service = serviceSelect.value || "Тип мебели не выбран";
  const style = styleSelect.value || "Стиль подберем вместе";
  const dimensions = dimensionsInput.value.trim() || "Размеры уточним";
  const stage = stageSelect.value || "Стадия не указана";
  
  leadSummary.textContent = `${service}. ${style}. ${dimensions}. ${stage}.`;
  
  // Sync Step active states based on progress
  let step = 1;
  if (dimensionsInput.value.trim() !== "" || stageSelect.value !== "") {
    step = 2;
  }
  if (phoneInput && isValidPhone(phoneInput.value)) {
    step = 3;
  }
  
  stepIndicator1.className = (step === 1) ? "active" : (step > 1 ? "done" : "");
  stepIndicator2.className = (step === 2) ? "active" : (step > 2 ? "done" : "");
  stepIndicator3.className = (step === 3) ? "active" : "";
}

// Option chips syncing with select field
const chipButtons = document.querySelectorAll(".option-chips button");
chipButtons.forEach(button => {
  button.addEventListener("click", () => {
    chipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    
    serviceSelect.value = button.dataset.value;
    updateLeadSummary();
  });
});

// Event listeners for form inputs to refresh summary
[serviceSelect, styleSelect, dimensionsInput, stageSelect, messageInput].forEach(elem => {
  if (elem) elem.addEventListener("input", updateLeadSummary);
});

updateLeadSummary();

/* 9. WhatsApp Submission Redirect */
if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceSelect.value;
    const style = styleSelect.value || "выберем с дизайнером";
    const dimensions = dimensionsInput.value.trim() || "уточним на замере";
    const stage = stageSelect.value || "не указана";
    const comments = messageInput.value.trim() || "нет";
    
    // Check validation
    if (!isValidPhone(phone)) {
      phoneInput.classList.add("error");
      phoneError.classList.add("show");
      phoneInput.focus();
      return;
    }
    
    const waText = 
`Здравствуйте! Заявка на расчет мебели с сайта tuba.kz:
----------------------------------------
• Клиент: ${name || "не указано"}
• Телефон: ${phone}
• Изделие: ${service}
• Стиль: ${style}
• Габариты: ${dimensions}
• Стадия: ${stage}
• Комментарии: ${comments}`;

    const submitBtn = document.getElementById("submitBtn");
    const formSuccess = document.getElementById("formSuccess");
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Открываем WhatsApp...";
    
    // Build and open WhatsApp link
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank", "noopener");
    
    // Reset Form
    leadForm.reset();
    chipButtons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.value === "Кухня") btn.classList.add("active");
    });
    serviceSelect.value = "Кухня";
    
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить заявку";
    
    formSuccess.style.display = "block";
    formSuccess.textContent = "✅ Заявка создана! WhatsApp открыт в новой вкладке.";
    
    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 8000);
    
    updateLeadSummary();
  });
}

// Support card trigger linking to Calculator
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach(card => {
  card.addEventListener("click", () => {
    const targetService = card.dataset.service;
    serviceSelect.value = targetService;
    
    chipButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.value === targetService);
    });
    
    updateLeadSummary();
    
    // Smooth scroll down to form
    const formElement = document.getElementById("contact");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* 10. Interactive Chat Assistant Widget */
const chatWidget = document.getElementById("chatWidget");
const chatToggle = document.getElementById("chatToggle");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatButtons = document.getElementById("chatButtons");
const chatPhoneRow = document.getElementById("chatPhoneRow");
const chatPhone = document.getElementById("chatPhone");
const chatPhoneSend = document.getElementById("chatPhoneSend");
const chatText = document.getElementById("chatText");
const chatTextSend = document.getElementById("chatTextSend");

// Chat variables
let chatStepState = {
  type: null,
  style: null,
  stage: null,
  phone: null
};

// Conversational Preset options
const chatScriptData = {
  services: ["Кухня", "Шкаф-купе", "Гардеробная", "Детская", "Другое"],
  styles: ["Премиум светлый", "Дерево и графит", "Минимализм", "Классика", "Нужен совет"],
  stages: ["Есть размеры", "Нужен замер", "Есть дизайн-проект", "Нужна консультация"]
};

// FAQ keywords database
const faqDatabase = [
  {
    keys: ["замер", "бесплатно", "выезд", "адрес", "город"],
    answer: "Мы выезжаем на бесплатный замер по городу Алматы и всей Алматинской области. Наш технолог привезет образцы материалов (МДФ, ЛДСП, столешницы) и сделает точные лазерные замеры."
  },
  {
    keys: ["срок", "время", "сколько", "изготовление", "производство"],
    answer: "Изготовление шкафов и гардеробных занимает от 10 до 15 рабочих дней, кухонь — от 18 до 25 рабочих дней в зависимости от сложности фасадов и фурнитуры."
  },
  {
    keys: ["цена", "стоимость", "калькулятор", "расчет", "бюджет"],
    answer: "Поскольку мебель изготавливается индивидуально, цена зависит от размеров, фасадов (крашеный МДФ, шпон, ЛДСП) и фурнитуры (Blum, Hettich, Boyard). Заполните форму выше или пройдите опрос в чате, чтобы получить расчет!"
  },
  {
    keys: ["гарантия", "качество", "договор", "рассрочка", "каспи"],
    answer: "Мы работаем по договору. На всю установленную фурнитуру и сборку мы даем гарантию до 12 месяцев. Также возможна оплата этапами: предоплата 50% и остаток после установки."
  }
];

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setChatButtons(options, callback) {
  chatButtons.innerHTML = "";
  chatPhoneRow.classList.remove("show");
  
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "chat-option-btn";
    btn.type = "button";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      addMessage(option, "user");
      callback(option);
    });
    chatButtons.appendChild(btn);
  });
}

function initChatflow() {
  chatMessages.innerHTML = "";
  chatStepState = { type: null, style: null, stage: null, phone: null };
  
  addMessage("Здравствуйте! Я виртуальный помощник студии мебели TUBA. Помогу рассчитать проект за 1 минуту.", "bot");
  setTimeout(() => {
    addMessage("Шаг 1: Какую мебель вы планируете заказать?", "bot");
    setChatButtons(chatScriptData.services, (selectedService) => {
      chatStepState.type = selectedService;
      
      setTimeout(() => {
        addMessage("Шаг 2: В каком стиле вы хотите выполнить изделие?", "bot");
        setChatButtons(chatScriptData.styles, (selectedStyle) => {
          chatStepState.style = selectedStyle;
          
          setTimeout(() => {
            addMessage("Шаг 3: На какой стадии ваш проект?", "bot");
            setChatButtons(chatScriptData.stages, (selectedStage) => {
              chatStepState.stage = selectedStage;
              
              setTimeout(() => {
                addMessage("Шаг 4: Оставьте ваш номер телефона. Я пришлю готовый расчет в WhatsApp.", "bot");
                chatButtons.innerHTML = "";
                chatPhoneRow.classList.add("show");
                chatPhone.focus();
              }, 400);
            });
          }, 400);
        });
      }, 400);
    });
  }, 400);
}

function openChat() {
  chatWidget.classList.add("is-open");
  chatWidget.setAttribute("aria-hidden", "false");
  chatToggle.setAttribute("aria-expanded", "true");
  chatToggle.style.display = "none";
  
  if (chatMessages.children.length === 0) {
    initChatflow();
  }
}

function closeChat() {
  chatWidget.classList.remove("is-open");
  chatWidget.setAttribute("aria-hidden", "true");
  chatToggle.setAttribute("aria-expanded", "false");
  chatToggle.style.display = "flex";
}

chatToggle.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);

// Phone masking inside chat input
chatPhone.addEventListener("input", () => {
  chatPhone.value = formatKzPhone(chatPhone.value);
  chatPhone.style.borderColor = "";
});

function handleChatPhoneSubmit() {
  const phone = chatPhone.value.trim();
  if (!isValidPhone(phone)) {
    chatPhone.style.borderColor = "var(--color-error)";
    return;
  }
  
  chatStepState.phone = phone;
  addMessage(phone, "user");
  chatPhoneRow.classList.remove("show");
  
  const messageText = 
`Здравствуйте! Заявка с чат-помощника TUBA.kz:
----------------------------------------
• Тип мебели: ${chatStepState.type}
• Стиль мебели: ${chatStepState.style}
• Текущая стадия: ${chatStepState.stage}
• Телефон: ${phone}
• Запрос: расчет стоимости и консультация.`;

  setTimeout(() => {
    addMessage("Спасибо! Открываю WhatsApp с вашей заявкой. Нажмите кнопку 'Отправить' в приложении.", "bot");
    
    // Open WhatsApp
    const chatWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(chatWaUrl, "_blank", "noopener");
    
    // Provide restart button
    setChatButtons(["Начать заново"], () => {
      initChatflow();
    });
  }, 400);
}

chatPhoneSend.addEventListener("click", handleChatPhoneSubmit);
chatPhone.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleChatPhoneSubmit();
});

// Chat FAQ Text input handling
function handleChatTextSubmit() {
  const text = chatText.value.trim();
  if (!text) return;
  
  addMessage(text, "user");
  chatText.value = "";
  
  setTimeout(() => {
    // Search keyword in database
    const textLower = text.toLowerCase();
    let responseText = null;
    
    for (const faq of faqDatabase) {
      if (faq.keys.some(k => textLower.includes(k))) {
        responseText = faq.answer;
        break;
      }
    }
    
    if (responseText) {
      addMessage(responseText, "bot");
    } else {
      addMessage("Я перенаправлю ваш вопрос нашему дизайнеру. Оставьте ваш телефон, и мы ответим в WhatsApp.", "bot");
      // Fallback: show phone input step
      chatStepState.type = "Индивидуальный вопрос";
      chatStepState.style = "Не указан";
      chatStepState.stage = "Вопрос в чате: " + text;
      showChatPhoneWidget();
    }
  }, 300);
}

function showChatPhoneWidget() {
  chatButtons.innerHTML = "";
  chatPhoneRow.classList.add("show");
}

chatTextSend.addEventListener("click", handleChatTextSubmit);
chatText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleChatTextSubmit();
});

/* Keyboard Listener for closing Modals */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeChat();
  }
});

/* 11. Simple Scroll Reveal Animation */
const revealElements = document.querySelectorAll(".reveal-anim");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target); // Trigger only once
    }
  });
}, {
  threshold: 0.05,
  rootMargin: "0px 0px -20px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));
