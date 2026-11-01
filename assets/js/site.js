(function () {
  var root = document.documentElement;

  /* Light/dark switch: light by default, the visitor's choice is remembered in this browser */
  var toggle = document.getElementById("theme-toggle");
  function applyTheme(t) {
    if (t === "dark") root.setAttribute("data-site-theme", "dark"); else root.removeAttribute("data-site-theme");
    var label = t === "dark" ? "Switch to light mode" : "Switch to dark mode";
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  }
  applyTheme(root.getAttribute("data-site-theme") === "dark" ? "dark" : "light");
  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-site-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("site-theme", next); } catch (e) {}
  });

  /* Keep sticky elements just below the header, whatever its height */
  var head = document.querySelector(".site-head");
  function setHeadHeight() { root.style.setProperty("--head-h", head.offsetHeight + "px"); }
  setHeadHeight();
  window.addEventListener("resize", setHeadHeight);

  /* Toast and copy buttons */
  var toast = document.getElementById("toast"), toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1600);
  }
  function copy(text, msg) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); say(msg); } catch (e) { say("Select the text to copy it"); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { say(msg); }, fallback);
    else fallback();
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.classList.contains("abs-toggle")) {
      var box = document.getElementById(b.getAttribute("aria-controls"));
      var open = box.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.textContent = open ? "Hide abstract" : "Abstract";
    } else if (b.hasAttribute("data-copy-from")) {
      copy(document.getElementById(b.getAttribute("data-copy-from")).textContent, b.getAttribute("data-msg") || "Copied");
    } else if (b.hasAttribute("data-copy")) {
      copy(b.getAttribute("data-copy"), b.getAttribute("data-msg") || "Copied");
    }
  });

  /* Research page: highlight the section currently in view */
  var jump = document.querySelector(".jump");
  if (jump && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        jump.querySelectorAll("a").forEach(function (a) {
          a.classList.toggle("is-on", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".r-section").forEach(function (s) { io.observe(s); });
  }

  /* Nyhavn skyline: built with a fixed seed so the houses are the same on every visit */
  var sky = document.querySelector("[data-skyline]");
  if (sky) {
    var seed = 11;
    var rnd = function () {
      seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    var INK = "#1B1918", PAPER = "#F1ECE2", RED = "#B4232C", INDIGO = "#24395F", OCHRE = "#D8A11C";
    var defs =
      '<pattern id="p-leaf" width="10" height="12" patternUnits="userSpaceOnUse"><rect width="10" height="12" fill="' + INK + '"/><path d="M1 0V12M6 0V12" stroke="#EDE6D8" stroke-width=".6"/><ellipse cx="3.5" cy="4" rx="1.7" ry=".75" fill="#C9B79A" transform="rotate(-35 3.5 4)"/><ellipse cx="8.5" cy="9" rx="1.7" ry=".75" fill="#C9B79A" transform="rotate(35 8.5 9)"/></pattern>' +
      '<pattern id="p-red" width="3" height="4" patternUnits="userSpaceOnUse"><rect width="3" height="4" fill="' + RED + '"/><path d="M1 0V4" stroke="#8E1820" stroke-width=".7"/></pattern>' +
      '<pattern id="p-zig" width="6" height="4" patternUnits="userSpaceOnUse"><rect width="6" height="4" fill="' + PAPER + '"/><polyline points="0,1 1.5,3 3,1 4.5,3 6,1" fill="none" stroke="' + INK + '" stroke-width="1"/></pattern>' +
      '<pattern id="p-spiral" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="' + INDIGO + '"/><rect x="1" y="1" width="7" height="7" fill="none" stroke="#E9E3D6" stroke-width=".7"/><rect x="3" y="3" width="3" height="3" fill="none" stroke="#E9E3D6" stroke-width=".7"/></pattern>' +
      '<pattern id="p-ochre" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="' + OCHRE + '"/><path d="M0 8L2 3L4 8ZM4 8L6 3L8 8Z" fill="' + INK + '"/></pattern>' +
      '<pattern id="p-lace" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#EEE8DC"/><circle cx="3" cy="3" r="1.6" fill="none" stroke="#C9BFAE" stroke-width=".5"/><circle cx="0" cy="0" r=".6" fill="#C9BFAE"/></pattern>' +
      '<pattern id="p-dots" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="' + INK + '"/><circle cx="3" cy="3" r="1.3" fill="' + PAPER + '"/></pattern>' +
      '<pattern id="p-gingham" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="' + PAPER + '"/><rect width="3" height="6" fill="' + RED + '" opacity=".45"/><rect width="6" height="3" fill="' + RED + '" opacity=".45"/></pattern>' +
      '<pattern id="p-indigo" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="' + INDIGO + '"/><rect width="1.6" height="5" fill="#4A6C9A"/></pattern>' +
      '<pattern id="p-celadon" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#B7CBC2"/><path d="M0 4H8" stroke="#9DB5AA" stroke-width=".5"/></pattern>' +
      '<pattern id="p-plaid" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#E3C443"/><rect y="2" width="8" height="1.4" fill="' + RED + '"/><rect x="2" width="1.4" height="8" fill="' + INDIGO + '" opacity=".8"/><rect y="5.5" width="8" height=".6" fill="' + INK + '"/></pattern>' +
      '<pattern id="p-canal" width="12" height="7" patternUnits="userSpaceOnUse"><rect width="12" height="7" fill="' + INDIGO + '"/><path d="M0 3Q3 1.5 6 3T12 3" fill="none" stroke="#9CC3C0" stroke-width=".7"/></pattern>' +
      '<filter id="torn" x="-2%" y="-20%" width="104%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="d"/><feDropShadow in="d" dx=".7" dy="0" stdDeviation=".35" flood-color="#000" flood-opacity=".35"/></filter>';
    /* [pattern, has dark ground]: dark grounds get paper windows, light grounds get ink windows */
    var pats = [["p-leaf", 1], ["p-red", 1], ["p-zig", 0], ["p-spiral", 1], ["p-ochre", 0], ["p-lace", 0], ["p-dots", 1], ["p-gingham", 0], ["p-indigo", 1], ["p-celadon", 0], ["p-plaid", 0]];
    var base = 57, x = -12, i = 0, houses = "";
    while (x < 1612) {
      var w = 26 + Math.round(rnd() * 22), h = 22 + Math.round(rnd() * 20), top = base - h;
      var r = Math.min(w * 0.55, 15), type = ["tri", "step", "bell", "tri", "step", "flat"][Math.floor(rnd() * 6)];
      var p = pats[(i * 5) % pats.length], d, s = w / 6, extra = "";
      if (type === "tri") {
        d = "M" + x + " " + base + "V" + top + "L" + (x + w / 2) + " " + (top - r) + "L" + (x + w) + " " + top + "V" + base + "Z";
      } else if (type === "step") {
        d = "M" + x + " " + base + "V" + top + "H" + (x + s) + "V" + (top - r / 3) + "H" + (x + 2 * s) + "V" + (top - 2 * r / 3) + "H" + (x + 2.5 * s) + "V" + (top - r) + "H" + (x + 3.5 * s) + "V" + (top - 2 * r / 3) + "H" + (x + 4 * s) + "V" + (top - r / 3) + "H" + (x + 5 * s) + "V" + top + "H" + (x + w) + "V" + base + "Z";
      } else if (type === "bell") {
        d = "M" + x + " " + base + "V" + top + "Q" + (x + w * 0.2) + " " + (top - r * 0.3) + " " + (x + w * 0.3) + " " + (top - r * 0.6) + "Q" + (x + w * 0.32) + " " + (top - r) + " " + (x + w / 2) + " " + (top - r) + "Q" + (x + w * 0.68) + " " + (top - r) + " " + (x + w * 0.7) + " " + (top - r * 0.6) + "Q" + (x + w * 0.8) + " " + (top - r * 0.3) + " " + (x + w) + " " + top + "V" + base + "Z";
      } else {
        d = "M" + x + " " + base + "V" + top + "H" + (x + w) + "V" + base + "Z";
        extra = '<rect x="' + (x + w * 0.65) + '" y="' + (top - 6) + '" width="4" height="6" fill="' + RED + '"/>';
      }
      var win = "", cols = Math.max(1, Math.floor((w - 6) / 9)), rows = Math.max(1, Math.floor((h - 8) / 10)), span = cols * 9 - 4.5, sx = x + (w - span) / 2;
      for (var rr = 0; rr < rows; rr++) {
        for (var c = 0; c < cols; c++) {
          win += '<rect x="' + (sx + c * 9).toFixed(1) + '" y="' + (top + 5 + rr * 10) + '" width="4.5" height="6" fill="' + (p[1] ? PAPER : INK) + '"/>';
        }
      }
      var rot = ((rnd() - 0.5) * 2.4).toFixed(2);
      houses += '<g transform="rotate(' + rot + ' ' + (x + w / 2) + ' ' + base + ')">' + extra + '<path d="' + d + '" fill="url(#' + p[0] + ')"/>' + win + '</g>';
      x += w - 2 - Math.round(rnd() * 3);
      i++;
    }
    var bird = '<g transform="translate(1012 13) rotate(-14)"><path d="M-9 1.5L-4 0.4L-4 2.2Z" fill="' + INDIGO + '"/><ellipse cx="0" cy="1" rx="4.6" ry="1.9" fill="#3E8E5A"/><circle cx="4.4" cy="0" r="1.5" fill="#3E8E5A"/><path d="M5.6 -0.2L11 -1" stroke="' + INK + '" stroke-width=".6"/><path d="M-1 0Q-3 -6 2 -7Q1 -3 1 0Z" fill="' + OCHRE + '"/></g>';
    sky.innerHTML =
      '<svg viewBox="0 0 1600 64" preserveAspectRatio="xMidYMax slice"><defs>' + defs + '</defs>' +
      '<g filter="url(#torn)">' + houses + '</g>' +
      '<rect x="0" y="' + base + '" width="1600" height="' + (64 - base) + '" fill="url(#p-canal)"/>' + bird + '</svg>';
  }
})();
