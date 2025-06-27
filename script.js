// Enhanced Coffee Shop Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Coffee bean cursor trail effect
    let coffeBeans = [];
    const maxBeans = 15;
    
    function createCoffeeBeanTrail(e) {
        if (Math.random() > 0.85) { // Only create occasionally for performance
            const bean = document.createElement('div');
            bean.className = 'cursor-coffee-bean';
            bean.style.cssText = `
                position: fixed;
                pointer-events: none;
                width: 8px;
                height: 10px;
                background: #8B4513;
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                z-index: 9999;
                left: ${e.clientX - 4}px;
                top: ${e.clientY - 5}px;
                opacity: 0.7;
                transform: rotate(${Math.random() * 360}deg);
                transition: all 0.8s ease-out;
            `;
            
            document.body.appendChild(bean);
            coffeBeans.push(bean);
            
            // Animate the bean
            setTimeout(() => {
                bean.style.transform += ' scale(0) translateY(30px)';
                bean.style.opacity = '0';
            }, 50);
            
            // Remove the bean after animation
            setTimeout(() => {
                if (bean.parentNode) {
                    bean.parentNode.removeChild(bean);
                }
                coffeBeans = coffeBeans.filter(b => b !== bean);
            }, 850);
            
            // Limit the number of beans
            if (coffeBeans.length > maxBeans) {
                const oldBean = coffeBeans.shift();
                if (oldBean && oldBean.parentNode) {
                    oldBean.parentNode.removeChild(oldBean);
                }
            }
        }
    }

    // Add cursor trail only in hero section
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mousemove', createCoffeeBeanTrail);

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero image
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroOverlay = document.querySelector('.hero-overlay');
        
        if (heroImage && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
        }
    });

    // Coffee steam animation enhancement
    function enhanceSteamAnimation() {
        const steam = document.querySelector('.coffee-steam');
        if (steam) {
            // Add random delays to make steam more realistic
            steam.style.animationDelay = Math.random() * 2 + 's';
        }
    }
    
    enhanceSteamAnimation();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.section-title, .about-description, .feature, .gallery-item, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Gallery hover effects enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.filter = 'brightness(1) contrast(1)';
            }
        });
    });

    // Mobile menu toggle functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Add mobile menu styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                border-radius: 0 0 20px 20px;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(mobileStyle);

    // Add coffee aroma particles effect
    function createAromaParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(139, 69, 19, 0.3);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: 80%;
                    pointer-events: none;
                    z-index: 1;
                    animation: aromaFloat 4s ease-out forwards;
                `;
                
                hero.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 4000);
            }
        }, 500);
    }

    // Add aroma animation
    const aromaStyle = document.createElement('style');
    aromaStyle.textContent = `
        @keyframes aromaFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(1);
            }
            20% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-200px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(aromaStyle);
    
    createAromaParticles();

    // Performance optimization: Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('.coffee-steam, .coffee-bean, .coffee-cup, .floating-text');
        
        if (document.hidden) {
            animations.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });

    // Instagram feed integration
    function loadInstagramFeed() {
        // Hide loading spinner after a few seconds and show fallback
        setTimeout(() => {
            const loading = document.querySelector('.instagram-loading');
            const fallback = document.querySelector('.instagram-fallback');
            
            if (loading) {
                loading.style.display = 'none';
            }
            if (fallback) {
                fallback.style.display = 'grid';
            }
        }, 2000);
        
        // Load Instagram embed script
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        } else {
            const script = document.createElement('script');
            script.async = true;
            script.src = '//www.instagram.com/embed.js';
            document.head.appendChild(script);
        }
    }
    
    // Initialize Instagram feed
    loadInstagramFeed();
    
    // Add Instagram-style animations to posts
    document.querySelectorAll('.instagram-post').forEach((post, index) => {
        post.style.animationDelay = `${index * 0.1}s`;
        post.classList.add('fade-in');
        
        // Add click handler to open Instagram (simulation)
        post.addEventListener('click', function() {
            // Create a subtle zoom effect on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // In a real implementation, this would open the actual Instagram post
                window.open('https://www.instagram.com/_ethels_/', '_blank');
            }, 150);
        });
    });
    
    // Add hover effects to Instagram elements
    document.querySelectorAll('.instagram-follow-btn, .instagram-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add dynamic like animation
    function createLikeAnimation(element) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 24px;
            z-index: 1000;
            pointer-events: none;
            animation: likeFloat 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        heart.style.left = rect.left + rect.width/2 + 'px';
        heart.style.top = rect.top + rect.height/2 + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
    
    // Add like animation styles
    const likeStyle = document.createElement('style');
    likeStyle.textContent = `
        @keyframes likeFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(likeStyle);
    
    // Add double-click like functionality to Instagram posts
    document.querySelectorAll('.instagram-post').forEach(post => {
        let clickCount = 0;
        post.addEventListener('click', function(e) {
            clickCount++;
            if (clickCount === 1) {
                setTimeout(() => {
                    if (clickCount === 2) {
                        // Double click - create like animation
                        createLikeAnimation(this);
                        
                        // Update like count (simulation)
                        const likesSpan = this.querySelector('.likes');
                        if (likesSpan) {
                            const currentLikes = parseInt(likesSpan.textContent.match(/\d+/)[0]);
                            likesSpan.textContent = `❤️ ${currentLikes + 1}`;
                        }
                    }
                    clickCount = 0;
                }, 300);
            }
        });
    });
    
    console.log('☕ Ethel\'s Coffee Shop website with Instagram integration loaded successfully! 📷');
});
