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
})();
