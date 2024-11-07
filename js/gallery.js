// Array of image data
const imagess = [
    { full: 'images/flowers-pink-large.jpg', thumb: 'images/flowers-pink-small.jpg', caption: 'Sunflowers in the hamlet Dernekamp, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany' },
    { full: 'images/flowers-purple-large.jpg', thumb: 'images/flowers-purple-small.jpg', caption: 'Poppies in cornfield, Dülmen, North Rhine-Westphalia, Germany' },
    { full: 'images/flowers-red-large.jpg', thumb: 'images/flowers-red-small.jpg', caption: 'Daffodils in Sentmaring park, Münster, North Rhine-Westphalia, Germany' },
    { full: 'images/flowers-white-large.jpg', thumb: 'images/flowers-white-small.jpg', caption: 'Sentmaring Park, Münster, North Rhine-Westphalia, Germany' },
    { full: 'images/flowers-yellow-large.jpg', thumb: 'images/flowers-yellow-small.jpg', caption: 'Market in Münster, North Rhine-Westphalia, Germany' }
];

// Get references to the featured image, caption, and thumbnails container
const featuredImage = document.getElementById('featured-image');
const caption = document.getElementById('caption');
const thumbnailsContainer = document.querySelector('.bottem_content');

let currentIndex = 0;

// Function to update the featured image and caption
function updateFeaturedImage(index) {
    featuredImage.classList.add('fade'); 
    setTimeout(() => {
        featuredImage.src = imagess[index].full;
        caption.textContent = imagess[index].caption;
        currentIndex = index;

        // Update active class for thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, thumbIndex) => {
            thumb.classList.toggle('active', thumbIndex === index);
        });

        featuredImage.classList.remove('fade'); 
    }, 300);
}

// Generate thumbnail images dynamically
imagess.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = image.thumb;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.width = 160;
    thumbnail.height = 160;
    thumbnail.classList.add('thumbnail');
    if (index === 0) thumbnail.classList.add('active'); 

    // Click event to update featured image and caption
    thumbnail.addEventListener('click', () => {
        updateFeaturedImage(index);
    });

    thumbnailsContainer.appendChild(thumbnail);
});

// Event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        updateFeaturedImage((currentIndex + 1) % imagess.length); 
    } else if (event.key === 'ArrowLeft') {
        updateFeaturedImage((currentIndex - 1 + imagess.length) % imagess.length); 
    }
});

// Optional: Automatic Slideshow
let slideshowInterval;
function startSlideshow() {
    slideshowInterval = setInterval(() => {
        updateFeaturedImage((currentIndex + 1) % imagess.length);
    }, 5000); // Change image every 5 seconds
}

// Start slideshow on page load
startSlideshow();

// Pause slideshow on user interaction
document.addEventListener('click', () => {
    clearInterval(slideshowInterval);
});
document.addEventListener('keydown', () => {
    clearInterval(slideshowInterval);
});
