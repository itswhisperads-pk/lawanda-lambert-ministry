// Core Rendering Logic and Helpers

const Render = {
  // Fetch JSON helper
  async fetchData(filename) {
    try {
      const response = await fetch(`/data/${filename}.json`);
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },

  // Format Date Helper
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  },

  // Render Navigation
  async renderNav() {
    const navData = await this.fetchData('nav');
    const siteData = await this.fetchData('site');
    
    if (!navData || !siteData) return;

    // Main Nav
    const navContainer = document.querySelector('#main-nav-links');
    const mobileNavContainer = document.querySelector('#mobile-nav-links');
    
    if (navContainer) {
      navContainer.innerHTML = navData.navItems.map(item => 
        `<li><a href="${item.href}">${item.label}</a></li>`
      ).join('');
    }

    if (mobileNavContainer) {
      mobileNavContainer.innerHTML = navData.navItems.map(item => 
        `<li><a href="${item.href}">${item.label}</a></li>`
      ).join('');
    }

    // Top Bar Links
    const topBarContainer = document.querySelector('#top-bar-links');
    if (topBarContainer) {
      const linksHtml = siteData.topLinks.map(link => 
        `<a href="${link.href}">${link.label}</a>`
      ).join(' | ');
      
      const phoneHtml = `<span>${siteData.phone}</span>`;
      
      topBarContainer.innerHTML = `${linksHtml} | ${phoneHtml}`;
    }
  },

  // Render Footer
  async renderFooter() {
    const siteData = await this.fetchData('site');
    const navData = await this.fetchData('nav');
    
    if (!siteData || !navData) return;

    // Contact Info
    const contactContainer = document.querySelector('#footer-contact');
    if (contactContainer) {
      contactContainer.innerHTML = `
        <p>${siteData.address.street}</p>
        <p>${siteData.address.city}, ${siteData.address.province} ${siteData.address.postalCode}</p>
        <p class="mt-2"><a href="tel:${siteData.phone}">${siteData.phone}</a></p>
        <p><a href="mailto:${siteData.email}">${siteData.email}</a></p>
      `;
    }

    // Get Involved Links (Use Nav items for now or subset)
    const linksContainer = document.querySelector('#footer-links');
    if (linksContainer) {
      linksContainer.innerHTML = navData.navItems.slice(0, 5).map(item => 
        `<li><a href="${item.href}">${item.label}</a></li>`
      ).join('');
    }

    // Copyright
    const copyrightContainer = document.querySelector('#copyright');
    if (copyrightContainer) {
      copyrightContainer.innerHTML = siteData.copyright;
    }
  },

  // Get Query Param
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
};

// Expose to window
window.Render = Render;
