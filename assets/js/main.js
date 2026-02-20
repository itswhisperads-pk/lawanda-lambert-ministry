// CONFIG OBJECT (Bonus: Editable Content)
const SiteConfig = {
    brand: {
        name: "LAWANDA",
        sub: "LAMBERT", 
        logoUrl: "/"
    },
    nav: {
        left: [
            { label: "I'm New", href: "im-new.html" },
            { label: "About", href: "about.html" },
            { label: "Prayer Request", href: "speaking-requests.html" },
        ],
        right: [
            { label: "Events", href: "events.html" }   
            { label: "Sermons", href: "sermons.html" },
         //   { label: "Ministries", href: "ministries.html" },
         //   { label: "Volunteer", href: "volunteer.html" },
            { label: "Give", href: "give.html" }
        ]
    },
    hero: {
        headline: "WELCOME",
        subheadline: "JOIN US SUNDAY @ 10:30"
    }
};

async function loadPartials() {
    const headerHost = document.getElementById("header-placeholder");
    const footerHost = document.getElementById("footer-placeholder");

    if (headerHost) {
        try {
            const headerRes = await fetch("partials/header.html");
            if (headerRes.ok) {
                headerHost.innerHTML = await headerRes.text();
                // Initialize header-dependent functions
                initScroll();
                initMobileMenu();
            }
        } catch (e) {
            console.error("Error loading header:", e);
        } finally {
             // Always render what we can (e.g. Hero, or Nav if header loaded)
             initRender();
        }
    } else {
        // If no header placeholder, run render anyway for hero (if present)
        // But in this project structure, we expect placeholder. 
        // We can optionally run initRender() here if we want to support pages without partials but with hero.
        // For now, let's assume if there's no header placeholder, we might still want to initRender for Hero?
        // Let's safe-guard:
        initRender();
    }

    if (footerHost) {
        try {
            const footerRes = await fetch("partials/footer.html");
            if (footerRes.ok) {
                footerHost.innerHTML = await footerRes.text();
                initFooter();
            }
        } catch (e) {
            console.error("Error loading footer:", e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
});

// 1. Render Content from Config
function initRender() {
    // Render Left Nav
    const leftNav = document.getElementById('nav-left');
    if (leftNav) {
        leftNav.innerHTML = SiteConfig.nav.left.map(link => 
            `<a href="${link.href}">${link.label}</a>`
        ).join('');
    }

    // Render Right Nav
    const rightNav = document.getElementById('nav-right');
    if (rightNav) {
        rightNav.innerHTML = SiteConfig.nav.right.map(link => 
            `<a href="${link.href}">${link.label}</a>`
        ).join('');
    }

    // Render Hero Text
    const heroHeadline = document.getElementById('hero-headline');
    const heroSub = document.getElementById('hero-subheadline');
    
    if (heroHeadline) heroHeadline.textContent = SiteConfig.hero.headline;
    if (heroSub) heroSub.textContent = SiteConfig.hero.subheadline;

    // Render Mobile Menu List (Combine Left + Right)
    const mobileList = document.getElementById('mobile-nav-list');
    if (mobileList) {
        const allLinks = [...SiteConfig.nav.left, ...SiteConfig.nav.right];
        mobileList.innerHTML = allLinks.map(link => 
            `<a href="${link.href}">${link.label}</a>`
        ).join('');
    }
}

// 2. Sticky Header on Scroll
function initScroll() {
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 3. Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('mobile-nav');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Toggle State
        toggle.setAttribute('aria-expanded', !isExpanded);
        toggle.classList.toggle('is-active');
        nav.classList.toggle('is-open');
        nav.setAttribute('aria-hidden', isExpanded);

        // Lock Body Scroll
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
}

// 4. Footer Dynamic Year
function initFooter() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
