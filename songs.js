// Songs data - R.E.M. songs the band covers (full setlist)
const songs = [
    "Begin the Begin",
    "These Days",
    "What's the Frequency, Kenneth?",
    "Radio Free Europe",
    "Can't Get There from Here",
    "Stand",
    "Man on the Moon",
    "Life and How to Live It",
    "Finest Worksong",
    "Get Up",
    "Don't Go Back to Rockville",
    "Fall on Me",
    "Losing My Religion",
    "Everybody Hurts",
    "Shiny Happy People",
    "Superman",
    "Driver 8",
    "The One I Love",
    "Orange Crush",
    "It's the End of the World as We Know It"
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize the songs marquee
function initSongsMarquee() {
    const container = document.querySelector('.songs-scroll');
    if (!container) return;
    
    // Shuffle the songs
    const shuffledSongs = shuffleArray(songs);
    
    // Create HTML for songs (duplicated for seamless loop)
    const songsHTML = [...shuffledSongs, ...shuffledSongs]
        .map(song => `<span class="song-name">${song}</span>`)
        .join('');
    
    // Insert into container
    container.innerHTML = songsHTML;
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initSongsMarquee);
