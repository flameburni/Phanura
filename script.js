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

  try {
    const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formObject)
  });
    const data = await response.json();
    if (response.ok && data.success) {
      formStatus.textContent = data.message;
      contactForm.reset();
    } else {
      formStatus.textContent = data.error;
      formStatus.style.color = "#E63946";
    }
  } catch (error) {
    console.log("Phanura server is currently down. Please try again later.")
    if (!navigator.onLine) {
      formStatus.textContent = "Network connection lost. Please check your internet connection.";
      formStatus.style.color = "#E63946";
    } else {
      formStatus.textContent = "Phanura server is currently down. Please try again later.";
      formStatus.style.color = "#E63946";
    }
  }
})
