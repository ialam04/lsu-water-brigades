// LSU Water Brigades Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinkItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === '/') ||
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial call

    // Gallery modal functionality
    function initGalleryModal() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        // Create modal HTML
        const modalHTML = `
            <div id="gallery-modal" class="gallery-modal" style="display: none;">
                <div class="modal-backdrop" onclick="closeGalleryModal()"></div>
                <div class="modal-content">
                    <span class="modal-close" onclick="closeGalleryModal()">&times;</span>
                    <img id="modal-image" src="" alt="">
                    <div class="modal-nav">
                        <button id="modal-prev" onclick="navigateGallery(-1)">&lt;</button>
                        <button id="modal-next" onclick="navigateGallery(1)">&gt;</button>
                    </div>
                    <div id="modal-caption"></div>
                </div>
            </div>
        `;
        
        // Add modal to page if it doesn't exist
        if (!document.getElementById('gallery-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Add click event to gallery images
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', function() {
                openGalleryModal(img.src, img.alt, index);
            });
        });
    }

    // Gallery modal functions (global scope)
    window.openGalleryModal = function(src, alt, index) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        
        modalImage.src = src;
        modalImage.alt = alt;
        modalCaption.textContent = alt;
        modal.style.display = 'flex';
        modal.currentIndex = index;
        
        document.body.style.overflow = 'hidden';
    };

    window.closeGalleryModal = function() {
        const modal = document.getElementById('gallery-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.navigateGallery = function(direction) {
        const modal = document.getElementById('gallery-modal');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        let newIndex = modal.currentIndex + direction;
        
        if (newIndex < 0) newIndex = galleryItems.length - 1;
        if (newIndex >= galleryItems.length) newIndex = 0;
        
        const newImage = galleryItems[newIndex];
        openGalleryModal(newImage.src, newImage.alt, newIndex);
    };

    // Initialize gallery modal if gallery exists
    if (document.querySelector('.gallery')) {
        initGalleryModal();
    }

    // Email validation for any remaining email inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#ef4444';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#ddd';
                this.setCustomValidity('');
            }
        });
    });

    // Intersection Observer for animations (modern browsers)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Back to top button
    function addBackToTopButton() {
        const backToTopHTML = `
            <button id="back-to-top" class="back-to-top" style="display: none;" onclick="scrollToTop()">
                ↑
            </button>
        `;
        
        if (!document.getElementById('back-to-top')) {
            document.body.insertAdjacentHTML('beforeend', backToTopHTML);
        }

        window.addEventListener('scroll', function() {
            const backToTopBtn = document.getElementById('back-to-top');
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }

    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    addBackToTopButton();

    // Loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    hideLoadingScreen();

    // Image lazy loading for better performance
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    initLazyLoading();
});

// Add CSS for modal and additional elements
const additionalCSS = `
<style>
.gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    text-align: center;
}

.modal-content img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
}

.modal-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 2001;
}

.modal-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.modal-nav button {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    pointer-events: all;
    transition: background-color 0.3s ease;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    font-weight: bold;
}

.modal-nav button:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

#modal-caption {
    color: white;
    margin-top: 10px;
    font-size: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-weight: 500;
}

.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-to-top:hover {
    background-color: var(--accent-orange);
    transform: translateY(-2px);
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--light-blue);
    border-top: 5px solid var(--white);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

// Add the CSS to the document head
document.head.insertAdjacentHTML('beforeend', additionalCSS);