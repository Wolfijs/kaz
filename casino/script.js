document.addEventListener("DOMContentLoaded", function() {
    const burgerIcon = document.querySelector('.burger-icon');
    const navBar = document.querySelector('.navigation-bar');
    
    burgerIcon.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
        if (!burgerIcon.contains(event.target) && !navBar.contains(event.target)) {
            navBar.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Show the loading screen
    document.body.classList.add('loading');

    // Hide the loading screen after 1 second for better visibility
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);

    // Ensure EmailJS is loaded
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS
        emailjs.init("kC8z4K0Lf6-jmZuB1");
    } else {
        console.error("EmailJS library is not loaded");
    }

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const from_name = document.getElementById('name').value;
            const sender_email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message_html = document.getElementById('message').value;
            const emailMessage = document.getElementById('emailMessage');
            const nameMessage = document.getElementById('nameMessage');
            const subjectMessage = document.getElementById('subjectMessage');
            const messageMessage = document.getElementById('messageMessage');
            const formMessage = document.getElementById('formMessage');

            let valid = true;

            if (!validateEmail(sender_email)) {
                emailMessage.textContent = 'Please enter a valid email address.';
                emailMessage.style.color = 'red';
                valid = false;
            } else {
                emailMessage.textContent = '';
            }

            if (!from_name.trim()) {
                nameMessage.textContent = 'Name is required.';
                nameMessage.style.color = 'red';
                valid = false;
            } else {
                nameMessage.textContent = '';
            }

            if (!subject.trim()) {
                subjectMessage.textContent = 'Subject is required.';
                subjectMessage.style.color = 'red';
                valid = false;
            } else {
                subjectMessage.textContent = '';
            }

            if (!message_html.trim()) {
                messageMessage.textContent = 'Message is required.';
                messageMessage.style.color = 'red';
                valid = false;
            } else {
                messageMessage.textContent = '';
            }

            if (!valid) {
                return;
            }

            const sanitizedFromName = sanitizeInput(from_name);
            const sanitizedSubject = sanitizeInput(subject);
            const sanitizedMessageHtml = sanitizeInput(message_html);

            emailjs.send('service_djruqlp', 'template_4o5qs2c', {
                to_name: "Recipient",
                from_name: sanitizedFromName,
                sender_email: sender_email,
                subject: sanitizedSubject,
                message_html: sanitizedMessageHtml
            }).then(function (response) {
                formMessage.textContent = 'Email sent successfully!';
                formMessage.classList.add('success');
                clearForm();
                setTimeout(closeEmailPopup, 2000); // Close the popup after 2 seconds
            }, function (error) {
                formMessage.textContent = 'Failed to send email. Please try again later.';
                formMessage.style.color = 'red';
            });
        });
    }

    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('subscribeEmail').value;
            const subscribeMessage = document.getElementById('subscribeMessage');

            if (!validateEmail(email)) {
                subscribeMessage.textContent = 'Please enter a valid email address.';
                subscribeMessage.style.color = 'red';
                return;
            }

            const formData = new FormData();
            formData.append('email', email);

            fetch('http://localhost/casino/php/subscribe.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        subscribeMessage.textContent = 'Subscription successful!';
                        subscribeMessage.style.color = 'green';
                        subscribeMessage.classList.add('success');
                        subscribeForm.reset();
                    } else {
                        subscribeMessage.textContent = 'Subscription failed. Please try again.';
                        subscribeMessage.style.color = 'red';
                    }
                })
                .catch(error => {
                    subscribeMessage.textContent = 'An error occurred. Please try again.';
                    subscribeMessage.style.color = 'red';
                });
        });
    }

    // Event listeners for opening and closing the email popup
    document.querySelectorAll('.contact-popup-button').forEach(button => {
        button.addEventListener('click', openEmailPopup);
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', closeEmailPopup);
    });

    // Event listeners for toggling the dropdown navigation on mobile
    const burgerIcon = document.querySelector('.burger-icon');
    if (burgerIcon) {
        burgerIcon.addEventListener('click', toggleDropdownMenu);
    }

    initialize();
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function initialize() {
    const geoLocationService = new GeoLocationService();
    const locationData = await geoLocationService.fetchLocationData();
    const languageService = new LanguageService(locationData);
    new ContentRenderer(languageService.language);
}

function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

function clearForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('emailMessage').textContent = '';
    document.getElementById('nameMessage').textContent = '';
    document.getElementById('subjectMessage').textContent = '';
    document.getElementById('messageMessage').textContent = '';
}

function toggleDropdownMenu() {
    const navBar = document.querySelector('.navigation-bar');
    navBar.classList.toggle('show');
}

function openEmailPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        document.body.classList.add('no-scroll');
    }
}

function closeEmailPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.classList.remove('show');
        popup.classList.add('hide');
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('hide');
            document.body.classList.remove('no-scroll');
            clearForm(); // Clear the form when the popup is closed
        }, 500);
    }
}
