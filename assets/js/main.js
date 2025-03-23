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

	// Menu Toggle
	const menuToggle = document.querySelector('.menu-toggle');
	const closeMenu = document.querySelector('#menu .close');

	menuToggle.addEventListener('click', () => {
		$menu._show();
		document.body.style.overflow = 'hidden';
	});

	closeMenu.addEventListener('click', () => {
		$menu._hide();
		document.body.style.overflow = '';
	});

	// Close menu when clicking on a link
	document.querySelectorAll('#menu .links a').forEach(link => {
		link.addEventListener('click', () => {
			$menu._hide();
			document.body.style.overflow = '';
		});
	});

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
	const heroImage = document.querySelector('.hero-image');

	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
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

})(jQuery);