// Väntar på att DOM ska laddas helt innan skriptet körs
document.addEventListener('DOMContentLoaded', function() {
    // Hanterar header scroll-effekt
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    // Funktion som hanterar header scroll
    function handleScroll() {
        // Header effekt
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Lyssnar efter scroll-event med passive flag för bättre prestanda
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sätter upp Intersection Observer för att animera sektioner när de blir synliga
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Lägger till index för animationsordning i hero-listan
    document.querySelectorAll('.hero ul li').forEach((li, index) => {
        li.style.setProperty('--item-index', index);
    });

    // Mjuk scrollning för länkar
    document.querySelectorAll('nav a, .cta-container a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Stäng mobilmenyn om den är öppen
                const nav = document.querySelector('nav');
                const hamburger = document.querySelector('.hamburger');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Hamburgermenyfunktionalitet
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Stats circle-interaktion
const circles = document.querySelectorAll('.stat-circle');
const statsText = document.querySelector('.stats-text p');
const statsTitle = document.querySelector('.stats-text h2');

if (circles.length > 0) {
    // Aktiverar första cirkeln som standard
    circles[0].classList.add('active');
    if (statsText && statsTitle) {
        statsText.innerHTML = circles[0].dataset.text;
        statsTitle.textContent = circles[0].dataset.title;
    }

    circles.forEach((circle, index) => {
        if (!circle.classList.contains('bottom')) {
            circle.addEventListener('click', () => {
                circles.forEach(c => c.classList.remove('active'));
                circle.classList.add('active');

                if (statsText && statsTitle) {
                    statsText.innerHTML = circle.dataset.text;
                    statsTitle.textContent = circle.dataset.title;
                    
                    // Lägg till tooltip-funktionalitet efter att SVG:n har renderats
                    if (circle.id === 'circle-2') {
                        const tooltip = document.getElementById('tooltip');
                        console.log('Tooltip element:', tooltip);
                        console.log('Tooltip style:', window.getComputedStyle(tooltip));
                        
                        const tooltips = {
                            'dot1': '1991 började jag min karriär som injusterare av rörsystem på Värmex Konsult AB',
                            'dot2': '1992-1993 vidareutbildade mig inom uppvärmningsteknik på STI parallellt med mitt arbete',
                            'dot3': 'Sedan dess har jag arbetat som konstruktör på flera ledande företag som Torsten Palmqvist AB, Grontmij och Energiverket',
                            'dot4': '2022 startade jag Brown VVS för att kunna erbjuda spetskompetens inom VVS-projektering och injustering'
                        };

                        // Vänta en kort stund för att säkerställa att SVG:n har renderats
                        setTimeout(() => {
                            Object.keys(tooltips).forEach(dotId => {
                                const dot = document.getElementById(dotId);
                                console.log(`Söker efter dot med id ${dotId}:`, dot);
                                
                                if (dot) {
                                    // Lägg till transition för smooth färgändring
                                    dot.style.transition = 'fill 0.3s ease';
                                    
                                    dot.addEventListener('mouseover', (event) => {
                                        console.log(`Hover på ${dotId}`);
                                        tooltip.innerText = tooltips[dotId];
                                        tooltip.classList.add('visible');
                                        tooltip.style.left = event.clientX + 'px';
                                        tooltip.style.top = (event.clientY - 40) + 'px';
                                        // Ändra färg på dot vid hover
                                        dot.style.fill = 'rgb(141, 198, 163)';
                                        
                                        // Hitta och ändra färg på motsvarande text
                                        const texts = document.querySelectorAll('#Layer_1 text');
                                        texts.forEach((text, index) => {
                                            if (index === Object.keys(tooltips).indexOf(dotId)) {
                                                text.style.transition = 'fill 0.3s ease';
                                                text.style.fill = 'rgb(141, 198, 163)';
                                            }
                                        });
                                    });

                                    // Lägg till mousemove event för att uppdatera tooltip position
                                    dot.addEventListener('mousemove', (event) => {
                                        tooltip.style.left = event.clientX + 'px';
                                        tooltip.style.top = (event.clientY - 40) + 'px';
                                    });

                                    dot.addEventListener('mouseout', () => {
                                        console.log(`Mouseout från ${dotId}`);
                                        tooltip.classList.remove('visible');
                                        // Återställ original färg på dot
                                        dot.style.fill = '#f1f2f2';
                                        
                                        // Återställ färgen på motsvarande text
                                        const texts = document.querySelectorAll('#Layer_1 text');
                                        texts.forEach((text, index) => {
                                            if (index === Object.keys(tooltips).indexOf(dotId)) {
                                                text.style.fill = '#f1f2f2';
                                            }
                                        });
                                    });
                                }
                            });
                        }, 100);
                    }
                }

                const bottomCircle = document.querySelector('.stat-circle.bottom');
                if (bottomCircle) {
                    bottomCircle.querySelectorAll('.content').forEach(content => {
                        content.classList.remove('active');
                    });
                    const nextContent = bottomCircle.querySelector(`[data-for="circle-${index + 1}"]`);
                    if (nextContent) {
                        nextContent.classList.add('active');
                    }
                }
            });
        }
    });
}

    // Mobilversion av stats
    const mobileHeaderItems = document.querySelectorAll('.mobile-header-item');
    const mobileContents = document.querySelectorAll('.mobile-content');

    mobileHeaderItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentType = item.dataset.content;
            
            mobileHeaderItems.forEach(headerItem => {
                headerItem.classList.remove('active');
            });
            item.classList.add('active');
            
            mobileContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.content === contentType) {
                    content.classList.add('active');
                }
            });
        });
    });


});