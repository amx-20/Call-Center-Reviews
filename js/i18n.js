// ===== Translation dictionary =====
// Every piece of on-screen text lives here. To edit any wording,
// change it here — both English and Arabic versions, in one place.
const translations = {
  ar: {
    dir: "rtl",
    tagline: "تجارب حقيقية من موظفين، قبل ما تقدّم.",
    heroTitle: "هل تستاهل الشركة إنك تشتغل فيها؟",
    heroTitleEm: "اسأل اللي شغلوا فيها قبلك.",
    heroSub: "تقييمات مجهولة من موظفين حاليين وسابقين في شركات الكول سنتر بمصر — المرتب، جو الشغل، الشيفتات، وكل حاجة الإعلان الوظيفي مش هيقولهالك.",
    statCompanies: "شركة",
    statReviews: "تقييم",
    browseCompanies: "تصفح الشركات",
    sortedBy: "مرتبة حسب عدد التقييمات",
    reviewsWord: "تقييم",
    recommendPct: "بينصحوا بيها",
    backLink: "→ رجوع لكل الشركات",
    companySubtitle: "تقييمات من موظفين حاليين وسابقين",
    avgRating: "متوسط التقييم",
    reviewsCount: "عدد التقييمات",
    wouldRecommend: "بينصحوا بيها",
    pros: "أحلى حاجة",
    cons: "أسوأ حاجة",
    duration: "مدة الشغل",
    footer: "المشروع بيعرض بيانات حقيقية من نموذج مجهول — مش تابع لأي شركة مذكورة هنا.",
    loading: "بنجيب البيانات...",
    noReviews: "لسه مفيش تقييمات للشركة دي."
  },
  en: {
    dir: "ltr",
    tagline: "Real employee experiences, before you apply.",
    heroTitle: "Should you work there?",
    heroTitleEm: "Ask the people who already did.",
    heroSub: "Anonymous reviews from current and former call center employees across Egypt — pay, culture, shifts, and everything the job ad won't tell you.",
    statCompanies: "Companies",
    statReviews: "Reviews",
    browseCompanies: "Browse companies",
    sortedBy: "sorted by review count",
    reviewsWord: "Reviews",
    recommendPct: "recommend",
    backLink: "← Back to all companies",
    companySubtitle: "Reviews from current and former employees",
    avgRating: "Average rating",
    reviewsCount: "Reviews",
    wouldRecommend: "Would recommend",
    pros: "Pros",
    cons: "Cons",
    duration: "Time at company",
    footer: "This project displays real data from an anonymous form — not affiliated with any company listed here.",
    loading: "Loading reviews...",
    noReviews: "No reviews for this company yet."
  }
};

// ===== Language + theme state =====
// Saved in the browser so the choice carries over between index.html and company.html.
function getLang() {
  return localStorage.getItem("ccr_lang") || "ar";
}
function getTheme() {
  return localStorage.getItem("ccr_theme") || "dark";
}
function setLang(lang) {
  localStorage.setItem("ccr_lang", lang);
  applyLang();
}
function setTheme(theme) {
  localStorage.setItem("ccr_theme", theme);
  applyTheme();
}
function applyLang() {
  const lang = getLang();
  const t = translations[lang];
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", t.dir);
  document.body.classList.toggle("rtl", t.dir === "rtl");

  // Fill in every element tagged with data-i18n="key"
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) toggleBtn.textContent = lang === "ar" ? "EN" : "AR";
}
function applyTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute("data-theme", theme);
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) toggleBtn.textContent = theme === "dark" ? "☀" : "☾";
}
function initLangAndTheme() {
  applyLang();
  applyTheme();

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLang(getLang() === "ar" ? "en" : "ar");
    });
  }

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }
}

document.addEventListener("DOMContentLoaded", initLangAndTheme);
