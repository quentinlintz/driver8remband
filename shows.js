// Shows data - Add your upcoming shows here
// Each show should have: date, venue, city, time, ticketLink (optional), details (optional)
const shows = [
    {
        date: "2026-03-06",
        venue: "The Hobart Art Theater",
        city: "Hobart, IN",
        time: "Doors 6 PM • Show 7 PM",
        ticketLink: "https://www.ticketweb.com/event/without-u2-driver-8-hobart-art-theatre-tickets/14099054",
        details: "w/ Without U2 (U2 Tribute) • All Ages (21+ Drink w/ ID) • $15 Adv / $20 Door"
    },
];

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Check if a show is in the past
function isPastShow(dateString) {
    const showDate = new Date(dateString + 'T23:59:59');
    const today = new Date();
    return showDate < today;
}

// Get upcoming shows (filter out past shows)
function getUpcomingShows() {
    return shows.filter(show => !isPastShow(show.date))
                .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get past shows
function getPastShows() {
    return shows.filter(show => isPastShow(show.date))
                .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate HTML for a single show
function generateShowHTML(show) {
    const ticketButton = show.ticketLink 
        ? `<a href="${show.ticketLink}" target="_blank" rel="noopener noreferrer" class="ticket-link">Get Tickets</a>`
        : '';
    
    const details = show.details 
        ? `<p class="show-details">${show.details}</p>` 
        : '';
    
    return `
        <div class="show-card">
            <div class="show-date">${formatDate(show.date)}</div>
            <div class="show-info">
                <h3 class="show-venue">${show.venue}</h3>
                <p class="show-city">${show.city}</p>
                <p class="show-time">${show.time}</p>
                ${details}
            </div>
            ${ticketButton}
        </div>
    `;
}

// Initialize the shows page
function initShowsPage() {
    const upcomingContainer = document.getElementById('upcoming-shows');
    const pastContainer = document.getElementById('past-shows');
    const noShowsMessage = document.getElementById('no-shows-message');
    
    if (!upcomingContainer) return;
    
    const upcomingShows = getUpcomingShows();
    const pastShows = getPastShows();
    
    // Display upcoming shows
    if (upcomingShows.length > 0) {
        upcomingContainer.innerHTML = upcomingShows.map(generateShowHTML).join('');
        if (noShowsMessage) noShowsMessage.style.display = 'none';
    } else {
        upcomingContainer.innerHTML = '';
        if (noShowsMessage) noShowsMessage.style.display = 'block';
    }
    
    // Display past shows (if container exists and there are past shows)
    if (pastContainer && pastShows.length > 0) {
        pastContainer.innerHTML = pastShows.map(generateShowHTML).join('');
        document.querySelector('.past-shows-section')?.classList.remove('hidden');
    }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initShowsPage);
