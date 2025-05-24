// Handles the functionality of the banner rotator.
const messages = [
  "Side+: Certified Drip Dealers",
  "Discounts Up to 70%",
  "New Arrivals Every Weekend",
  "Authenticity Guaranteed on Every Item",
  "Secure Checkout Always"
];

const rotator = document.getElementById("banner-rotator");
let i = 0;

setInterval(() => {
  rotator.classList.remove("animate__fadeInDown");
  rotator.classList.add("animate__fadeOutUp");

  setTimeout(() => {
    i = (i + 1) % messages.length;
    rotator.innerText = messages[i];
    rotator.classList.remove("animate__fadeOutUp");
    rotator.classList.add("animate__fadeInDown");
  }, 500);
}, 5000);


// Carousel functionality
function scrollCards(section, direction) {
  const container = document.getElementById(`${section}Row`);
  const card = container.querySelector(".col");
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight || 16); 
  const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
  
  container.scrollBy({
  left: direction * scrollAmount,
  behavior: 'smooth'
});

    // Update button states after scroll
    setTimeout(() => {
      updateButtonStates(section);
    }, 500);
  }

function updateButtonStates(section) {
  const container = document.getElementById(`${section}Row`);
  const leftBtn = container.parentElement.querySelector('.scroll-btn.left');
  const rightBtn = container.parentElement.querySelector('.scroll-btn.right');

  // Disable left button if scroll is at far left
  leftBtn.disabled = container.scrollLeft <= 0;

  // Disable right button if scroll is at far right
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  rightBtn.disabled = container.scrollLeft >= maxScrollLeft;
}

// Initialize button states for all carousels
document.addEventListener('DOMContentLoaded', () => {
  const sections = ['men', 'women', 'kids', 'accessories'];
  sections.forEach(section => {
    updateButtonStates(section);
    
    // Add scroll event listeners to update buttons
    const container = document.getElementById(`${section}Row`);
    container.addEventListener('scroll', () => {
      updateButtonStates(section);
    });
  });
});

// Drag and drop functionality
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileElem');
const gallery = document.getElementById('gallery');

// Prevent default behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, (e) => e.preventDefault(), false);
  dropArea.addEventListener(eventName, (e) => e.stopPropagation(), false);
});

// Highlight drop area
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('bg-light'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('bg-light'), false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFiles, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files } });
}

function handleFiles(e) {
  const files = e.target.files;
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.className = 'img-thumbnail m-2';
      img.style.maxWidth = '150px';
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}


