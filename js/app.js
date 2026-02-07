/**
 * April Studio & Cafe - Enhanced Animations
 * GSAP + ScrollTrigger + Lenis Smooth Scroll
 */

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('#home h1', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('#home p', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('#home .flex.flex-col a', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.7
});

// Animate sections on scroll
const sections = document.querySelectorAll('section:not(#home)');
sections.forEach(section => {
    gsap.from(section.querySelectorAll('h2, h3'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from(section.querySelectorAll('p'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
    });
});

// Menu cards - simple CSS animations instead of GSAP
// Cards are always visible, hover effects handled by Tailwind

// Vibe section image grid
gsap.from('#vibe .grid > div', {
    scrollTrigger: {
        trigger: '#vibe .grid',
        start: 'top 90%',
        once: true
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

// Studio section parallax
gsap.to('#studio img', {
    scrollTrigger: {
        trigger: '#studio',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: -50,
    ease: 'none'
});

// Floating blobs parallax
gsap.to('.animate-float', {
    scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    ease: 'none'
});

// ===== NAVBAR BEHAVIOR =====
let lastScroll = 0;
const navbar = document.getElementById('navbar');

lenis.on('scroll', ({ scroll }) => {
    // Add shadow on scroll
    if (scroll > 50) {
        navbar.classList.add('shadow-lg', 'shadow-blush/10');
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-blush/10');
    }
    lastScroll = scroll;
});

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.2
            });
        }
    });
});

// ===== MOBILE OPTIMIZATIONS =====
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
    // Reduce animation complexity on mobile
    gsap.globalTimeline.timeScale(1.5);
}

// ===== CURSOR EFFECT (DESKTOP ONLY) =====
if (!isMobile) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span class="cursor-dot">🌸</span>';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Hover effect on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

console.log('🌸 April Studio & Cafe - Animations Loaded');
