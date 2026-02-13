document.addEventListener('DOMContentLoaded', () => {
    initEventsToggle();
});

function initEventsToggle() {
    const btnList = document.getElementById('events-btn-list');
    const btnCalendar = document.getElementById('events-btn-calendar');
    
    const viewList = document.getElementById('events-view-list');
    const viewCalendar = document.getElementById('events-view-calendar');

    if (!btnList || !btnCalendar || !viewList || !viewCalendar) return;

    btnList.addEventListener('click', () => {
        // Update Buttons
        btnList.classList.add('events-active');
        btnCalendar.classList.remove('events-active');

        // Update Views
        viewList.style.display = 'block';
        viewCalendar.style.display = 'none';
    });

    btnCalendar.addEventListener('click', () => {
        // Update Buttons
        btnCalendar.classList.add('events-active');
        btnList.classList.remove('events-active');

        // Update Views
        viewCalendar.style.display = 'block';
        viewList.style.display = 'none';
    });
}
