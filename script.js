document.addEventListener('DOMContentLoaded', function() {
    // Hantera formulärinlämning
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Samla formulärdata
        const formData = {
            namn: form.querySelector('input[type="text"]').value,
            epost: form.querySelector('input[type="email"]').value,
            telefon: form.querySelector('input[type="tel"]').value,
            meddelande: form.querySelector('textarea').value,
        };

        // Här kan du lägga till kod för att skicka data till en server
        console.log('Formulärdata:', formData);
        
        // Återställ formuläret
        form.reset();
        alert('Tack för ditt meddelande! Vi återkommer så snart som möjligt.');
    });

    // Smooth scroll för ankarlänkar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easing = t => t<.5 ? 2*t*t : -1+(4-2*t)*t; // Easing funktion
                    
                    window.scrollTo(0, startPosition + distance * easing(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Lägg till animation index för service items
    document.querySelectorAll('.service-item').forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Lägg till animation index för form groups
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.setProperty('--item-index', index);
    });

    // Intersection Observer för att trigga animationer när element blir synliga
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observera sektioner för scroll-animationer
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
