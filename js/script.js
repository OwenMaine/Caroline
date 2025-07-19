/*
 * Carolina Catfish Yachts - Custom JavaScript
 * Author: Your Name/Company
 * Version: 1.0
 */

document.addEventListener("DOMContentLoaded", function() {

    // Initialize Animate on Scroll (AOS)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // ======================= Sticky Header & Back to Top Button =======================
    const header = document.querySelector('.header');
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // ======================= Mobile Navigation (Hamburger Menu) =======================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // ======================= Testimonial Carousel (Homepage) =======================
    const testimonials = [
        {
            quote: "The River Phantom is an absolute beast. I've never felt more confident on the water. The stability and storage are second to none.",
            author: "– Mark T., Tennessee River"
        },
        {
            quote: "From the first call to the final delivery, the team at Carolina Catfish Yachts was incredible. They built my dream boat, exactly to my specs.",
            author: "– David L., Custom Build Owner"
        },
        {
            quote: "I've owned boats from nearly every major brand, and my CCY is by far the best-built boat I've ever set foot in. The craftsmanship is flawless.",
            author: "– Brian S., Santee Cooper"
        }
    ];

    const testimonialContainer = document.querySelector('.testimonial-carousel');
    if (testimonialContainer) {
        let currentTestimonial = 0;

        const showTestimonial = () => {
            const slide = testimonials[currentTestimonial];
            testimonialContainer.innerHTML = `
                <div class="testimonial-slide active">
                    <p>"${slide.quote}"</p>
                    <div class="author">${slide.author}</div>
                </div>
            `;
        };

        const nextTestimonial = () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial();
        };

        showTestimonial();
        setInterval(nextTestimonial, 7000); // Change testimonial every 7 seconds
    }


    // ======================= Boat Model Filtering (Boats Page) =======================
    window.filterBoats = function(category) {
        const boatCards = document.querySelectorAll('.boat-grid .boat-card');
        const tabLinks = document.querySelectorAll('.tabs .tab-link');
        
        // Update active tab
        tabLinks.forEach(tab => {
            tab.classList.remove('active');
            if(tab.getAttribute('onclick').includes(category)) {
                tab.classList.add('active');
            }
        });

        // Filter cards
        boatCards.forEach(card => {
            if (category === 'all' || card.classList.contains(category)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ======================= Modal Logic (Boats Page) =======================
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    // ======================= Gallery Lightbox (Gallery Page) =======================
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex;

    if (galleryItems.length > 0) {
        const images = Array.from(galleryItems).map(item => item.src);
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = item.src;
                currentImageIndex = index;
            });
        });
        
        const showImage = (index) => {
            lightboxImg.src = images[index];
            currentImageIndex = index;
        };

        lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
        lightboxPrev.addEventListener('click', () => showImage((currentImageIndex - 1 + images.length) % images.length));
        lightboxNext.addEventListener('click', () => showImage((currentImageIndex + 1) % images.length));
        
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                 lightbox.style.display = 'none';
            }
        });
    }

    // ======================= Footer: Auto-update Year =======================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});