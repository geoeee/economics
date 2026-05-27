/* ============================================================
   tooltip.js — Smart hover translation tooltip for [data-translate]
   ============================================================ */

(function () {
  "use strict";

  var tooltip = null;
  var activeEl = null;

  function createTooltip() {
    if (tooltip) return;
    tooltip = document.createElement("div");
    tooltip.className = "tr-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);
  }

  function showTooltip(el, e) {
    if (!tooltip) return;
    var text = el.getAttribute("data-translate") || "";
    if (!text.trim()) return;
    activeEl = el;
    tooltip.textContent = text;
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.classList.add("visible");
    positionTooltip(el, e);
  }

  function hideTooltip() {
    if (!tooltip) return;
    activeEl = null;
    tooltip.classList.remove("visible");
    tooltip.setAttribute("aria-hidden", "true");
  }

  function positionTooltip(el, e) {
    if (!tooltip) return;
    var rect = el.getBoundingClientRect();
    var tw = tooltip.offsetWidth;
    var th = tooltip.offsetHeight;
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var top = rect.bottom + 8;
    var left = rect.left;
    var arrowAbove = true;

    // If mouse event exists, use cursor position for horizontal
    if (e && e.clientX !== undefined) {
      left = e.clientX - tw / 2;
    }

    // Clamp horizontal
    var pad = 12;
    if (left < pad) left = pad;
    if (left + tw > vw - pad) left = vw - tw - pad;

    // If not enough space below, place above
    if (top + th > vh - pad) {
      top = rect.top - th - 8;
      if (top < pad) top = pad;
      arrowAbove = false;
    }

    // Update arrow direction
    if (arrowAbove) {
      tooltip.classList.remove("arrow-bottom");
    } else {
      tooltip.classList.add("arrow-bottom");
    }

    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
    tooltip.style.setProperty("--arrow-left", (left > rect.left ? Math.min(rect.left + rect.width / 2 - left + 6, tw - 18) : 18) + "px");
  }

  function onMouseEnter(e) {
    var el = e.target.closest("[data-translate]");
    if (!el) return;
    var text = el.getAttribute("data-translate");
    if (!text || !text.trim()) return;
    createTooltip();
    showTooltip(el, e);
  }

  function onMouseMove(e) {
    if (!activeEl || !tooltip || !tooltip.classList.contains("visible")) return;
    positionTooltip(activeEl, e);
  }

  function onMouseLeave(e) {
    var el = e.target.closest("[data-translate]");
    if (!el) return;
    hideTooltip();
  }

  function onClick(e) {
    // Mobile: toggle tooltip on tap
    if (!("ontouchstart" in window) && !navigator.maxTouchPoints) return;
    var el = e.target.closest("[data-translate]");
    if (!el) return;
    var text = el.getAttribute("data-translate");
    if (!text || !text.trim()) return;

    if (activeEl === el) {
      hideTooltip();
      return;
    }

    createTooltip();
    hideTooltip();
    showTooltip(el, e);
    e.preventDefault();
  }

  function onFocus(e) {
    var el = e.target.closest("[data-translate]");
    if (!el) return;
    var text = el.getAttribute("data-translate");
    if (!text || !text.trim()) return;
    createTooltip();
    showTooltip(el);
  }

  function onBlur(e) {
    var el = e.target.closest("[data-translate]");
    if (!el) return;
    hideTooltip();
  }

  function onScroll() {
    if (activeEl && tooltip && tooltip.classList.contains("visible")) {
      positionTooltip(activeEl);
    }
  }

  function onResize() {
    hideTooltip();
  }

  // Global click: close tooltip if clicking elsewhere
  function onGlobalClick(e) {
    if (!activeEl) return;
    if (e.target.closest("[data-translate]")) return;
    if (e.target.closest(".tr-tooltip")) return;
    hideTooltip();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("mouseenter", onMouseEnter, true);
    document.addEventListener("mousemove", onMouseMove, true);
    document.addEventListener("mouseleave", onMouseLeave, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("focus", onFocus, true);
    document.addEventListener("blur", onBlur, true);
    document.addEventListener("click", onGlobalClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
  });
})();
