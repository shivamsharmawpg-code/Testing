// birds.js
const birdsData = [
    {
        id: 1,
        common_name: "Great Gray Owl",
        scientific_name: "Strix nebulosa",
        type: "raptors",
        season: "year-round",
        height_cm: 72,
        wingspan_cm: 152,
        fact: "The Great Gray Owl is the provincial bird of Manitoba and can hear a vole moving under 2 feet of snow.",
        location: { lat: 50.445, lng: -96.257 }, // Birds Hill Park area
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/%D0%91%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D1%82%D0%B0%D1%8F_%D0%BD%D0%B5%D1%8F%D1%81%D1%8B%D1%82%D1%8C_%28Strix_nebulosa%2C_m%29%2C_%D0%91%D0%BE%D1%82%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4.jpg/960px-%D0%91%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D1%82%D0%B0%D1%8F_%D0%BD%D0%B5%D1%8F%D1%81%D1%8B%D1%82%D1%8C_%28Strix_nebulosa%2C_m%29%2C_%D0%91%D0%BE%D1%82%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%B0%D0%B4.jpg"
    },
    {
        id: 2,
        common_name: "Canada Goose",
        scientific_name: "Branta canadensis",
        type: "waterfowl",
        season: "summer",
        height_cm: 110,
        wingspan_cm: 180,
        fact: "They fly in a distinctive V-formation to reduce wind resistance and coordinate movements.",
        location: { lat: 49.895, lng: -97.138 }, // The Forks
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Canada_goose_on_Seedskadee_NWR_%2827826185489%29.jpg/500px-Canada_goose_on_Seedskadee_NWR_%2827826185489%29.jpg"
    },
    {
        id: 3,
        common_name: "Black-capped Chickadee",
        scientific_name: "Poecile atricapillus",
        type: "songbirds",
        season: "year-round",
        height_cm: 13,
        wingspan_cm: 20,
        fact: "They hide thousands of seeds for the winter and have a special hippocampus in their brain to remember locations.",
        location: { lat: 50.150, lng: -97.200 }, // Stonewall
        image: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=600&q=80"
    },
    {
        id: 4,
        common_name: "Ruby-throated Hummingbird",
        scientific_name: "Archilochus colubris",
        type: "songbirds",
        season: "summer",
        height_cm: 9,
        wingspan_cm: 11,
        fact: "Their wings beat about 53 times a second, and they are the only Manitoba bird that can hover and fly backwards.",
        location: { lat: 49.500, lng: -95.500 }, // Whiteshell
        image: "https://www.birdfy.com/cdn/shop/articles/3_97a1e91d-aa7e-4614-8a6e-e7043f7141ed.png?v=1725592908"
    },
    {
        id: 5,
        common_name: "Snow Bunting",
        scientific_name: "Plectrophenax nivalis",
        type: "songbirds",
        season: "winter",
        height_cm: 15,
        wingspan_cm: 30,
        fact: "Often called 'snowflakes', they breed in the high Arctic but migrate to Southern Manitoba for the winter.",
        location: { lat: 49.900, lng: -98.200 }, // Portage la Prairie
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQx25RIBECG1f7vcsMqg_6giD8WAV2xFItLM1TCWe0HEiofQKzsebthKL3M1m_7RFXS7Ju3hG1RgY3mvEu5PfnM3oV9gVji8y6R8MCSA&s=10"
    }
];

