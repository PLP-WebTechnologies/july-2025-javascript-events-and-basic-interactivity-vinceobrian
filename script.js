// ===== THEME TOGGLE FUNCTIONALITY =====

// Get theme toggle button
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = 'Toggle Light Mode';
}

// Add event listener to theme toggle button
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  // Update button text and save preference
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = 'Toggle Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = 'Toggle Dark Mode';
  }
});

// ===== COUNTER FUNCTIONALITY =====

// Get elements for counter functionality
const bookCountElement = document.getElementById('bookCount');
const addBookButton = document.getElementById('addBook');

// Initialize book count from localStorage or default to 65
let bookCount = parseInt(localStorage.getItem('bookCount')) || 65;
bookCountElement.textContent = bookCount;

// Add event listener to increment book count
addBookButton.addEventListener('click', () => {
  bookCount++;
  bookCountElement.textContent = bookCount;
  localStorage.setItem('bookCount', bookCount);
  
  // Add a little animation effect
  bookCountElement.style.transform = 'scale(1.5)';
  setTimeout(() => {
    bookCountElement.style.transform = 'scale(1)';
  }, 300);
});

// ===== COLLAPSIBLE TIMELINE FUNCTIONALITY =====

// Get all collapsible elements
const collapsibles = document.getElementsByClassName('collapsible');

// Add click event to each collapsible element
for (let i = 0; i < collapsibles.length; i++) {
  collapsibles[i].addEventListener('click', function() {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
}

// ===== FORM VALIDATION FUNCTIONALITY =====

// Get form and feedback elements
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

// Add submit event listener to form
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Validate form
  let isValid = true;
  let errorMessage = '';
  
  // Name validation
  if (name.length < 2) {
    isValid = false;
    errorMessage = 'Name must be at least 2 characters long.';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address.';
  }
  
  // Message validation
  if (message.length < 10) {
    isValid = false;
    errorMessage = 'Message must be at least 10 characters long.';
  }
  
  // Show feedback
  if (isValid) {
    formFeedback.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    formFeedback.className = 'success';
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 5000);
  } else {
    formFeedback.textContent = errorMessage;
    formFeedback.className = 'error';
  }
});

// Open first timeline item by default
if (collapsibles.length > 0) {
  collapsibles[0].click();
}