 // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Scroll to Top Button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Newsletter Form Validation
        const newsletterForm = document.getElementById('newsletterForm');
        const emailInput = document.getElementById('emailInput');
        const messageDiv = document.getElementById('newsletterMessage');

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate successful subscription
            showMessage('Thank you for subscribing! Check your inbox soon.', 'success');
            emailInput.value = '';
        });

        function showMessage(message, type) {
            messageDiv.textContent = message;
            messageDiv.className = `newsletter-message ${type}`;
            
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'newsletter-message';
            }, 5000);
        }

        // Add smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; /* Updated for sticky navbar offset */
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Contact Form Submission & Validation
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            const nameInput = document.getElementById('fullName');
            const emailField = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            
            const btnSubmit = document.getElementById('btnSubmit');
            const contactFormCard = document.getElementById('contactFormCard');

            // Real-time input validation to clear errors
            nameInput.addEventListener('input', () => {
                if (nameInput.value.trim() !== '') {
                    nameInput.classList.remove('is-invalid');
                    nameError.style.display = 'none';
                }
            });

            emailField.addEventListener('input', () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailField.value.trim())) {
                    emailField.classList.remove('is-invalid');
                    emailError.style.display = 'none';
                }
            });

            phoneInput.addEventListener('input', () => {
                const phoneDigits = phoneInput.value.replace(/\D/g, '');
                if (phoneDigits.length === 10) {
                    phoneInput.classList.remove('is-invalid');
                    phoneError.style.display = 'none';
                }
            });

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                
                const nameVal = nameInput.value.trim();
                const emailVal = emailField.value.trim();
                const phoneVal = phoneInput.value.trim();
                
                // Name validation
                if (nameVal === '') {
                    nameInput.classList.add('is-invalid');
                    nameError.style.display = 'block';
                    isValid = false;
                } else {
                    nameInput.classList.remove('is-invalid');
                    nameError.style.display = 'none';
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailVal === '' || !emailRegex.test(emailVal)) {
                    emailField.classList.add('is-invalid');
                    emailError.style.display = 'block';
                    isValid = false;
                } else {
                    emailField.classList.remove('is-invalid');
                    emailError.style.display = 'none';
                }
                
                // Phone validation (strip non-digits, must be 10 digits)
                const phoneClean = phoneVal.replace(/\D/g, '');
                if (phoneVal === '' || phoneClean.length !== 10) {
                    phoneInput.classList.add('is-invalid');
                    phoneError.style.display = 'block';
                    isValid = false;
                } else {
                    phoneInput.classList.remove('is-invalid');
                    phoneError.style.display = 'none';
                }
                
                if (!isValid) return;
                
                // Show loading state
                btnSubmit.classList.add('loading');
                nameInput.disabled = true;
                emailField.disabled = true;
                phoneInput.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Replace form card contents with success message
                    contactFormCard.innerHTML = `
                        <div class="success-card-content">
                            <div class="success-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3>Request Received!</h3>
                            <p>Thank you for choosing Profit Planet, <strong>${nameVal}</strong>. Your consultation request has been logged successfully.</p>
                            <p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-muted);">An advisor will contact you at <strong>${emailVal}</strong> or <strong>${phoneVal}</strong> within 24 hours to schedule your free call.</p>
                        </div>
                    `;
                }, 1500);
            });
        }
