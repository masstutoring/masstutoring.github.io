// "Start Here" routing quiz (Task 2.2). Client-side only: nothing is
// stored or transmitted — it just points the visitor at the right page.
(function () {
  "use strict";
  function init() {
    var root = document.querySelector("[data-start-quiz]");
    if (!root) return;
    var intro = root.querySelector("[data-sq-intro]");
    var flow = root.querySelector("[data-sq-flow]");
    var result = root.querySelector("[data-sq-result]");
    var steps = Array.prototype.slice.call(root.querySelectorAll(".sq-step"));
    var progress = root.querySelector("[data-sq-progress]");
    var backBtn = root.querySelector("[data-sq-back]");
    var answers = {};
    var step = 0;

    function showStep(i) {
      step = i;
      steps.forEach(function (s, idx) { s.hidden = idx !== i; });
      progress.textContent = "Question " + (i + 1) + " of 3";
      backBtn.hidden = i === 0;
      var firstOpt = steps[i].querySelector(".sq-opt");
      if (firstOpt) firstOpt.focus();
    }

    // Route from answers. Q3 drives the destination; Q2 refines self-study.
    function decide() {
      if (answers.q3 === "stuck") {
        return { url: "/tutoring/",
          title: "Talk to a free tutor.",
          body: "Since you're stuck, skip straight to a real person — no requirement to study on your own first. Request a free tutor and we'll match you within a week." };
      }
      if (answers.q3 === "new") {
        return { url: "/sat-guide/start-here/",
          title: "Start Here.",
          body: "You'll learn how the digital SAT works and get your first three steps, including a diagnostic to set your baseline." };
      }
      // studying on my own
      if (answers.q2 === "soon") {
        return { url: "/sat-guide/study-plans/",
          title: "Build a short, focused plan.",
          body: "With the test within two months, a tight study plan around your weak areas makes the biggest difference. Here's how to build one." };
      }
      return { url: "/my-study/",
        title: "Build your free study plan.",
        body: "You're already studying — My Study turns that into one clear task a day, an error log, and saved resources, all on your device." };
    }

    function finish() {
      var d = decide();
      flow.hidden = true;
      result.hidden = false;
      result.querySelector("[data-sq-result-title]").textContent = d.title;
      result.querySelector("[data-sq-result-body]").textContent = d.body;
      var cta = result.querySelector("[data-sq-result-cta]");
      cta.setAttribute("href", d.url);
      cta.textContent = d.url === "/tutoring/" ? "Request a free tutor" :
                        d.url === "/my-study/" ? "Open My Study" : "Go there";
      cta.focus();
    }

    root.querySelector("[data-sq-start]").addEventListener("click", function () {
      intro.hidden = true;
      flow.hidden = false;
      showStep(0);
    });
    root.addEventListener("click", function (e) {
      var opt = e.target.closest("[data-sq-answer]");
      if (opt) {
        var parts = opt.dataset.sqAnswer.split(":");
        answers[parts[0]] = parts[1];
        if (step < 2) showStep(step + 1); else finish();
        return;
      }
      if (e.target.closest("[data-sq-back]")) { if (step > 0) showStep(step - 1); return; }
      if (e.target.closest("[data-sq-restart]")) {
        answers = {}; result.hidden = true; intro.hidden = false;
        root.querySelector("[data-sq-start]").focus();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
