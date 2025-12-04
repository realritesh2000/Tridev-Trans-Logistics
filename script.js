// --- Contact Form & Navigation Handling ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
        });
    });

   
 
  // Initialize EmailJS ONCE with your Public Key (replace with the value from dashboard)
  // Put this only here (remove duplicate in HTML)
  emailjs.init("WVjsaZ0WtOo7AZasN");

  // DOM references
  const contactForm = document.getElementById("contactForm");

  // Optional: validate mobile number lightly before sending
  function isValidMobile(m) {
    // simple check for 10 digits (India) — adjust to suit
    return /^\d{10}$/.test(m.replace(/\D/g, ''));
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const mobileVal = document.querySelector('input[name="mobile"]').value || '';
    if (!isValidMobile(mobileVal)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Show a "sending" state (optional)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const oldBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Use sendForm: requires form element (and input 'name' attributes must match template variables)
    // Replace "service_o5yqt3t" and "template_4kea99m" with your actual service/template IDs if different
    emailjs.sendForm("service_o5yqt3t", "template_4kea99m", contactForm)
      .then((response) => {
        console.log("EmailJS success:", response);
        alert("✅ Message Sent! We will contact you shortly.");
        contactForm.reset();
      })
      .catch((error) => {
        // Log full error for debugging
        console.error("EmailJS Error:", error);
        // Some useful fields available on error object:
        // error.status, error.text or error?.response or error?.details depending on failure
        let message = "Oops! Something went wrong. Please try again later.";
        if (error && error.status) {
          message += ` (status: ${error.status})`;
        }
        alert(message);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
      });
  });
});
