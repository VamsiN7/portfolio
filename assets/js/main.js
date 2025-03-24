/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

	// Mobile Menu Toggle
	const mobileMenuToggle = document.querySelector('.menu-toggle');
	const mobileCloseMenu = document.querySelector('.close-menu');
	const mobileNav = document.querySelector('.mobile-nav');

	if (mobileMenuToggle && mobileCloseMenu) {
		mobileMenuToggle.addEventListener('click', () => {
			mobileNav.classList.add('active');
		});

		mobileCloseMenu.addEventListener('click', () => {
			mobileNav.classList.remove('active');
		});
	}

	// Typewriter Effect
	const heroTypewriterText = document.querySelector('.typewriter');
	const heroText = "Full Stack Developer";
	let typewriterIndex = 0;

	function typeWriter() {
		if (heroTypewriterText && typewriterIndex < heroText.length) {
			heroTypewriterText.textContent += heroText.charAt(typewriterIndex);
			typewriterIndex++;
			setTimeout(typeWriter, 100);
		}
	}

	if (heroTypewriterText) {
		typeWriter();
	}

	// Intersection Observer for animations
	const fadeInObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
			}
		});
	}, { threshold: 0.1 });

	// Skill Bars Animation
	const animatedSkillBars = document.querySelectorAll('.skill-bar');
	animatedSkillBars.forEach(bar => {
		fadeInObserver.observe(bar);
	});

	// Project Cards Animation
	const animatedProjectCards = document.querySelectorAll('.project-card');
	animatedProjectCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			card.classList.add('hover');
		});
		card.addEventListener('mouseleave', () => {
			card.classList.remove('hover');
		});
	});

	// Contact Form Handling
	const portfolioContactForm = document.querySelector('#contact-form');
	if (portfolioContactForm) {
		portfolioContactForm.addEventListener('submit', (e) => {
			e.preventDefault();
			// Add your form submission logic here
		});
	}

	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Header scroll effect
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;
		
		if (currentScroll <= 0) {
			$header.removeClass('scroll-up');
			return;
		}
		
		if (currentScroll > lastScroll && !$header.hasClass('scroll-down')) {
			// Scroll Down
			$header.removeClass('scroll-up');
			$header.addClass('scroll-down');
		} else if (currentScroll < lastScroll && $header.hasClass('scroll-down')) {
			// Scroll Up
			$header.removeClass('scroll-down');
			$header.addClass('scroll-up');
		}
		lastScroll = currentScroll;
	});

	// Typewriter effect
	const typewriterText = document.querySelector('.typewriter');
	const text = typewriterText.textContent;
	typewriterText.textContent = '';

	let i = 0;
	function typeWriter() {
		if (i < text.length) {
			typewriterText.textContent += text.charAt(i);
			i++;
			setTimeout(typeWriter, 100);
		}
	}

	// Start typewriter effect when the element is in view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				typeWriter();
				observer.unobserve(entry.target);
			}
		});
	});

	observer.observe(typewriterText);

	// Skill bars animation
	const skillBars = document.querySelectorAll('.skill-progress');

	const animateSkillBars = () => {
		skillBars.forEach(bar => {
			const width = bar.style.width;
			bar.style.width = '0';
			setTimeout(() => {
				bar.style.width = width;
			}, 100);
		});
	};

	// Animate skill bars when they come into view
	const skillSection = document.querySelector('#skills');
	const skillObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				animateSkillBars();
				skillObserver.unobserve(entry.target);
			}
		});
	});

	skillObserver.observe(skillSection);

	// Project cards hover effect
	const projectCards = document.querySelectorAll('.project-card');

	projectCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			card.style.transform = 'translateY(-10px)';
		});
		
		card.addEventListener('mouseleave', () => {
			card.style.transform = 'translateY(0)';
		});
	});

	// Form submission
	const contactForm = document.querySelector('.contact-form');

	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();
		
		// Get form data
		const formData = new FormData(contactForm);
		const data = Object.fromEntries(formData);
		
		// Here you would typically send the data to a server
		console.log('Form submitted:', data);
		
		// Show success message
		const successMessage = document.createElement('div');
		successMessage.className = 'success-message';
		successMessage.textContent = 'Message sent successfully!';
		contactForm.appendChild(successMessage);
		
		// Clear form
		contactForm.reset();
		
		// Remove success message after 3 seconds
		setTimeout(() => {
			successMessage.remove();
		}, 3000);
	});

	// Parallax effect for hero section
	const heroSection = document.querySelector('#hero');
	const profileImage = document.querySelector('.profile-image');

	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		profileImage.style.transform = `translateY(${scrolled * 0.5}px)`;
	});

	// Add active class to navigation links based on scroll position
	const sections = document.querySelectorAll('section[id]');

	window.addEventListener('scroll', () => {
		const scrollY = window.pageYOffset;

		sections.forEach(section => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 100;
			const sectionId = section.getAttribute('id');

			// Find the corresponding navigation link
			const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
			
			if (navLink) {
				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
					navLink.classList.add('active');
				} else {
					navLink.classList.remove('active');
				}
			}
		});
	});

	// DOM Elements
	const header = document.getElementById('header');
	const menuToggle = document.querySelector('.menu-toggle');
	const menu = document.getElementById('menu');
	const closeMenu = document.querySelector('.close');
	const navLinks = document.querySelectorAll('.nav-links a, .menu-links a');
	const contactForm = document.getElementById('contactForm');
	const successMessage = document.querySelector('.success-message');

	// Header scroll effect
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Mobile menu toggle
	menuToggle.addEventListener('click', () => {
		menu.classList.add('active');
		document.body.style.overflow = 'hidden';
	});

	closeMenu.addEventListener('click', () => {
		menu.classList.remove('active');
		document.body.style.overflow = '';
	});

	// Close menu when clicking a link
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('active');
			document.body.style.overflow = '';
		});
	});

	// Smooth scroll for navigation links
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Typewriter effect
	const typewriterText = document.querySelector('.typewriter');
	const text = typewriterText.textContent;
	typewriterText.textContent = '';

	let i = 0;
	function typeWriter() {
		if (i < text.length) {
			typewriterText.textContent += text.charAt(i);
			i++;
			setTimeout(typeWriter, 100);
		}
	}

	// Start typewriter effect when section is in view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				typeWriter();
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	observer.observe(typewriterText);

	// Form submission
	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		
		const formData = new FormData(contactForm);
		const data = Object.fromEntries(formData);
		
		try {
			// Replace with your actual form submission endpoint
			const response = await fetch('YOUR_FORM_ENDPOINT', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			});
			
			if (response.ok) {
				contactForm.reset();
				successMessage.style.display = 'block';
				setTimeout(() => {
					successMessage.style.display = 'none';
				}, 5000);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	});

	// Scroll reveal animation
	const scrollReveal = () => {
		const elements = document.querySelectorAll('.scroll-reveal');
		
		elements.forEach(element => {
			const elementTop = element.getBoundingClientRect().top;
			const elementVisible = 150;
			
			if (elementTop < window.innerHeight - elementVisible) {
				element.classList.add('active');
			}
		});
	};

	window.addEventListener('scroll', scrollReveal);
	scrollReveal(); // Initial check

	// Project cards hover effect
	const projectCards = document.querySelectorAll('.project-card');
	projectCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			card.classList.add('hover');
		});
		
		card.addEventListener('mouseleave', () => {
			card.classList.remove('hover');
		});
	});

	// Skills progress animation
	const skillBars = document.querySelectorAll('.skill-progress');
	const animateSkills = () => {
		skillBars.forEach(bar => {
			const width = bar.style.width;
			bar.style.width = '0';
			setTimeout(() => {
				bar.style.width = width;
			}, 100);
		});
	};

	// Animate skills when section is in view
	const skillsSection = document.getElementById('skills');
	const skillsObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				animateSkills();
				skillsObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	skillsObserver.observe(skillsSection);

