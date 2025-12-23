// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-menu a');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Portfolio Functions
function renderPortfolioItem(project) {
    const images = getProjectImages(project);
    const hasMultipleImages = images.length > 1;
    const imageId = `project-image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create image slideshow HTML
    const imagesHTML = images.map((img, index) => 
        `<img src="${img}" alt="${project.name}" class="portfolio-slide ${index === 0 ? 'active' : ''}" data-index="${index}">`
    ).join('');
    
    // Add indicators if multiple images
    const indicatorsHTML = hasMultipleImages 
        ? `<div class="portfolio-indicators">${images.map((_, index) => 
            `<span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
        ).join('')}</div>`
        : '';
    
    return `
        <div class="portfolio-item" data-category="${project.category}" data-image-id="${imageId}">
            <div class="portfolio-image ${hasMultipleImages ? 'has-slideshow' : ''}">
                ${imagesHTML}
                ${indicatorsHTML}
            </div>
            <div class="portfolio-info">
                <h3>${project.name}</h3>
                <p>${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                <span class="project-date">${formatDate(project.date)}</span>
            </div>
        </div>
    `;
}

function renderPortfolioFilters(containerSelector, projectsToUse = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Use provided projects or all projects for category detection
    const projectsForCategories = projectsToUse || projects;
    const categories = new Set();
    projectsForCategories.forEach(project => {
        if (project.category) {
            categories.add(project.category);
        }
    });
    const sortedCategories = Array.from(categories).sort();
    
    // Build filter buttons HTML
    let filtersHTML = '<button class="filter-btn active" data-filter="all">All</button>';
    
    sortedCategories.forEach(category => {
        const formattedName = formatCategoryName(category);
        filtersHTML += `<button class="filter-btn" data-filter="${category}">${formattedName}</button>`;
    });
    
    container.innerHTML = filtersHTML;
}

function renderPortfolio(projects, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = projects.map(project => renderPortfolioItem(project)).join('');
    
    // Initialize image slideshows for projects with multiple images
    initializePortfolioSlideshows();
    
    // Re-initialize portfolio filter after rendering
    initializePortfolioFilter();
}

// Initialize auto-rotating slideshows for portfolio images
function initializePortfolioSlideshows() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const slideshowInterval = 3000; // 3 seconds between image changes
    
    portfolioItems.forEach(item => {
        const slides = item.querySelectorAll('.portfolio-slide');
        const indicators = item.querySelectorAll('.indicator');
        
        // Only initialize if there are multiple images
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show current slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        
        // Start auto-rotation
        const intervalId = setInterval(nextSlide, slideshowInterval);
        
        // Pause on hover
        item.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        // Resume on mouse leave
        item.addEventListener('mouseleave', () => {
            const newIntervalId = setInterval(nextSlide, slideshowInterval);
            // Store interval ID for cleanup if needed
            item.dataset.intervalId = newIntervalId;
        });
        
        // Click indicators to jump to specific image
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                clearInterval(intervalId);
                // Restart interval after manual selection
                setTimeout(() => {
                    const newIntervalId = setInterval(nextSlide, slideshowInterval);
                    item.dataset.intervalId = newIntervalId;
                }, slideshowInterval);
            });
        });
    });
}

