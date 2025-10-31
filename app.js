// Responsive Font Size Function
function setResponsiveFontSize() {
    const width = window.innerWidth;
    let baseFontSize;

    if (width < 360) {
        baseFontSize = 14;
    } else if (width < 480) {
        baseFontSize = 15;
    } else if (width < 768) {
        baseFontSize = 16;
    } else if (width < 1024) {
        baseFontSize = 17;
    } else if (width < 1440) {
        baseFontSize = 18;
    } else {
        baseFontSize = 19;
    }

    document.documentElement.style.fontSize = baseFontSize + 'px';
}

// Initialize responsive font size
setResponsiveFontSize();
window.addEventListener('resize', setResponsiveFontSize);

// Loading Animation
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const mainContent = document.getElementById('main-content');
const text = 'In Loving Memory';
let charIndex = 0;

function typeWriter() {
    if (charIndex < text.length) {
        loadingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.classList.add('visible');
                initScrollAnimations();
            }, 50);
        }, 800);
    }
}

// Start loading animation
window.addEventListener('load', () => {
    setTimeout(typeWriter, 300);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = window.innerWidth >= 768 ? 100 : 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

function handleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScrollToTopButton);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scripture Slider
const scriptureSlides = document.querySelectorAll('.scripture-slide');
let currentSlide = 0;

function showNextScripture() {
    scriptureSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % scriptureSlides.length;
    scriptureSlides[currentSlide].classList.add('active');
}

setInterval(showNextScripture, 6000);

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
}

// Gallery View Toggle
const btnViewAll = document.getElementById('btn-view-all');
const btnBack = document.getElementById('btn-back');
const mainView = document.getElementById('main-view');
const galleryView = document.getElementById('gallery-view');
const mobileHeader = document.getElementById('mobile-header');
const desktopHeader = document.getElementById('desktop-header');

btnViewAll.addEventListener('click', () => {
    mainView.classList.add('hidden');
    if (mobileHeader) mobileHeader.style.display = 'none';
    if (desktopHeader) desktopHeader.style.display = 'none';
    scrollToTopBtn.style.display = 'none';
    galleryView.classList.remove('hidden');
    setTimeout(() => {
        galleryView.classList.add('visible');
    }, 50);
    window.scrollTo(0, 0);
});

btnBack.addEventListener('click', () => {
    galleryView.classList.remove('visible');
    setTimeout(() => {
        galleryView.classList.add('hidden');
        if (window.innerWidth >= 768) {
            if (desktopHeader) desktopHeader.style.display = 'block';
        } else {
            if (mobileHeader) mobileHeader.style.display = 'flex';
        }
        scrollToTopBtn.style.display = 'flex';
        mainView.classList.remove('hidden');
    }, 400);
    window.scrollTo(0, 0);
});

// Comment Modal
const btnMessageComments = document.getElementById('btn-message-comments');
const commentModal = document.getElementById('comment-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const commentForm = document.getElementById('comment-form');
const formSuccess = document.getElementById('form-success');

function openModal() {
    commentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    commentModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        commentForm.classList.remove('hidden');
        formSuccess.classList.add('hidden');
        commentForm.reset();
    }, 300);
}

if (btnMessageComments) {
    btnMessageComments.addEventListener('click', openModal);
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Comments Storage
let comments = JSON.parse(localStorage.getItem('memorialComments')) || [];

// Display Comments
function displayComments() {
    const commentsList = document.getElementById('comments-list');
    const btnViewAllComments = document.getElementById('btn-view-all-comments');

    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; color: var(--text-light); font-size: 1.125rem;">No messages yet. Be the first to share your memories.</p>';
        btnViewAllComments.classList.add('hidden');
        return;
    }

    commentsList.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item fade-in-up';

        const initials = comment.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        commentItem.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar">${initials}</div>
                <div class="comment-info">
                    <h4>${comment.name}</h4>
                    <span class="comment-date">${comment.date}</span>
                </div>
            </div>
            <p class="comment-text">${comment.message}</p>
        `;

        commentsList.appendChild(commentItem);
    });

    // Show "View All Comments" button if more than 3 comments
    if (comments.length > 3) {
        commentsList.classList.add('collapsed');
        btnViewAllComments.classList.remove('hidden');
    } else {
        commentsList.classList.remove('collapsed');
        btnViewAllComments.classList.add('hidden');
    }

    // Re-initialize scroll animations for new comments
    initScrollAnimations();
}

// View All Comments Toggle
const btnViewAllComments = document.getElementById('btn-view-all-comments');
let commentsExpanded = false;

btnViewAllComments.addEventListener('click', () => {
    const commentsList = document.getElementById('comments-list');
    commentsExpanded = !commentsExpanded;

    if (commentsExpanded) {
        commentsList.classList.remove('collapsed');
        btnViewAllComments.textContent = 'Show Less';
    } else {
        commentsList.classList.add('collapsed');
        btnViewAllComments.textContent = 'View All Comments';
        // Scroll to comments section
        const commentsSection = document.getElementById('comments');
        const headerOffset = window.innerWidth >= 768 ? 100 : 80;
        const elementPosition = commentsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Handle form submission
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('visitor-name').value;
    const message = document.getElementById('visitor-message').value;

    // Create new comment object
    const newComment = {
        name: name,
        message: message,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };

    // Add to comments array (newest first)
    comments.unshift(newComment);

    // Save to localStorage
    localStorage.setItem('memorialComments', JSON.stringify(comments));

    // Display updated comments
    displayComments();

    // Hide form and show success message
    commentForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');

    // Auto close modal after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
});

// Initialize comments display on page load
displayComments();

// Lightbox for Gallery Images
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const placeholder = item.querySelector('.gallery-placeholder');
        const caption = placeholder.querySelector('span').textContent;

        lightboxContent.innerHTML = `
            <div style="text-align: center;">
                <div style="background: linear-gradient(135deg, var(--memorial-tan) 0%, var(--memorial-beige) 100%); 
                            width: 100%; 
                            max-width: 600px; 
                            aspect-ratio: 1; 
                            border-radius: 10px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            color: var(--text-secondary); 
                            font-size: 1.5rem; 
                            margin: 0 auto;
                            box-shadow: var(--shadow-lg);">
                    ${caption}
                </div>
            </div>
        `;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (commentModal.classList.contains('active')) {
            closeModal();
        }
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
