document.addEventListener('DOMContentLoaded', () => {
    initSermons();
});

// --- DEMO DATASET ---
const sermonsData = [
    { id: 1, title: "Bright Lights", series: "How We Do Life Together", date: "February 8, 2026", speaker: "Jeremy Darrow", scripture: "Philippians 2:12-18", thumb: "assets/img/sermon-1.jpg" },
    { id: 2, title: "How We Do Life Together", series: "How We Do Life Together", date: "February 1, 2026", speaker: "Jeremy Darrow", scripture: "Luke 19:1-10", thumb: "assets/img/sermon-2.jpg" },
    { id: 3, title: "Confession & Community", series: "Habits that Lead to the Heart of God", date: "January 18, 2026", speaker: "Jeremy Darrow", scripture: "James 5:13-16", thumb: "assets/img/sermon-3.jpg" },
    { id: 4, title: "Be Transformed; Don't Conform", series: "Habits that Lead to the Heart of God", date: "January 11, 2026", speaker: "Jeremy Darrow", scripture: "Romans 12:1-2", thumb: "assets/img/sermon-1.jpg" },
    { id: 5, title: "Habits That Lead to the Heart of God", series: "Habits that Lead to the Heart of God", date: "January 4, 2026", speaker: "Jeremy Darrow", scripture: "Psalm 1", thumb: "assets/img/sermon-2.jpg" },
    { id: 6, title: "Psalm 107: A History of God's Faithful Love", series: "Psalm 107", date: "December 28, 2025", speaker: "Jeremy Darrow", scripture: "Psalm 107", thumb: "assets/img/sermon-3.jpg" },
    { id: 7, title: "A Victorious Leader and The Battle", series: "Rooted Return", date: "December 14, 2025", speaker: "Gene Howard", scripture: "Ephesians 6:10-24", thumb: "assets/img/sermon-1.jpg" },
    { id: 8, title: "Obedient Children; Obedient Slaves", series: "Rooted Return", date: "December 7, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 6:1-9", thumb: "assets/img/sermon-2.jpg" },
    { id: 9, title: "A Magnificent Marriage", series: "Rooted Return", date: "November 30, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 5:21-33", thumb: "assets/img/sermon-3.jpg" },
    { id: 10, title: "Don't Do Darkness! Live Lit!", series: "Rooted Return", date: "November 23, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 5:1-20", thumb: "assets/img/sermon-1.jpg" },
    { id: 11, title: "The New Self", series: "Rooted Return", date: "November 16, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 4:17-32", thumb: "assets/img/sermon-2.jpg" },
    { id: 12, title: "Unity in the Body", series: "Rooted Return", date: "November 9, 2025", speaker: "Caleb MacCallum", scripture: "Ephesians 4:1-16", thumb: "assets/img/sermon-3.jpg" },
    { id: 13, title: "Paul's Prayer for Power", series: "Rooted Return", date: "November 2, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 3:14-21", thumb: "assets/img/sermon-1.jpg" },
    { id: 14, title: "The Mystery of the Gospel", series: "Rooted Return", date: "October 26, 2025", speaker: "Jeremy Darrow", scripture: "Ephesians 3:1-13", thumb: "assets/img/sermon-2.jpg" }
];

// --- STATE MANAGEMENT ---
const state = {
    dateView: { currentPage: 1, itemsPerPage: 5 },
    seriesView: { currentPage: 1, itemsPerPage: 5 }
};

function initSermons() {
    initTabs();
    initShowMore();
    renderDateView();
    renderSeriesView();
}

// --- TABS LOGIC ---
function initTabs() {
    const tabs = document.querySelectorAll('.sermons-tab');
    const views = {
        'date': document.getElementById('sermons-view-date'),
        'series': document.getElementById('sermons-view-series'),
        'subscribe': document.getElementById('sermons-view-subscribe')
    };
    const detailView = document.getElementById('sermons-view-series-detail');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedTab = tab.getAttribute('data-tab');

            // Update Tabs UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Views UI
            Object.values(views).forEach(view => view.style.display = 'none');
            if (detailView) detailView.style.display = 'none'; // Ensure detail view is hidden
            
            if(views[selectedTab]) {
                views[selectedTab].style.display = 'block';
                // Trigger re-render to ensure layout is correct (optional optimization)
            }
        });
    });
}

// --- SHOW MORE LOGIC ---
function initShowMore() {
    const showMoreBtns = document.querySelectorAll('.sermons-show-more');
    showMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.innerText;
            if (originalText.includes('Show More')) {
                btn.innerText = 'Show Less ▲';
                // Placeholder for actual expand logic
            } else {
                btn.innerText = 'Show More ▼';
            }
        });
    });
}

// --- RENDER HELPERS ---
function createSermonItemHTML(item) {
    return `
    <div class="sermons-item">
        <div class="sermons-thumbnail">
            <img src="${item.thumb}" alt="${item.title}" onerror="this.src='assets/img/sermon-placeholder.svg'">
        </div>
        <div class="sermons-details">
            <h2 class="sermons-title">${item.title}</h2>
            <p class="sermons-series-meta">${item.series}</p>
            <p class="sermons-meta">${item.series}</p>
            <p class="sermons-scripture">${item.scripture}</p>
            <div class="sermons-author-row">
                <div class="sermons-avatar"></div>
                <div class="sermons-author-info">
                    <span class="sermons-author-name">${item.speaker}</span>
                    <span class="sermons-author-role">Lead Pastor</span>
                    <span class="sermons-date">${item.date}</span>
                </div>
            </div>
        </div>
        <div class="sermons-audio-icon">🔊</div>
    </div>
    `;
}

