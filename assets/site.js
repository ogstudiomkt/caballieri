/* ===================================================================
   Cabañas Caballieri — comportamiento compartido (animaciones + header)
   Se usa en las páginas de detalle (cabañas, historia, entorno, cómo llegar).
   =================================================================== */
(function () {
  // Escalonar los elementos dentro de [data-stagger]
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    group.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.transitionDelay = (i * 75) + "ms";
    });
  });

  // Aparición al hacer scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Header: sombra/fondo al hacer scroll
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menú móvil deslizable
  var menu = document.getElementById("mobile-menu");
  var openBtn = document.getElementById("menu-open");
  var closeBtn = document.getElementById("menu-close");
  if (menu && openBtn) {
    var openMenu = function () {
      menu.classList.remove("hidden");
      setTimeout(function () { menu.classList.add("is-open"); }, 10);
      document.body.style.overflow = "hidden";
    };
    var closeMenu = function () {
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { menu.classList.add("hidden"); }, 320);
    };
    openBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    var overlay = menu.querySelector("[data-overlay]");
    if (overlay) overlay.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.classList.contains("hidden")) closeMenu();
    });
  }

  // ===== Selector de idioma (ES / EN / DE) =====
  // Textos compartidos (menú, pie, botones). Los textos propios de cada
  // página se definen en esa página como window.I18N = { es:{}, en:{}, de:{} }.
  var I18N_SHARED = {
    es: {
      "nav.inicio": "Inicio", "nav.cabanas": "Cabañas", "nav.historia": "Historia",
      "nav.servicios": "Servicios", "nav.entorno": "Entorno", "nav.comollegar": "Cómo llegar",
      "nav.galeria": "Galería", "nav.tour360": "Recorrido 360°", "nav.tarifas": "Tarifas", "nav.contacto": "Contacto",
      "btn.consultar": "Consultar", "btn.disp": "disponibilidad", "btn.consultarDisp": "Consultar disponibilidad",
      "common.volver": "Volver al inicio", "common.tempAlta": "Temporada alta", "common.tempBaja": "Temporada baja",
      "foot.min": "Estadía mínima: 2 noches · Máximo 2 huéspedes por unidad", "foot.copyright": "© 2026 Cabañas Caballieri · Pisco Elqui, Chile"
    },
    en: {
      "nav.inicio": "Home", "nav.cabanas": "Cabins", "nav.historia": "Story",
      "nav.servicios": "Amenities", "nav.entorno": "Surroundings", "nav.comollegar": "Getting here",
      "nav.galeria": "Gallery", "nav.tour360": "360° Tour", "nav.tarifas": "Rates", "nav.contacto": "Contact",
      "btn.consultar": "Check", "btn.disp": "availability", "btn.consultarDisp": "Check availability",
      "common.volver": "Back to home", "common.tempAlta": "High season", "common.tempBaja": "Low season",
      "foot.min": "Minimum stay: 2 nights · Max 2 guests per unit", "foot.copyright": "© 2026 Cabañas Caballieri · Pisco Elqui, Chile"
    },
    de: {
      "nav.inicio": "Start", "nav.cabanas": "Hütten", "nav.historia": "Geschichte",
      "nav.servicios": "Ausstattung", "nav.entorno": "Umgebung", "nav.comollegar": "Anreise",
      "nav.galeria": "Galerie", "nav.tour360": "360°-Rundgang", "nav.tarifas": "Preise", "nav.contacto": "Kontakt",
      "btn.consultar": "Anfragen", "btn.disp": "Verfügbarkeit", "btn.consultarDisp": "Verfügbarkeit anfragen",
      "common.volver": "Zurück zur Startseite", "common.tempAlta": "Hochsaison", "common.tempBaja": "Nebensaison",
      "foot.min": "Mindestaufenthalt: 2 Nächte · Max. 2 Gäste pro Einheit", "foot.copyright": "© 2026 Cabañas Caballieri · Pisco Elqui, Chile"
    }
  };

  function applyLang(lang) {
    if (!I18N_SHARED[lang]) lang = "es";
    var page = (window.I18N && window.I18N[lang]) || {};
    var dict = Object.assign({}, I18N_SHARED[lang], page);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.classList.toggle("lang-active", b.getAttribute("data-lang") === lang);
    });
    window.__lang = lang;
    try { window.dispatchEvent(new CustomEvent("langchange", { detail: lang })); } catch (e) {}
  }

  var saved = "es";
  try { saved = localStorage.getItem("lang") || "es"; } catch (e) {}
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });
  applyLang(saved);
})();
