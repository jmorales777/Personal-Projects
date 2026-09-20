// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Contact form submission via Formspree (AJAX so we can show a status message
// instead of redirecting the user away from the page).
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const action = form.getAttribute("action");
    if (!action || action.includes("YOUR_FORM_ID")) {
      statusEl.textContent = "Contact form isn't set up yet — see README for the 2-minute Formspree setup.";
      statusEl.style.color = "#e0a13b";
      return;
    }

    statusEl.textContent = "Sending...";
    statusEl.style.color = "";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent = "Thanks! Your message has been sent.";
        statusEl.style.color = "#4fd1c5";
        form.reset();
      } else {
        statusEl.textContent = "Something went wrong. Please try again or email me directly.";
        statusEl.style.color = "#e0603b";
      }
    } catch (err) {
      statusEl.textContent = "Network error — please try again.";
      statusEl.style.color = "#e0603b";
    }
  });
}
