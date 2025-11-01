document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const offerCards = document.querySelectorAll('.offer-card');
    const offerContents = document.querySelectorAll('.offer-content');
    const bookButtons = document.querySelectorAll('.book-now-btn');
    const bookingForm = document.getElementById('booking-form');
    const selectedOfferInput = document.getElementById('selected-offer');
    const heroBookBtn = document.querySelector('.hero-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    let currentOffer = 'jais-flight';
    
    navbar.classList.add('loaded');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        const elements = document.querySelectorAll('.offer-card, .section-title');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    heroBookBtn.addEventListener('click', function() {
        document.querySelector('.activities').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    offerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        card.addEventListener('click', function() {
            const offerType = this.getAttribute('data-offer');
            showOffer(offerType);
            
            offerCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    document.querySelector('.section-title').style.opacity = '0';
    document.querySelector('.section-title').style.transform = 'translateY(30px)';
    document.querySelector('.section-title').style.transition = 'all 0.6s ease';
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('hero-btn')) {
                if (currentOffer) {
                    selectedOfferInput.value = currentOffer;
                    document.querySelector('.booking-form-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    function showOffer(offerType) {
        offerContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetOffer = document.getElementById(offerType);
        if (targetOffer) {
            targetOffer.classList.add('active');
            currentOffer = offerType;
            
            targetOffer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('full-name').value,
            number: document.getElementById('phone-number').value,
            offer: selectedOfferInput.value || 'General Inquiry'
        };
        
        fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Thank you for your booking! We will contact you soon.');
                bookingForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your booking. Please try again.');
        });
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing with: ' + email);
        this.reset();
    });
    
    setTimeout(() => {
        const elements = document.querySelectorAll('.offer-card, .section-title');
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
        
        document.querySelector('.offer-card.active').style.opacity = '1';
        document.querySelector('.offer-card.active').style.transform = 'translateY(0)';
    }, 300);
});