function createPaginationHTML(currentPage, totalPages, type) {
    if (totalPages <= 1) return '';

    let html = `<div class="sermons-pagination-controls">`;
    
    // Prev Button
    html += `<button class="sermons-page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage('${type}', ${currentPage - 1})">« Prev</button>`;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="sermons-page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage('${type}', ${i})">${i}</button>`;
    }

    // Next Button
    html += `<button class="sermons-page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage('${type}', ${currentPage + 1})">Next »</button>`;
    
    html += `</div>`;
    return html;
}

// --- VIEW 1: SERMONS BY DATE ---
function renderDateView() {
    const listContainer = document.getElementById('sermons-list-date');
    const paginationContainer = document.getElementById('sermons-pagination-date');
    
    if (!listContainer) return;

    // Pagination Logic
    const startIndex = (state.dateView.currentPage - 1) * state.dateView.itemsPerPage;
    const endIndex = startIndex + state.dateView.itemsPerPage;
    const itemsToShow = sermonsData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sermonsData.length / state.dateView.itemsPerPage);

    // Render Items
    listContainer.innerHTML = itemsToShow.map(createSermonItemHTML).join('');

    // Render Pagination
    paginationContainer.innerHTML = createPaginationHTML(state.dateView.currentPage, totalPages, 'date');
}

// --- VIEW 2: SERMONS BY SERIES ---
function renderSeriesView() {
    const listContainer = document.getElementById('sermons-list-series');
    const paginationContainer = document.getElementById('sermons-pagination-series');

    if (!listContainer) return;

    // Group Data by Series
    const seriesGroups = {};
    sermonsData.forEach(item => {
        if (!seriesGroups[item.series]) {
            seriesGroups[item.series] = {
                title: item.series,
                count: 0,
                thumb: item.thumb,
                items: []
            };
        }
        seriesGroups[item.series].count++;
        seriesGroups[item.series].items.push(item);
    });

    const seriesArray = Object.values(seriesGroups);

    // Pagination Logic
    const startIndex = (state.seriesView.currentPage - 1) * state.seriesView.itemsPerPage;
    const endIndex = startIndex + state.seriesView.itemsPerPage;
    const itemsToShow = seriesArray.slice(startIndex, endIndex);
    const totalPages = Math.ceil(seriesArray.length / state.seriesView.itemsPerPage);

    // Render Series Rows
    listContainer.innerHTML = itemsToShow.map(series => {
        const previewList = series.items.slice(0, 3).map(s => `
            <li class="sermons-series-preview-item">
                <span class="sermons-preview-date">${s.date}</span>
                <span class="sermons-preview-title">${s.title}</span>
            </li>
        `).join('');

        // Escape single quotes for the onclick handler
        const escapedTitle = series.title.replace(/'/g, "\\'");

        return `
        <div class="sermons-series-row">
            <div class="sermons-series-thumb">
                <img src="${series.thumb}" alt="${series.title}" onerror="this.src='assets/img/sermon-placeholder.svg'">
            </div>
            <div class="sermons-series-info">
                <h3 class="sermons-series-title">${series.title}</h3>
                <span class="sermons-series-count">${series.count} Sermon${series.count !== 1 ? 's' : ''}</span>
            </div>
            <div class="sermons-series-preview">
                <ul class="sermons-series-preview-list">
                    ${previewList}
                </ul>
                <button class="sermons-btn-text" onclick="openSeriesDetail('${escapedTitle}')">View Series →</button>
            </div>
        </div>
        `;
    }).join('');

    // Render Pagination
    paginationContainer.innerHTML = createPaginationHTML(state.seriesView.currentPage, totalPages, 'series');
}

// --- VIEW 2B: SERIES DETAILS ---
function renderSeriesDetailView(seriesTitle) {
    const container = document.getElementById('sermons-view-series-detail');
    const header = document.getElementById('sermons-series-detail-header');
    const list = document.getElementById('sermons-series-detail-list');
    
    // Filter items for this series
    const seriesItems = sermonsData.filter(item => item.series === seriesTitle);
    
    if (seriesItems.length === 0) return;

    const firstItem = seriesItems[0];

    // Populate Header
    header.innerHTML = `
        <div class="sermons-series-detail-thumb">
            <img src="${firstItem.thumb}" alt="${seriesTitle}" onerror="this.src='assets/img/sermon-placeholder.svg'">
        </div>
        <div class="sermons-series-detail-info">
            <h2>${seriesTitle}</h2>
            <p>${seriesItems.length} Sermon${seriesItems.length !== 1 ? 's' : ''}</p>
        </div>
    `;

    // Populate List
    list.innerHTML = seriesItems.map(createSermonItemHTML).join('');

    // Switch Views
    document.getElementById('sermons-view-series').style.display = 'none';
    container.style.display = 'block';
    
    // Scroll to top of container
    container.scrollIntoView({ behavior: 'smooth' });
}

window.openSeriesDetail = function(title) {
    renderSeriesDetailView(title);
};

// Bind Back Button
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('sermons-back-to-series');
    if(backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('sermons-view-series-detail').style.display = 'none';
            document.getElementById('sermons-view-series').style.display = 'block';
        });
    }
});

// --- GLOBAL PAGINATION HANDLER ---
window.changePage = function(type, page) {
    if (type === 'date') {
        state.dateView.currentPage = page;
        renderDateView();
    } else if (type === 'series') {
        state.seriesView.currentPage = page;
        renderSeriesView();
    }
};
