document.addEventListener('DOMContentLoaded', () => {
    initPrayerForm();
});

function initPrayerForm() {
    const form = document.querySelector('.speaking-form'); // Reusing the same class from CSS
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        const firstName = form.querySelector('[name="firstName"]').value;
        const lastName = form.querySelector('[name="lastName"]').value;
        const email = form.querySelector('[name="email"]').value;

        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build Payload
        const formData = {
            firstName,
            lastName,
            email,
            phone: form.querySelector('[name="phone"]').value,
            address: form.querySelector('[name="address"]').value,
            message: form.querySelector('[name="message"]').value
        };

        const submitBtn = form.querySelector('.speaking-btn-submit');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'SENDING...';

        // IMPORTANT: When deployed on GitHub Pages, 'localhost' won't work.
        // You need to replace this with your deployed backend URL (e.g., from Render, Vercel, Heroku).
        // For local development, 'http://localhost:3000' is fine.
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const API_URL = isLocal ? 'http://localhost:3000/api/prayer-request' : 'https://YOUR_BACKEND_APP_URL.onrender.com/api/prayer-request'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                form.reset();
                alert('Thank you. Your prayer request has been submitted successfully.');
            } else {
                // Server Error
                alert(result.message || 'Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Network error. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}
