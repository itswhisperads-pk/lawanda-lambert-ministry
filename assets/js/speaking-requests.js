document.addEventListener('DOMContentLoaded', () => {
    initSpeakingForm();
    initFormSubmission();
});

function initSpeakingForm() {
    // 1. Purpose "Other" Logic
    const checkPurposeOther = document.getElementById('check-purpose-other');
    const fieldPurposeOther = document.getElementById('field-purpose-other');

    if (checkPurposeOther && fieldPurposeOther) {
        checkPurposeOther.addEventListener('change', () => {
            if (checkPurposeOther.checked) {
                fieldPurposeOther.style.display = 'block';
                const input = fieldPurposeOther.querySelector('input');
                if (input) input.focus();
            } else {
                fieldPurposeOther.style.display = 'none';
            }
        });
    }

    // 2. Heard About "Other" Logic
    const checkHeardOther = document.getElementById('check-heard-other');
    const fieldHeardOther = document.getElementById('field-heard-other');

    if (checkHeardOther && fieldHeardOther) {
        checkHeardOther.addEventListener('change', () => {
            if (checkHeardOther.checked) {
                fieldHeardOther.style.display = 'block';
                const input = fieldHeardOther.querySelector('input');
                if (input) input.focus();
            } else {
                fieldHeardOther.style.display = 'none';
            }
        });
    }
}

function initFormSubmission() {
    const form = document.querySelector('.speaking-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields (HTML5 'required' attribute handles most, but let's be safe)
        const firstName = form.querySelector('[name="firstName"]').value;
        const lastName = form.querySelector('[name="lastName"]').value;
        const email = form.querySelector('[name="email"]').value;
        const eventDateTime = form.querySelector('[name="eventDateTime"]').value;

        if (!firstName || !lastName || !email || !eventDateTime) {
            alert('Please fill in all required fields.');
            return;
        }

        // Gather Checkbox Values
        const purposeCheckboxes = form.querySelectorAll('input[name="purpose[]"]:checked');
        const purpose = Array.from(purposeCheckboxes).map(cb => cb.value);

        const heardCheckboxes = form.querySelectorAll('input[name="heardFrom[]"]:checked');
        const heardFrom = Array.from(heardCheckboxes).map(cb => cb.value);

        // Build Payload
        const formData = {
            firstName,
            lastName,
            email,
            eventDateTime,
            phone: form.querySelector('[name="phone"]').value,
            organization: form.querySelector('[name="organization"]').value,
            pastorName: form.querySelector('[name="pastorName"]').value,
            purpose,
            purposeOther: form.querySelector('[name="purposeOther"]').value,
            attendees: form.querySelector('[name="attendees"]').value,
            heardFrom,
            heardOther: form.querySelector('[name="heardOther"]').value,
            speakingLength: form.querySelector('[name="speakingLength"]').value,
            website: form.querySelector('[name="website"]').value,
            eventAddress: form.querySelector('[name="eventAddress"]').value,
            eventCityState: form.querySelector('[name="eventCityState"]').value,
            details: form.querySelector('[name="details"]').value
        };

        const submitBtn = form.querySelector('.speaking-btn-submit');
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'SENDING...';

        try {
            const response = await fetch('/api/speaking-request', {
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
                alert('Thank you. Your speaking request has been submitted successfully. Our team will contact you soon.');
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
