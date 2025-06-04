// script.js
document.getElementById('booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const response = await fetch('/submit-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert('Booking submitted successfully!');
    this.reset();
  } else {
    alert('There was an error submitting your booking.');
  }
});
