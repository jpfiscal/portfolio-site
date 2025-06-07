const form = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const subjectField = document.getElementById('subject');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // Stop normal form submission

  // Update the subject field with the user's name
  subjectField.value = `Inquiry from ${nameField.value} from portfolio site`;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.innerHTML = "Thank you! Your message has been sent.";
      status.style.color = "green";

      form.reset(); // Clear the form
    } else {
      const data = await response.json();
      if (data.errors) {
        status.innerHTML = data.errors.map(error => error.message).join(", ");
      } else {
        status.innerHTML = "Oops! There was a problem submitting your form.";
      }
      status.style.color = "red";
    }
  } catch (error) {
    status.innerHTML = "Oops! There was a problem submitting your form.";
    status.style.color = "red";
  }
});
