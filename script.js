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
const searchInput = document.getElementById('search-input');
const seasonFilter = document.getElementById('season-filter');
const typeFilter = document.getElementById('type-filter');

function displayBirds(birds) {
    if(!grid) return;
    grid.innerHTML = '';
    if(birds.length === 0) {
        grid.innerHTML = '<p>No birds found.</p>';
        return;
    }
    birds.forEach(bird => {
        const card = document.createElement('div');
        card.className = 'bird-card';
        card.innerHTML = `
            <img src="${bird.image}" alt="${bird.common_name}">
            <div class="card-content">
                <h3>${bird.common_name}</h3>
                <p><em>${bird.scientific_name}</em></p>
                <div class="card-fact">${bird.fact}</div>
            </div>
        `;
        card.addEventListener('click', () => openModal(bird));
        grid.appendChild(card);
    });
}

function openModal(bird) {
    if(!modal) return;
    modalBody.innerHTML = `
        <img src="${bird.image}" class="modal-img" alt="${bird.common_name}">
        <h2>${bird.common_name}</h2>
        <p><strong>Scientific Name:</strong> ${bird.scientific_name}</p>
        <p><strong>Type:</strong> ${bird.type}</p>
        <p><strong>Season:</strong> ${bird.season}</p>
        <p><strong>Height:</strong> ${bird.height_cm}cm | <strong>Wingspan:</strong> ${bird.wingspan_cm}cm</p>
        <p class="mt-2"><strong>Fun Fact:</strong> ${bird.fact}</p>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    if(modal) modal.style.display = 'none';
}

// Filter Logic
function filterBirds() {
    if(!grid) return;
    const term = searchInput.value.toLowerCase();
    const season = seasonFilter ? seasonFilter.value : 'all';
    const type = typeFilter ? typeFilter.value : 'all';

    const filtered = birdsData.filter(bird => {
        const matchesName = bird.common_name.toLowerCase().includes(term);
        const matchesSeason = season === 'all' || bird.season === season;
        const matchesType = type === 'all' || bird.type === type;
        return matchesName && matchesSeason && matchesType;
    });
    displayBirds(filtered);
}

// Event Listeners for Filters (Only used on birds.html)
if(searchInput && grid) searchInput.addEventListener('input', filterBirds);
if(seasonFilter && grid) seasonFilter.addEventListener('change', filterBirds);
if(typeFilter && grid) typeFilter.addEventListener('change', filterBirds);

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
    
    // Shuffle birds for variety
    const shuffled = [...birdsData].sort(() => 0.5 - Math.random());
    
    shuffled.forEach(bird => {
        const slide = document.createElement('div');
        slide.className = 'slide fade';
        slide.innerHTML = `
            <img src="${bird.image}" alt="${bird.common_name}">
            <div class="caption">${bird.common_name} - <em>${bird.scientific_name}</em></div>
        `;
        container.appendChild(slide);
    });
    showSlides();
}

// 4. Map Logic (Bonus)
function initMap() {
    const mapDiv = document.getElementById('map');
    if(!mapDiv) return;

    // Center on Manitoba
    const map = L.map('map').setView([51.498, -99.143], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
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
    // displayBirds is now only called if the bird-grid element exists (e.g., on birds.html)
    if(document.querySelector('.bird-grid') && document.querySelector('#bird-grid')) {
        displayBirds(birdsData);
    }
    initSlideshow(); // Load slides if exists (on index.html)
    initMap(); // Load map if exists (on map.html or other)
});
