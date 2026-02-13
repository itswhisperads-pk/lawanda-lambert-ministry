// Home Page Logic

document.addEventListener('DOMContentLoaded', async () => {
  await renderHomeEvents();
  await renderHomeSermons();
});

async function renderHomeEvents() {
  const data = await Render.fetchData('events');
  const container = document.getElementById('home-events-container');
  
  if (!data || !container) return;

  // Take first 3 events
  const events = data.events.slice(0, 3);

  container.innerHTML = events.map(event => `
    <div class="event-card">
      <div class="event-date">
        ${Render.formatDate(event.dateISO)}
      </div>
      <div class="event-content">
        <h3 class="event-title"><a href="/event.html?slug=${event.slug}">${event.title}</a></h3>
        <p class="event-meta">${event.time} | ${event.location}</p>
        <a href="/event.html?slug=${event.slug}" class="btn-link">Read More &rarr;</a>
      </div>
    </div>
  `).join('');
}

async function renderHomeSermons() {
  const data = await Render.fetchData('sermons');
  const container = document.getElementById('home-sermons-container');
  
  if (!data || !container) return;

  // Take first 3 sermons
  const sermons = data.sermons.slice(0, 3);

  container.innerHTML = sermons.map(sermon => `
    <div class="sermon-item">
      <div class="sermon-info">
        <h3 class="sermon-title"><a href="/sermon.html?slug=${sermon.slug}">${sermon.title}</a></h3>
        <p class="sermon-meta">${Render.formatDate(sermon.dateISO)} | ${sermon.speaker}</p>
        <p>${sermon.excerpt}</p>
      </div>
      <div class="sermon-action">
        <a href="/sermon.html?slug=${sermon.slug}" class="btn btn-outline" style="color: var(--color-primary); border-color: var(--color-border);">Listen</a>
      </div>
    </div>
  `).join('');
}
