// Educator referral form (Task 2.3). No backend: composes a mailto to
// Mass Tutoring with only what's entered, then shows a confirmation.
(function () {
  "use strict";
  var form = document.querySelector("[data-educator-form]");
  if (!form) return;
  var errEl = form.querySelector("[data-edu-error]");
  var confirm = document.querySelector("[data-educator-confirm]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var need = form.querySelector('input[name="need"]:checked');
    if (!need) {
      errEl.hidden = false;
      errEl.textContent = "Please choose what the student needs so we can point them the right way.";
      var first = form.querySelector('input[name="need"]');
      if (first) first.focus();
      return;
    }
    errEl.hidden = true;
    var val = function (name) { return form[name] && form[name].value ? form[name].value.trim() : ""; };
    var student = val("student");
    var email = val("email");
    var lines = [
      "Educator / partner inquiry from masstutoring.com",
      "",
      "Request: " + need.value,
      "Organization: " + (val("org") || "(not given)"),
      "Role: " + (val("role") || "(not given)"),
      "Approx. students: " + (val("students") || "(not given)"),
      "Student: " + (student || "(not about one student)"),
      "Contact email: " + (email || "(none provided)")
    ];
    var mailto = "mailto:masstutoringea@gmail.com" +
      "?subject=" + encodeURIComponent("Educator/partner inquiry — " + need.value) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    // Open the user's email client. Do this before swapping the UI so the
    // click is still trusted; wrap in try so a blocked handler never
    // leaves the user without confirmation.
    try { window.location.href = mailto; } catch (err) {}
    form.hidden = true;
    confirm.hidden = false;
    confirm.querySelector("h2").focus && confirm.querySelector("h2").focus();
    confirm.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
