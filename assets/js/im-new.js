document.addEventListener('DOMContentLoaded', () => {
    initNewAccordions();
});

function initNewAccordions() {
    const accordionBtns = document.querySelectorAll('.new-accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const contentId = btn.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            
            // Close all other accordions
            const parent = btn.closest('.new-accordion');
            if (parent) {
                const siblings = parent.querySelectorAll('.new-accordion-btn');
                siblings.forEach(sibling => {
                    if (sibling !== btn) {
                        sibling.setAttribute('aria-expanded', 'false');
                        const sibContentId = sibling.getAttribute('aria-controls');
                        const sibContent = document.getElementById(sibContentId);
                        if (sibContent) {
                            sibContent.style.maxHeight = null;
                        }
                    }
                });
            }

            // Toggle current
            if (!isExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            } else {
                btn.setAttribute('aria-expanded', 'false');
                if (content) {
                    content.style.maxHeight = null;
                }
            }
        });
    });
}
