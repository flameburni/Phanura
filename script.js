const url = "https://phanura-server.onrender.com/contact";

const year = document.getElementById("year");

const formStatus = document.getElementById("formStatus");

const contactForm = document.querySelector(".contact-form");

year.textContent = new Date().getFullYear();

contactForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  formStatus.textContent = "connecting...";
  formStatus.style.color = "#CCFF00"
  const formObject = Object.fromEntries(new FormData(contactForm));

  let slowConnectionTimer = setTimeout(function() {
    formStatus.textContent = "Still connecting, this can take up to a minute on first use...";
  }, 5000);

  try {
    const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formObject)
  });

    clearTimeout(slowConnectionTimer);
    
    const data = await response.json();
    if (response.ok && data.success) {
      formStatus.textContent = data.message;
      contactForm.reset();
    } else {
      formStatus.textContent = data.error;
      formStatus.style.color = "#E63946";
    }
  } catch (error) {
    clearTimeout(slowConnectionTimer);
    
    console.log(error);
    formStatus.textContent = "Couldn't reach the server. Check your internet connection and try again in a moment."
    formStatus.style.color = "#E63946";
  }
})
