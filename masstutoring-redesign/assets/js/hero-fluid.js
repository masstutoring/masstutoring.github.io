// Homepage hero fluid background (LiquidEther vanilla port + three.js).
// Progressive enhancement only: skipped for reduced-motion users, missing
// WebGL, or if anything throws. Palette stays in the light-blue range so
// text contrast on the hero never drops below AA.
(function () {
  "use strict";
  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.LiquidEther || !window.THREE) return;
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var probe = document.createElement("canvas");
    if (!(probe.getContext("webgl") || probe.getContext("experimental-webgl"))) return;
    try {
      var fluid = new window.LiquidEther(hero, {
        colors: ["#BBD9F2", "#7FB4E8", "#3D8AD4"],
        mouseForce: 16,
        cursorSize: 110,
        isViscous: true,
        viscous: 24,
        iterationsViscous: 24,
        iterationsPoisson: 24,
        resolution: 0.4,
        isBounce: false,
        autoDemo: true,
        autoSpeed: 0.4,
        autoIntensity: 1.8,
        takeoverDuration: 0.25,
        autoResumeDelay: 2500,
        autoRampDuration: 0.6
      });
      fluid.start();
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !document.hidden) fluid.start();
        else fluid.pause();
      }, { threshold: [0, 0.01] }).observe(hero);
    } catch (e) { /* decorative only — never break the page */ }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