// Experience Wheel Implementation
// We'll add new implementation here

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#menu');
    const closeBtn = document.querySelector('.close');
    const menuLinks = document.querySelectorAll('.menu-links a');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close menu
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close menu when clicking outside
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Circular Navigation Class
class CircularNavigation {
    constructor(container, items) {
        this.container = container;
        this.items = Array.from(items);
        this.currentIndex = 0;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.createWrapper();
        this.createNavDots();
        this.setupSwipeIndicators();
        this.updatePositions();
        this.setupEventListeners();
    }

    createWrapper() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'circular-wrapper';
        this.items.forEach(item => this.wrapper.appendChild(item));
        this.container.appendChild(this.wrapper);
    }

    createNavDots() {
        const nav = document.createElement('div');
        nav.className = 'circular-nav';
        
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => this.goToItem(index));
            nav.appendChild(dot);
        });
        
        this.container.appendChild(nav);
        this.updateNavDots();
    }

    setupSwipeIndicators() {
        const leftIndicator = document.createElement('div');
        leftIndicator.className = 'swipe-indicator swipe-left';
        leftIndicator.innerHTML = '←';
        
        const rightIndicator = document.createElement('div');
        rightIndicator.className = 'swipe-indicator swipe-right';
        rightIndicator.innerHTML = '→';
        
        this.container.appendChild(leftIndicator);
        this.container.appendChild(rightIndicator);
    }

    updateNavDots() {
        const dots = this.container.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updatePositions() {
        this.items.forEach((item, index) => {
            const position = this.getPosition(index);
            item.className = item.className.split(' ')[0] + ' ' + position;
        });
        this.updateNavDots();
    }

    getPosition(index) {
        const diff = index - this.currentIndex;
        if (diff === 0) return 'active';
        if (diff === 1 || diff === -this.items.length + 1) return 'next';
        if (diff === -1 || diff === this.items.length - 1) return 'prev';
        if (diff > 1) return 'hidden-right';
        return 'hidden';
    }

    setupEventListeners() {
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (this.isAnimating) return;
            
            this.touchEndX = e.touches[0].clientX;
            const diff = this.touchStartX - this.touchEndX;
            const percentage = (diff / window.innerWidth) * 100;
            
            this.wrapper.style.transform = `translateX(${-percentage * 0.5}px)`;
        });

        this.container.addEventListener('touchend', () => {
            if (this.isAnimating) return;
            
            const diff = this.touchStartX - this.touchEndX;
            const threshold = window.innerWidth * 0.2;
            
            this.wrapper.style.transform = '';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updatePositions();
        setTimeout(() => this.isAnimating = false, 600);
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updatePositions();
        setTimeout(() => this.isAnimating = false, 600);
    }

    goToItem(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;
        this.currentIndex = index;
        this.updatePositions();
        setTimeout(() => this.isAnimating = false, 600);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    const mobileCloseMenu = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuToggle && mobileCloseMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });

        mobileCloseMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    }

    // Typewriter Effect
    const heroTypewriterText = document.querySelector('.typewriter');
    const heroText = "Full Stack Developer";
    let typewriterIndex = 0;

    function typeWriter() {
        if (heroTypewriterText && typewriterIndex < heroText.length) {
            heroTypewriterText.textContent += heroText.charAt(typewriterIndex);
            typewriterIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    if (heroTypewriterText) {
        typeWriter();
    }

    // Intersection Observer for animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Skill Bars Animation
    const animatedSkillBars = document.querySelectorAll('.skill-bar');
    animatedSkillBars.forEach(bar => {
        fadeInObserver.observe(bar);
    });

    // Project Cards Animation
    const animatedProjectCards = document.querySelectorAll('.project-card');
    animatedProjectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Contact Form Handling
    const portfolioContactForm = document.querySelector('#contact-form');
    if (portfolioContactForm) {
        portfolioContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
        });
    }

    // Initialize Circular Navigation for Mobile
    if (window.innerWidth <= 768) {
        const skillsContainer = document.querySelector('.hero-content .skills-grid');
        if (skillsContainer) {
            skillsContainer.className = 'circular-container';
            const skillBlocks = document.querySelectorAll('.skill-block');
            new CircularNavigation(skillsContainer, skillBlocks);
        }
    }
});