function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Remove existing event listeners by cloning and replacing buttons
    filterButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    // Get fresh references after cloning
    const freshFilterButtons = document.querySelectorAll('.filter-btn');
    const freshPortfolioItems = document.querySelectorAll('.portfolio-item');

    freshFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            freshFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            freshPortfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all items when "All" is selected
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else if (itemCategory === filterValue) {
                    // Show matching category items
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide non-matching items
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio Filter initialization is now handled dynamically in renderPortfolio()
// No need for backward compatibility check as filters are always generated dynamically

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler with Formspree integration
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    // Show status message helper
    function showStatus(message, isError = false) {
        if (formStatus) {
            formStatus.style.display = 'block';
            formStatus.textContent = message;
            formStatus.style.backgroundColor = isError ? '#fee2e2' : '#d1fae5';
            formStatus.style.color = isError ? '#991b1b' : '#065f46';
            formStatus.style.border = `1px solid ${isError ? '#fca5a5' : '#6ee7b7'}`;
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        // Hide previous status
        if (formStatus) formStatus.style.display = 'none';

        // Validation
        if (!name || !email || !message) {
            showStatus('Please fill in all required fields.', true);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Please enter a valid email address.', true);
            return;
        }

        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatus('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                
                // Scroll to status message
                if (formStatus) {
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                const data = await response.json();
                if (data.errors) {
                    showStatus('There was an error: ' + data.errors.map(error => error.message).join(', '), true);
                } else {
                    showStatus('Sorry, there was an error sending your message. Please try again or call us directly.', true);
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('Sorry, there was an error sending your message. Please try again or call us directly.', true);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .about-text, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Client Functions
function renderMajorClients(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    if (typeof majorClients !== 'undefined') {
        const clients = getMajorClients();
        const listHTML = clients.map(client => `<li>${client}</li>`).join('');
        container.innerHTML = `<ul class="clients-list-items">${listHTML}</ul>`;
    }
}

function renderClientLogos(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    if (typeof clientLogos !== 'undefined') {
        const logos = getClientLogos();
        const logosHTML = logos.map(logo => 
            `<div class="client-logo-item">
                <img src="${logo.image}" alt="${logo.name}">
            </div>`
        ).join('');
        container.innerHTML = logosHTML;
    }
}

// Hero Background Slideshow
function initializeHeroSlideshow() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    if (typeof projects === 'undefined') return;
    
    const highlightedProjects = getHighlightedProjects();
    const projectsToShow = highlightedProjects.length > 0 ? highlightedProjects : projects;
    
    if (projectsToShow.length === 0) return;
    
    const slideshowContainer = document.querySelector('.hero-background-slideshow');
    const projectShowcaseContainer = document.querySelector('.hero-project-showcase');
    
    if (!slideshowContainer || !projectShowcaseContainer) return;
    
    // Group projects by category
    const projectsByCategory = {};
    projectsToShow.forEach(project => {
        if (!projectsByCategory[project.category]) {
            projectsByCategory[project.category] = [];
        }
        projectsByCategory[project.category].push(project);
    });
    
    const categories = Object.keys(projectsByCategory);
    
    // Create slides for all projects (we'll show them selectively)
    const allSlides = [];
    projectsToShow.forEach((project, index) => {
        const images = getProjectImages(project);
        const firstImage = images[0];
        allSlides.push({
            project: project,
            image: firstImage,
            element: null
        });
    });
    
    // Create HTML for all slides (initially hidden)
    const slidesHTML = allSlides.map((slide, index) => {
        return `<img src="${slide.image}" alt="${slide.project.name}" class="hero-background-slide ${index === 0 ? 'active' : ''}" data-project-name="${slide.project.name}" data-project-category="${slide.project.category}">`;
    }).join('');
    
    slideshowContainer.innerHTML = slidesHTML;
    
    // Store references to slides
    const slides = slideshowContainer.querySelectorAll('.hero-background-slide');
    slides.forEach((slide, index) => {
        allSlides[index].element = slide;
    });
    
    // Initialize with first project
    const firstProject = projectsToShow[0];
    const showcaseHTML = `
        <div class="showcase-label">Featured Project</div>
        <div class="showcase-content">
            <span class="project-name">${firstProject.name}</span>
            <span class="project-category">${formatCategoryName(firstProject.category)}</span>
        </div>
    `;
    projectShowcaseContainer.innerHTML = showcaseHTML;
    projectShowcaseContainer.classList.add('active');
    
    let currentCategory = firstProject.category;
    let currentProjectIndex = 0;
    let currentProject = firstProject;
    const slideInterval = 5000; // 5 seconds per slide
    let autoRotateInterval = null;
    
    function getNextProjectFromDifferentCategory() {
        // Get all categories except the current one
        const availableCategories = categories.filter(cat => cat !== currentCategory);
        
        if (availableCategories.length === 0) {
            // If only one category exists, just cycle through projects
            currentProjectIndex = (currentProjectIndex + 1) % projectsToShow.length;
            currentProject = projectsToShow[currentProjectIndex];
            currentCategory = currentProject.category;
            return currentProject;
        }
        
        // Select a random category from available categories
        const nextCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        
        // Get projects from that category
        const categoryProjects = projectsByCategory[nextCategory];
        
        // Select a random project from that category
        const randomProject = categoryProjects[Math.floor(Math.random() * categoryProjects.length)];
        
        // Find the index of this project in the main array
        currentProjectIndex = projectsToShow.findIndex(p => p.name === randomProject.name);
        currentCategory = nextCategory;
        currentProject = randomProject;
        
        return randomProject;
    }
    
    function getPreviousProjectFromDifferentCategory() {
        // Get all categories except the current one
        const availableCategories = categories.filter(cat => cat !== currentCategory);
        
        if (availableCategories.length === 0) {
            // If only one category exists, just cycle through projects
            currentProjectIndex = (currentProjectIndex - 1 + projectsToShow.length) % projectsToShow.length;
            currentProject = projectsToShow[currentProjectIndex];
            currentCategory = currentProject.category;
            return currentProject;
        }
        
        // Select a random category from available categories
        const prevCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        
        // Get projects from that category
        const categoryProjects = projectsByCategory[prevCategory];
        
        // Select a random project from that category
        const randomProject = categoryProjects[Math.floor(Math.random() * categoryProjects.length)];
        
        // Find the index of this project in the main array
        currentProjectIndex = projectsToShow.findIndex(p => p.name === randomProject.name);
        currentCategory = prevCategory;
        currentProject = randomProject;
        
        return randomProject;
    }
    
    function showSlide(project, pauseAutoRotate = false) {
        // Pause auto-rotation if manually navigating
        if (pauseAutoRotate && autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
            // Restart auto-rotation after 10 seconds
            setTimeout(() => {
                if (projectsToShow.length > 1) {
                    autoRotateInterval = setInterval(nextSlide, slideInterval);
                }
            }, 10000);
        }
        
        // Update current project
        currentProject = project;
        currentCategory = project.category;
        currentProjectIndex = projectsToShow.findIndex(p => p.name === project.name);
        
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        projectShowcaseContainer.classList.remove('active');
        
        // Find and show the slide for this project
        setTimeout(() => {
            const slideIndex = projectsToShow.findIndex(p => p.name === project.name);
            if (slides[slideIndex]) {
                slides[slideIndex].classList.add('active');
                projectShowcaseContainer.innerHTML = `
                    <div class="showcase-label">Featured Project</div>
                    <div class="showcase-content">
                        <span class="project-name">${project.name}</span>
                        <span class="project-category">${formatCategoryName(project.category)}</span>
                    </div>
                `;
                projectShowcaseContainer.classList.add('active');
            }
        }, 300);
    }
    
    function nextSlide() {
        const nextProject = getNextProjectFromDifferentCategory();
        showSlide(nextProject);
    }
    
    function prevSlide() {
        const prevProject = getPreviousProjectFromDifferentCategory();
        showSlide(prevProject, true);
    }
    
    // Arrow navigation
    const prevArrow = document.querySelector('.hero-nav-prev');
    const nextArrow = document.querySelector('.hero-nav-next');
    
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            const nextProject = getNextProjectFromDifferentCategory();
            showSlide(nextProject, true);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (heroSection.contains(document.activeElement) || document.activeElement === document.body) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextProject = getNextProjectFromDifferentCategory();
                showSlide(nextProject, true);
            }
        }
    });
    
    // Start auto-rotation
    if (projectsToShow.length > 1) {
        autoRotateInterval = setInterval(nextSlide, slideInterval);
    }
}

// Initialize
updateActiveNav();

