document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initContactForm();
});

function initAccordion() {
    const triggers = document.querySelectorAll('.faq-accordion-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const contentId = trigger.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            
            // Close all others (optional but cleaner)
            triggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherContent = document.getElementById(otherTrigger.getAttribute('aria-controls'));
                    if (otherContent) otherContent.hidden = true;
                }
            });

            // Toggle current
            trigger.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded;
        });
    });
}

function initContactForm() {
    const form = document.getElementById('imnew-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple client-side validation
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;

        if (name && email && message) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success-message';
            successMsg.textContent = 'Thanks! We’ll be in touch soon.';
            successMsg.style.color = 'white';
            successMsg.style.marginTop = '1rem';
            successMsg.style.fontWeight = 'bold';
            
            form.appendChild(successMsg);
            form.reset();

            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);

            // TODO: POST to backend
            // fetch('/api/contact', { method: 'POST', body: JSON.stringify({name, email, message}) })
        }
    });
}