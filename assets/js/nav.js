/* ============================================================
   nav.js — Sidebar rendering, search, collapse, theme toggle
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Navigation Data — define all pages here
     ---------------------------------------------------------- */
  var NAV = [
    {
      type: "link",
      id: "home",
      title: "Home",
      href: "index.html",
    },
    {
      type: "category",
      title: "Timeline",
      collapsed: false,
      children: [
        { id: "01-ancient",    title: "Ancient (3500 BC – 500 AD)",       href: "timeline/01-ancient.html" },
        { id: "02-classical",  title: "Classical (500 BC – 500 AD)",      href: "timeline/02-classical.html" },
        { id: "03-medieval",   title: "Medieval (500 – 1500)",            href: "timeline/03-medieval.html" },
        { id: "04-mercantilism", title: "Mercantilism (1500 – 1760)",     href: "timeline/04-mercantilism.html" },
        { id: "05-industrial", title: "Industrial Revolution (1760 – 1870)", href: "timeline/05-industrial.html" },
        { id: "06-golden-age", title: "Golden Age (1870 – 1914)",         href: "timeline/06-golden-age.html" },
        { id: "07-world-wars", title: "World Wars & Depression (1914 – 1945)", href: "timeline/07-world-wars.html" },
        { id: "08-bretton-woods", title: "Bretton Woods (1945 – 1971)",   href: "timeline/08-bretton-woods.html" },
        { id: "09-neoliberal", title: "Neoliberal Era (1971 – 2008)",     href: "timeline/09-neoliberal.html" },
        { id: "10-contemporary", title: "Contemporary (2008 – Present)",  href: "timeline/10-contemporary.html" },
      ],
    },
    {
      type: "category",
      title: "Concepts",
      collapsed: true,
      children: [
        { id: "supply-demand",    title: "Supply & Demand",         href: "concepts/supply-demand.html" },
        { id: "money-credit",     title: "Money & Credit",          href: "concepts/money-credit.html" },
        { id: "inflation",        title: "Inflation & Deflation",   href: "concepts/inflation.html" },
        { id: "market-structures", title: "Market Structures",      href: "concepts/market-structures.html" },
        { id: "fiscal-policy",    title: "Fiscal Policy",           href: "concepts/fiscal-policy.html" },
        { id: "monetary-policy",  title: "Monetary Policy",         href: "concepts/monetary-policy.html" },
        { id: "trade-theory",     title: "Trade Theory",            href: "concepts/trade-theory.html" },
        { id: "exchange-rates",   title: "Exchange Rates",          href: "concepts/exchange-rates.html" },
        { id: "financial-crises", title: "Financial Crises",        href: "concepts/financial-crises.html" },
      ],
    },
    {
      type: "category",
      title: "Cross-Discipline",
      collapsed: true,
      children: [
        { id: "game-theory",          title: "Game Theory",                href: "cross/game-theory.html" },
        { id: "behavioral",           title: "Behavioral Economics",       href: "cross/behavioral.html" },
        { id: "geopolitics-trade",    title: "Geopolitics & Trade",        href: "cross/geopolitics-trade.html" },
        { id: "china-econ-history",   title: "Chinese Economic History",   href: "cross/china-econ-history.html" },
        { id: "math-models",          title: "Essential Math Models",      href: "cross/math-models.html" },
        { id: "financial-derivatives", title: "Financial Derivatives",     href: "cross/financial-derivatives.html" },
      ],
    },
  ];

  /* ----------------------------------------------------------
     Compute root-relative prefix based on nav.js location
     ---------------------------------------------------------- */
  function getRootPrefix() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || "";
      var idx = src.indexOf("/assets/js/nav.js");
      if (idx > -1) {
        // Extract directory prefix before "assets/js/nav.js"
        // e.g. "../assets/js/nav.js" → "../"
        // e.g. "assets/js/nav.js" → ""
        return src.substring(0, idx);
      }
    }
    // Fallback: assume root-level page
    return "";
  }

  var rootPrefix = getRootPrefix();

  /* ----------------------------------------------------------
     Determine current page ID from URL
     ---------------------------------------------------------- */
  function getCurrentPageId() {
    var path = window.location.pathname;
    if (path === "/" || path.endsWith("/index.html") || path === "/index.html") {
      return "home";
    }
    var segments = path.split("/");
    var last = segments[segments.length - 1];
    return last.replace(".html", "");
  }

  /* ----------------------------------------------------------
     Resolve href with root prefix
     ---------------------------------------------------------- */
  function resolveHref(href) {
    if (href.startsWith("http") || href.startsWith("/")) return href;
    if (rootPrefix) return rootPrefix + href;
    return href;
  }

  var currentId = getCurrentPageId();

  /* ----------------------------------------------------------
     Build sidebar HTML from NAV data
     ---------------------------------------------------------- */
  function buildSidebar() {
    var navEl = document.querySelector(".sidebar-nav");
    if (!navEl) return;

    navEl.innerHTML = "";

    NAV.forEach(function (item) {
      if (item.type === "link") {
        var a = document.createElement("a");
        a.className = "nav-link";
        a.href = resolveHref(item.href);
        a.textContent = item.title;
        a.setAttribute("data-search", item.title.toLowerCase());
        if (currentId === item.id) a.classList.add("active");
        navEl.appendChild(a);
        return;
      }

      if (item.type === "category") {
        var cat = document.createElement("div");
        cat.className = "nav-category";
        if (item.collapsed) cat.classList.add("collapsed");

        var title = document.createElement("div");
        title.className = "nav-category-title";
        title.innerHTML = item.title + ' <span class="arrow">▼</span>';

        var children = document.createElement("ul");
        children.className = "nav-category-children";

        item.children.forEach(function (child) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.className = "nav-link";
          a.href = resolveHref(child.href);
          a.textContent = child.title;
          a.setAttribute("data-search", child.title.toLowerCase());
          if (currentId === child.id) {
            a.classList.add("active");
            cat.classList.remove("collapsed");
          }
          li.appendChild(a);
          children.appendChild(li);
        });

        cat.appendChild(title);
        cat.appendChild(children);
        navEl.appendChild(cat);
      }
    });
  }

  /* ----------------------------------------------------------
     Category collapse / expand
     ---------------------------------------------------------- */
  function initCategories() {
    document.querySelectorAll(".nav-category-title").forEach(function (title) {
      title.addEventListener("click", function () {
        var cat = title.parentElement;
        cat.classList.toggle("collapsed");
        saveCollapsedState();
      });
    });
  }

  function saveCollapsedState() {
    var state = {};
    document.querySelectorAll(".nav-category").forEach(function (cat, idx) {
      var titleEl = cat.querySelector(".nav-category-title");
      var name = titleEl ? titleEl.childNodes[0].textContent.trim() : "cat-" + idx;
      state[name] = cat.classList.contains("collapsed");
    });
    try {
      localStorage.setItem("economics-nav-collapsed", JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function restoreCollapsedState() {
    try {
      var raw = localStorage.getItem("economics-nav-collapsed");
      if (!raw) return;
      var state = JSON.parse(raw);
      document.querySelectorAll(".nav-category").forEach(function (cat, idx) {
        var titleEl = cat.querySelector(".nav-category-title");
        var name = titleEl ? titleEl.childNodes[0].textContent.trim() : "cat-" + idx;
        if (state[name] === true) {
          cat.classList.add("collapsed");
        }
      });
    } catch (e) { /* ignore */ }
  }

  /* ----------------------------------------------------------
     Search
     ---------------------------------------------------------- */
  function initSearch() {
    var input = document.getElementById("sidebar-search-input");
    if (!input) return;

    var noResults = document.querySelector(".search-no-results");

    input.addEventListener("input", function () {
      var query = this.value.toLowerCase().trim();

      if (query === "") {
        showAll();
        if (noResults) noResults.style.display = "none";
        return;
      }

      var foundAny = false;

      document.querySelectorAll(".sidebar .nav-link").forEach(function (link) {
        if (shouldShow(link, query)) {
          link.classList.remove("hidden-by-search");
          foundAny = true;
        } else {
          link.classList.add("hidden-by-search");
        }
      });

      // Hide empty categories
      document.querySelectorAll(".nav-category").forEach(function (cat) {
        var visibleChildren = cat.querySelectorAll(".nav-link:not(.hidden-by-search)");
        if (visibleChildren.length === 0 && query !== "") {
          cat.style.display = "none";
        } else {
          cat.style.display = "";
          if (query !== "" && !cat.classList.contains("collapsed")) {
            // keep expanded during search
          }
        }
      });

      if (noResults) {
        noResults.style.display = foundAny ? "none" : "block";
      }
    });
  }

  function shouldShow(link, query) {
    var text = link.getAttribute("data-search") || "";
    return text.indexOf(query) !== -1;
  }

  function showAll() {
    document.querySelectorAll(".nav-link").forEach(function (l) {
      l.classList.remove("hidden-by-search");
    });
    document.querySelectorAll(".nav-category").forEach(function (c) {
      c.style.display = "";
    });
  }

  /* ----------------------------------------------------------
     Theme toggle (light / dark)
     ---------------------------------------------------------- */
  function initTheme() {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    var saved = localStorage.getItem("economics-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "" : "dark";
      if (next === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("economics-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("economics-theme", "light");
      }
      updateThemeToggleUI(next === "dark");
    });

    updateThemeToggleUI(document.documentElement.getAttribute("data-theme") === "dark");
  }

  function updateThemeToggleUI(isDark) {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;
    var icon = toggle.querySelector(".icon");
    var label = toggle.querySelector(".label");
    if (icon) icon.textContent = isDark ? "☀️" : "🌙";
    if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  /* ----------------------------------------------------------
     Mobile: hamburger menu
     ---------------------------------------------------------- */
  function initMobile() {
    var hamburger = document.querySelector(".hamburger");
    var sidebar = document.querySelector(".sidebar");
    var overlay = document.querySelector(".sidebar-overlay");
    if (!hamburger || !sidebar) return;

    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      if (overlay) overlay.classList.toggle("visible");
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("visible");
      });
    }
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildSidebar();
    initCategories();
    restoreCollapsedState();
    initSearch();
    initTheme();
    initMobile();
  });
})();
