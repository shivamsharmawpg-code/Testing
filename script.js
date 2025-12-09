// script.js

// 1. Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
if(localStorage.getItem('theme') === 'dark') body.setAttribute('data-theme', 'dark');

if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 2. Birds Catalog & Modal
const grid = document.getElementById('bird-grid');
const modal = document.getElementById('bird-modal');
const modalBody = document.getElementById('modal-body');
// Note: These inputs exist on birds.html and index.html (quick search)
const searchInput = document.getElementById('search-input'); 
const seasonFilter = document.getElementById('season-filter'); // Only on birds.html
const typeFilter = document.getElementById('type-filter');     // Only on birds.html

function displayBirds(birds) {
    if(!grid) return;
    grid.innerHTML = '';
    
    // Check if the current page is gallery.html
    const isGalleryPage = window.location.pathname.includes('gallery.html');

    // For the Gallery, only display birds with an image. For the Catalog, display all.
    const birdsToDisplay = isGalleryPage ? birds.filter(bird => bird.image) : birds;

    if(birdsToDisplay.length === 0) {
        grid.innerHTML = '<p>No birds found matching your criteria.</p>';
        return;
    }
    birdsToDisplay.forEach(bird => {
        const card = document.createElement('div');
        card.className = 'bird-card';
        card.innerHTML = `
            <img src="${bird.image || 'https://via.placeholder.com/600x400?text=No+Image+Available'}" alt="${bird.common_name}">
            <div class="card-content">
                <h3>${bird.common_name}</h3>
                <p><em>${bird.scientific_name || 'N/A'}</em></p>
                <div class="card-fact">${bird.fact || 'Fact not available.'}</div>
            </div>
        `;
        card.addEventListener('click', () => openModal(bird));
        grid.appendChild(card);
    });
}

function openModal(bird) {
    if(!modal) return;
    modalBody.innerHTML = `
        <img src="${bird.image || 'https://via.placeholder.com/600x400?text=No+Image+Available'}" class="modal-img" alt="${bird.common_name}">
        <h2>${bird.common_name}</h2>
        <p><strong>Scientific Name:</strong> ${bird.scientific_name || 'N/A'}</p>
        <p><strong>Type:</strong> ${bird.type || 'N/A'}</p>
        <p><strong>Season:</strong> ${bird.season || 'N/A'}</p>
        <p><strong>Height:</strong> ${bird.height_cm ? bird.height_cm + 'cm' : 'N/A'} | <strong>Wingspan:</strong> ${bird.wingspan_cm ? bird.wingspan_cm + 'cm' : 'N/A'}</p>
        <p class="mt-2"><strong>Fun Fact:</strong> ${bird.fact || 'Fact not available.'}</p>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    if(modal) modal.style.display = 'none';
}

// Filter Logic - Consolidated function for all pages with search/filters
function filterBirds() {
    if(!grid) return; 

    // Determine if we are on the full Catalog page (birds.html)
    const isCatalogPage = seasonFilter && typeFilter && window.location.pathname.includes('birds.html');
    
    // Get search term from input (if it exists on the current page)
    // Check for both the dedicated search-input (birds.html, index.html) or a simple fallback
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filtered = birdsData;
    
    if (isCatalogPage) {
        // --- Full Birds Catalog (birds.html) Filtering ---
        const season = seasonFilter.value;
        const type = typeFilter.value;

        filtered = birdsData.filter(bird => {
            const matchesName = bird.common_name.toLowerCase().includes(term) || (bird.scientific_name && bird.scientific_name.toLowerCase().includes(term));
            const matchesType = type === 'all' || (bird.type && bird.type.toLowerCase().includes(type.toLowerCase())) || bird.type === type; 
            const matchesSeason = season === 'all' || bird.season === season;
            
            return matchesName && matchesSeason && matchesType;
        });

    } else if (term) {
        // --- Quick Search (index.html) or Gallery Search ---
        filtered = filtered.filter(bird => 
            bird.common_name.toLowerCase().includes(term) || (bird.scientific_name && bird.scientific_name.toLowerCase().includes(term))
        );
    } 
    
    displayBirds(filtered);
}


// Event Listeners for Filters (Only used on birds.html)
if(seasonFilter) seasonFilter.addEventListener('change', filterBirds);
if(typeFilter) typeFilter.addEventListener('change', filterBirds);

// Event Listener for Search Input (Used on index.html for quick search, and birds.html/gallery.html for catalog search)
if(searchInput) searchInput.addEventListener('input', filterBirds);


// 3. Slideshow Logic
let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    if(slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function initSlideshow() {
    const container = document.getElementById('slideshow-container');
    if(!container) return;
    
    // Filter to only include birds with an image for the slideshow
    const birdsWithImages = birdsData.filter(bird => bird.image);

    // Shuffle birds for variety
    const shuffled = [...birdsWithImages].sort(() => 0.5 - Math.random());
    
    shuffled.forEach(bird => {
        const slide = document.createElement('div');
        slide.className = 'slide fade';
        slide.innerHTML = `
            <img src="${bird.image}" alt="${bird.common_name}">
            <div class="caption">${bird.common_name} - <em>${bird.scientific_name || ''}</em></div>
        `;
        container.appendChild(slide);
    });
    showSlides();
}


// 4. Map Logic (If used)
function initMap() {
    const mapDiv = document.getElementById('map');
    if(!mapDiv) return;

    // Center on Manitoba
    const map = L.map('map').setView([51.498, -99.143], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    birdsData.forEach(bird => {
        if(bird.location) {
            L.marker([bird.location.lat, bird.location.lng])
                .addTo(map)
                .bindPopup(`<b>${bird.common_name}</b><br>Spotted here!`);
        }
    });
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    // Shared: Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Page Specific
    if(document.querySelector('#bird-grid')) {
        // Run filterBirds to populate the grid on birds.html, gallery.html, or index.html
        filterBirds();
    }
    
    initSlideshow(); // Load slides if exists (on index.html)
    initMap(); // Load map if exists (on map.html or other)
});
