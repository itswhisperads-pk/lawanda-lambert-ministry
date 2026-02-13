document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
});

function initAccordions() {
    const accordionBtns = document.querySelectorAll('.about-accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const contentId = btn.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            
            // Close all other accordions in the same group (optional, but good for UX)
            // To do this, we'd need to know which group it belongs to.
            // For now, let's just toggle the clicked one or close others in the same container.
            
            const parent = btn.closest('.about-accordion');
            if (parent) {
                const siblings = parent.querySelectorAll('.about-accordion-btn');
                siblings.forEach(sibling => {
                    if (sibling !== btn) {
                        sibling.setAttribute('aria-expanded', 'false');
                        const sibContentId = sibling.getAttribute('aria-controls');
                        const sibContent = document.getElementById(sibContentId);
                        if (sibContent) {
                            sibContent.style.maxHeight = null;
                            const icon = sibling.querySelector('.about-accordion-icon');
                            if (icon) icon.textContent = '+';
                        }
                    }
                });
            }

            if (!isExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                const icon = btn.querySelector('.about-accordion-icon');
                if (icon) icon.textContent = '-';
            } else {
                btn.setAttribute('aria-expanded', 'false');
                if (content) {
                    content.style.maxHeight = null;
                }
                const icon = btn.querySelector('.about-accordion-icon');
                if (icon) icon.textContent = '+';
            }
        });
    });
}
