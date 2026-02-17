document.addEventListener('DOMContentLoaded', () => {
  initEventPage();
});

function initEventPage() {
  const data = getDemoEvents();
  const url = new URL(window.location.href);
  const slug = url.searchParams.get('slug') || 'community-winter-carnival';
  const info = data[slug] || data['community-winter-carnival'];

  // Fill hero
  setText('#event-title', info.title);
  setText('#event-date', info.dateText);
  setText('#event-location', info.locationText);
  setText('#event-crumb-name', info.title);

  // Set images
  const feature = document.querySelector('#event-feature-image');
  if (feature) feature.src = info.featureImage;

  // Replace description if provided
  const desc = document.querySelector('#event-description');
  if (desc && info.description && info.description.length) {
    desc.innerHTML = info.description.map(p => `<p>${p}</p>`).join('');
  }

  // Upcoming Events
  const upcomingEl = document.querySelector('#event-upcoming');
  if (upcomingEl && info.upcoming && info.upcoming.length) {
    upcomingEl.innerHTML = info.upcoming.map(item => `
      <li class="event-list-item">
        <span class="event-list-date">${item.date}</span>
        <span class="event-list-title">${item.title}</span>
      </li>
    `).join('');
  }

  // Latest Sermon
  const sermonEl = document.querySelector('#event-latest-sermon');
  if (sermonEl && info.latestSermon) {
    sermonEl.innerHTML = `
      <li class="event-list-item">
        <span class="event-list-date">${info.latestSermon.date}</span>
        <span class="event-list-title">${info.latestSermon.title}</span>
      </li>
    `;
  }
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function getDemoEvents() {
  return {
    'community-winter-carnival': {
      title: 'Community Winter Carnival',
      dateText: 'Monday, February 16, 2026',
      locationText: 'Transformation Church',
      heroImage: 'assets/img/events-hero.jpg',
      featureImage: 'assets/img/winter-carnival.png',
      description: [
        'Mark your calendars for February 16th (Family Day) as a special community winter carnival at our church.',
        'This event, kindly organized by Caleb and Rachel, Alex and Caitlyn, will include family fun activities, games and snacks.',
        'We will also be inviting those who live in the neighborhood of Transformation Church to join us.',
        'More details to come in the future weeks.'
      ],
      upcoming: [
        { date: 'Feb 15', title: 'Sunday Worship' },
        { date: 'Feb 22', title: 'Sunday Worship' },
        { date: 'Feb 22', title: 'Laugh Your Way to a Better Marriage, Mark Gungor' }
      ],
      latestSermon: { date: 'Feb 8', title: 'Bright Lights' }
    },
    'sunday-worship': {
      title: 'Sunday Worship',
      dateText: 'Sunday, February 22, 2026 | 10:00 AM',
      locationText: 'Transformation Church',
      heroImage: 'assets/img/events-hero.jpg',
      featureImage: 'assets/img/event-feature.jpg',
      description: [
        'Join us for a time of worship and teaching.',
        'Kids ministry is available for ages 0-12.'
      ],
      upcoming: [
        { date: 'Feb 29', title: 'Sunday Worship' },
        { date: 'Mar 7', title: 'Sunday Worship' },
        { date: 'Mar 14', title: 'Sunday Worship' }
      ],
      latestSermon: { date: 'Feb 8', title: 'Bright Lights' }
    }
  };
}
