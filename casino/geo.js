   
   class GeoLocationService {
        constructor() {
            this.apiUrl = 'https://ipapi.co/json/';
        }

        async fetchLocationData() {
            try {
                const response = await fetch(this.apiUrl);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching location data:', error.message);
                return null;
            }
        }
    }

    class LanguageService {
        constructor(locationData) {
            this.countryCode = locationData ? locationData.country_code : null;
            this.language = this.determineLanguage();
        }

        determineLanguage() {
            const languageMap = {
                'CA': 'ca',
                'IE': 'ie',
                'DE': 'de',
                'NO': 'no',
                'NZ': 'nz',
                'CZ': 'cz',
                'AT': 'at',
                'SE': 'se',
                
            };
            return languageMap[this.countryCode] || 'international';
        }
    }

    class ContentRenderer {
        constructor(language) {
            this.language = language;
            this.loadContent();
        }
    
        loadContent() {
            const headerDiv = document.getElementById('header');
            const contentDiv = document.getElementById('content');
            const footerDiv = document.getElementById('footer');
    
            const contentMap = {
                'ca': { /* content specific to CA */ },
                'ie': { /* content specific to IE */ },
                'de': { /* content specific to DE */ },
                'no': { /* content specific to NO */ },
                'nz': { /* content specific to NZ */ },
                'cz': { /* content specific to CZ */ },
                'at': { /* content specific to AT */ },
                'se': { /* content specific to SE */ },
                'international': {
                    header: {
                        logoSrc: "img/logos.png",
                        navItems: [
                            { href: "#", iconClass: "fas fa-dice", text: "Casino" },
                            { href: "#", iconClass: "fas fa-futbol", text: "Betting" },
                            { href: "#", iconClass: "fas fa-tv", text: "Live Casino" },
                            { href: "#", iconClass: "fas fa-file-alt", text: "TOS" },
                            { href: "#", iconClass: "fas fa-user-secret", text: "Privacy Policy" }
                        ],
                        socialLinks: [
                            { href: "https://www.youtube.com", iconSrc: "https://cdn.simpleicons.org/youtube/ffffff", alt: "YouTube" },
                            { href: "https://www.instagram.com", iconSrc: "https://cdn.simpleicons.org/instagram/ffffff", alt: "Instagram" },
                            { href: "https://www.twitter.com", iconSrc: "https://cdn.simpleicons.org/x/ffffff", alt: "X" }
                        ],
                        countryFlags: [
                            { code: "ca", name: "Canada", flagSrc: "https://flagcdn.com/24x18/ca.png" },
                            { code: "ie", name: "Ireland", flagSrc: "https://flagcdn.com/24x18/ie.png" },
                            { code: "de", name: "Germany", flagSrc: "https://flagcdn.com/24x18/de.png" },
                            { code: "no", name: "Norway", flagSrc: "https://flagcdn.com/24x18/no.png" },
                            { code: "nz", name: "New Zealand", flagSrc: "https://flagcdn.com/24x18/nz.png" },
                            { code: "cz", name: "Czech Republic", flagSrc: "https://flagcdn.com/24x18/cz.png" },
                            { code: "at", name: "Austria", flagSrc: "https://flagcdn.com/24x18/at.png" },
                            { code: "se", name: "Sweden", flagSrc: "https://flagcdn.com/24x18/se.png" },
                            { code: "international", name: "International", flagSrc: "https://img.icons8.com/ios-filled/50/ffffff/globe--v1.png" }
                        ]
                    },
                    missionTitle: "Our mission",
                    missionShort: "Traditional physical casinos are still available...",
                    missionFull: "Traditional physical casinos are still available (though in limited quantities each year), but they are not as popular as online versions...",
                    promotions: [
                        {
                            imgSrc: "img/LAIMZ.JPG",
                            altText: "777 Spins Promotion",
                            title: "777 Winspins and cashback up to 1000€",
                            rating: 9,
                            buttonLabel: "Claim Bonus",
                            features: [
                                { icon: "💰", text: "Min. deposit", value: "20€" },
                                { icon: "⏳", text: "Payout duration", value: "28 minutes" },
                                { icon: "🎫", text: "License", value: "Latvia" },
                            ],
                            paymentMethods: ["img/mastercard.svg", "img/visa.svg", "img/revolut.svg", "img/skrill.svg", "img/paysera.svg"]
                        },
                    ],
                    footer: {
                        aboutUs: "We are a dedicated team of experts providing the latest information and promotions on the best online casinos available in Latvia and beyond. Our mission is to help players make informed decisions and have the best gambling experience possible.",
                        subscribe: "Get the latest updates and promotions directly to your inbox. Subscribe to our newsletter:",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {
                        title: "Contact Us",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    }
                }
            };
    
            const content = contentMap[this.language] || contentMap['international'];
            this.renderHeader(headerDiv, content.header);
            this.renderContent(contentDiv, content);
            this.renderFooter(footerDiv, content.footer);
            this.renderEmailPopup(content.emailPopup);
    
            this.initializeSliders();
            this.initializeReadMore();
            this.initializeSubscriptionForm();
            this.initializeContactForm(content.emailPopup);
        }
    
        renderHeader(headerDiv, headerContent) {
            const navItemsHtml = headerContent.navItems.map(item => `
                <li class="nav-item">
                    <a class="nav-link" href="${item.href}">
                        <i class="${item.iconClass}"></i> ${item.text}
                    </a>
                </li>
            `).join('');
    
            const socialLinksHtml = headerContent.socialLinks.map(link => `
                <a href="${link.href}" target="_blank">
                    <img src="${link.iconSrc}" alt="${link.alt}">
                </a>
            `).join('');
    
            const countryFlagsHtml = headerContent.countryFlags.map(flag => `
                <li>
                    <a href="?lang=${flag.code}" class="dropdown-item">
                        <img src="${flag.flagSrc}" alt="${flag.name}" class="flag-icon"> ${flag.name}
                    </a>
                </li>
            `).join('');
    
            headerDiv.innerHTML = `
                <span class="burger-icon">&#9776;</span>
                <div class="header-logo">
                    <img class="logos" src="${headerContent.logoSrc}" alt="Logo">
                </div>
                <nav class="navigation-bar">
                    <ul class="nav-list">
                        ${navItemsHtml}
                    </ul>
                    <div class="dropdown">
                        <button class="dropbtn">
                            <img src="${headerContent.countryFlags.find(flag => flag.code === this.language)?.flagSrc || headerContent.countryFlags[0].flagSrc}" class="flag-icon" alt="Language Selector">
                            Language
                        </button>
                        <ul class="dropdown-content">
                            ${countryFlagsHtml}
                        </ul>
                    </div>
                </nav>
                <div class="social-icons">
                    ${socialLinksHtml}
                </div>
            `;
        }
    
        renderContent(contentDiv, content) {
            const promotionsHtml = content.promotions.map(promo => `
                <div class="promotion">
                    <div class="promotion-left">
                        <img src="${promo.imgSrc}" alt="${promo.altText}">
                    </div>
                    <div class="promotion-content">
                        <h3>${promo.title}</h3>
                        <ul class="promo-details">
                            ${promo.features.map(feature => `
                                <li>${feature.text} <strong>${feature.value}</strong></li>
                            `).join('')}
                        </ul>
                        <div class="promotion-rating">
                            <div class="stars">
                                ${this.renderStars(promo.rating)}
                            </div>
                            <span class="rating-value">${promo.rating}/10</span>
                        </div>
                        <div class="promotion-features">
                            ${promo.features.map(feature => `
                                <div class="feature-box">
                                    <div class="feature-icon">${feature.icon}</div>
                                    <div class="feature-text">
                                        <span>${feature.text}</span>
                                        <strong>${feature.value}</strong>
                                    </div>
                                </div>
                            `).join('')}
                            <div class="feature-box payment-box">
                                <div class="feature-text">
                                    <span>Maksājumu veidi</span>
                                    <div class="promotion-payments">
                                        <span class="arrow left-arrow">&#9664;</span>
                                        <div class="payment-slider-container">
                                            <div class="payment-slider">
                                                ${promo.paymentMethods.map(method => `<img src="${method}" alt="Payment Method">`).join('')}
                                            </div>
                                        </div>
                                        <span class="arrow right-arrow">&#9654;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-top-corner">
                            <div class="bonus-box">
                                <strong>400 bezriska griezieni</strong>
                            </div>
                            <a href="#" class="btn">${promo.buttonLabel}</a>
                        </div>
                    </div>
                </div>
            `).join('');
    
            contentDiv.innerHTML = `
                <div class="highlighted-text">
                    <div class="text-content">
                        <h1>${content.missionTitle}</h1>
                        <p class="highlight-text-short">${content.missionShort}</p>
                        <p class="highlight-text-full hidden">${content.missionFull}</p>
                        <button class="read-more toggle-text">Read More</button>
                    </div>
                    <div class="text-block">
                        <img src="img/LAIMZ.JPG" alt="777 Spins Promotion">
                        <h3>777 Winspins and cashback up to 1000€</h3>
                        <div class="promotion-rating">
                            <div class="stars">
                                ${this.renderStars(9)}
                            </div>
                            <span class="rating-values">9/10</span>
                        </div>
                        <a href="#" class="btn">Claim Bonus</a>
                    </div>
                </div>
                ${promotionsHtml}
            `;
        }
    
        renderFooter(footerDiv, footerContent) {
            const footerLinksHtml = footerContent.footerLinks.map(link => `
                <li><a href="${link.href}">${link.text}</a></li>
            `).join('');
    
            footerDiv.innerHTML = `
                <div class="footer-content">
                    <div class="footer-section about">
                        <h2>About Us</h2>
                        <p>${footerContent.aboutUs}</p>
                    </div>
                    <div class="footer-section subscribe">
                        <h2>Subscribe</h2>
                        <p>${footerContent.subscribe}</p>
                        <form id="subscribeForm" method="post" class="subscribe-form">
                            <input type="email" name="email" id="subscribeEmail" class="emailin" placeholder="Enter your email address" required>
                            <button type="submit" class="subin">Subscribe</button>
                            <p id="subscribeMessage" class="form-message"></p>
                        </form>
                    </div>
                    <div class="footer-section links">
                        <h2>Links</h2>
                        <ul>${footerLinksHtml}</ul>
                        <button type="submit" class="contact-popup-button subin" onclick="openEmailPopup()">Talk with us</button>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© 2024 Labākie Latvijas Online Kazino. All Rights Reserved.</p>
                </div>
            `;
        }
    
        renderEmailPopup(emailPopupContent) {
            const popupContainer = document.getElementById('email');
            if (popupContainer) {
                popupContainer.className = 'email-popup popup';
                popupContainer.innerHTML = `
                    <div class="popup-content">
                        <span class="close">&times;</span>
                        <h2>${emailPopupContent.title}</h2>
                        <form class="contact-form" id="contactForm">
                            <label for="email">${emailPopupContent.fields.email}</label>
                            <input type="email" id="email" name="email" required>
                            <p id="emailMessage" class="form-message"></p>
    
                            <label for="name">${emailPopupContent.fields.name}</label>
                            <input id="name" name="name" required></input>
                            <p id="nameMessage" class="form-message"></p>
    
                            <label for="subject">${emailPopupContent.fields.subject}</label>
                            <textarea id="subject" name="subject" required></textarea>
                            <p id="subjectMessage" class="form-message"></p>
    
                            <label for="message">${emailPopupContent.fields.message}</label>
                            <textarea id="message" name="message" required></textarea>
                            <p id="messageMessage" class="form-message"></p>
    
                            <button type="submit">${emailPopupContent.submitButton}</button>
                            <p id="formMessage" class="form-message"></p>
                        </form>
                    </div>
                `;
    
                document.body.appendChild(popupContainer);
    
                popupContainer.querySelector('.close').addEventListener('click', closeEmailPopup);
            } else {
                console.error("Email popup container not found in the DOM.");
            }
        }
    
        renderStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            const emptyStars = 10 - fullStars - (halfStar ? 1 : 0);
    
            return `
                ${'<span class="star filled">&#9733;</span>'.repeat(fullStars)}
                ${halfStar ? '<span class="star filled">&#9734;</span>' : ''}
                ${'<span class="star empty">&#9734;</span>'.repeat(emptyStars)}
            `;
        }
    
        initializeSliders() {
            const promotionContainers = document.querySelectorAll('.promotion');
    
            promotionContainers.forEach(container => {
                const paymentContainer = container.querySelector('.promotion-payments');
                const paymentSlider = paymentContainer.querySelector('.payment-slider');
                const payments = Array.from(paymentSlider.querySelectorAll('img'));
                const leftArrow = paymentContainer.querySelector('.left-arrow');
                const rightArrow = paymentContainer.querySelector('.right-arrow');
                let currentIndex = 0;
                const maxVisible = 3;
    
                const updateVisiblePayments = () => {
                    const offset = -currentIndex * (payments[0].offsetWidth + 10);
                    paymentSlider.style.transform = `translateX(${offset}px)`;
                };
    
                leftArrow.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex -= 1;
                        updateVisiblePayments();
                    }
                });
    
                rightArrow.addEventListener('click', () => {
                    if (currentIndex + maxVisible < payments.length) {
                        currentIndex += 1;
                        updateVisiblePayments();
                    }
                });
    
                updateVisiblePayments();
            });
        }
    
        initializeReadMore() {
            document.querySelectorAll('.toggle-text').forEach(button => {
                button.addEventListener('click', toggleText);
            });
        }
    
        initializeSubscriptionForm() {
            document.getElementById('subscribeForm').addEventListener('submit', function (event) {
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
                            document.getElementById('subscribeForm').reset();
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
    
        initializeContactForm(emailPopupContent) {
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
                        formMessage.textContent = emailPopupContent.successMessage;
                        formMessage.classList.add('success');
                        clearForm();
                        setTimeout(closeEmailPopup, 2000);
                    }, function (error) {
                        formMessage.textContent = emailPopupContent.failureMessage;
                        formMessage.style.color = 'red';
                    });
                });
            }
        }
    }
    

    class LiveCasinoRenderer extends ContentRenderer {
        constructor(language) {
            super(language);
            this.language = language;
            this.loadContent();
           
        }

    
        loadContent() {
            const liveContentDiv = document.getElementById('liveContent');
            const footerDiv = document.getElementById('footer');
            const sidebarDiv = document.getElementById('sidebar');
    
            const contentMap = {
                'ca': { /* content specific to CA */ },
                'ie': { /* content specific to IE */ },
                'de': { /* content specific to DE */ },
                'no': { /* content specific to NO */ },
                'nz': { /* content specific to NZ */ },
                'cz': { /* content specific to CZ */ },
                'at': { /* content specific to AT */ },
                'se': { /* content specific to SE */ },
                
                'international': {
                    missionTitleLive: "Live Casino Experience",
                    missionShortLive: "Traditional physical casinos are still available...",
                    missionFullLive: "Traditional physical casinos are still available (though in limited quantities each year), but they are not as popular as online versions...",
                    promotionsLive: [
                        {
                            imgSrcLive: "img/LAIMZ.JPG",
                            altTextLive: "777 Spins Promotion",
                            titleLive: "Live Casino Bonus",
                            ratingLive: 10,
                            buttonLabelLive: "Claim Bonus",
                            featuresLive: [
                                { icon: "💰", text: "Min. deposit", value: "20€" },
                                { icon: "⏳", text: "Payout duration", value: "28 minutes" },
                                { icon: "🎫", text: "License", value: "Latvia" },
                            ],
                            paymentMethodsLive: ["img/mastercard.svg", "img/visa.svg", "img/revolut.svg", "img/skrill.svg", "img/paysera.svg"]
                        },
                        {
                            imgSrcLive: "img/LAIMZ.JPG",
                            altTextLive: "777 Spins Promotion",
                            titleLive: "777 Winspins and cashback up to 1000€",
                            ratingLive: 9,
                            buttonLabelLive: "Claim Bonus",
                            featuresLive: [
                                { icon: "💰", text: "Min. deposit", value: "20€" },
                                { icon: "⏳", text: "Payout duration", value: "28 minutes" },
                                { icon: "🎫", text: "License", value: "Latvia" },
                            ],
                            paymentMethodsLive: ["img/mastercard.svg", "img/visa.svg", "img/revolut.svg", "img/skrill.svg", "img/paysera.svg"]
                        },
                    ],
                    footer: { 
                        aboutUs: "We are a dedicated team of experts providing the latest information and promotions on the best online casinos available in Latvia and beyond. Our mission is to help players make informed decisions and have the best gambling experience possible....",
                        subscribe: "Get the latest updates and promotions directly to your inbox. Subscribe to our newsletter:...",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {  
                        title: "Contact Us",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                }
            };
    
            const content = contentMap[this.language] || contentMap['international'];
            this.renderContent(liveContentDiv, content);
            this.renderFooter(footerDiv, content.footer);
            this.renderSidebar(sidebarDiv, content.sidebar);
            this.renderEmailPopup(content.emailPopup);
        
            this.initializeSliders();
            this.initializeReadMore();
            this.initializeSubscriptionForm();
            this.initializeContactForm(content.emailPopup);
        }
    
        renderContent(liveContentDiv, content) {
            const promotionsLiveHtml = content.promotionsLive.map(promo => `
                <div class="promotion">
                    <div class="promotion-left">
                        <img src="${promo.imgSrcLive}" alt="${promo.altTextLive}">
                    </div>
                    <div class="promotion-content">
                        <h3>${promo.titleLive}</h3>
                        <ul class="promo-details">
                            ${promo.featuresLive.map(feature => `
                                <li>${feature.text} <strong>${feature.value}</strong></li>
                            `).join('')}
                        </ul>
                        <div class="promotion-rating">
                            <div class="stars">
                                ${this.renderStars(promo.ratingLive)}
                            </div>
                            <span class="rating-value">${promo.ratingLive}/10</span>
                        </div>
                        <div class="promotion-features">
                            ${promo.featuresLive.map(feature => `
                                <div class="feature-box">
                                    <div class="feature-icon">${feature.icon}</div>
                                    <div class="feature-text">
                                        <span>${feature.text}</span>
                                        <strong>${feature.value}</strong>
                                    </div>
                                </div>
                            `).join('')}
                            <div class="feature-box payment-box">
                                <div class="feature-text">
                                    <span>Maksājumu veidi</span>
                                    <div class="promotion-payments">
                                        <span class="arrow left-arrow">&#9664;</span>
                                        <div class="payment-slider-container">
                                            <div class="payment-slider">
                                                ${promo.paymentMethodsLive.map(method => `<img src="${method}" alt="Payment Method">`).join('')}
                                            </div>
                                        </div>
                                        <span class="arrow right-arrow">&#9654;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-top-corner">
                            <div class="bonus-box">
                                <strong>400 bezriska griezieni</strong>
                            </div>
                            <a href="#" class="btn">${promo.buttonLabelLive}</a>
                        </div>
                    </div>
                </div>
            `).join('');
    
            liveContentDiv.innerHTML = `
                <div class="highlighted-text">
                <div class="text-content">
                    <h1>${content.missionTitleLive}</h1>
                    <p class="highlight-text-short">${content.missionShortLive}</p>
                    <p class="highlight-text-full hidden">${content.missionFullLive}</p>
                    <button class="read-more toggle-text">Read More</button>
                </div>
                <div class="text-block">
                    <img src="img/LAIMZ.JPG" alt="777 Spins Promotion">
                    <h3>777 Winspins and cashback up to 1000€</h3>
                    <div class="promotion-rating">
                        <div class="stars">
                            ${this.renderStars(9)}
                        </div>
                        <span class="rating-values" >9/10</span>
                    </div>
                    <a href="#" class="btn">Claim Bonus</a>
                </div>
            </div>
            ${promotionsLiveHtml}
            `;
        }
    }
    
    

    class BettingRenderer extends ContentRenderer {
        constructor(language) {
            super(language);
            this.language = language;
            this.loadContent();
           
        }
    
        loadContent() {
            const betContentDiv = document.getElementById('betContent');
            const footerDiv = document.getElementById('footer');
            const sidebarDiv = document.getElementById('sidebar');
    
            const contentMap = {
                'ca': { /* content specific to CA */ },
                'ie': { /* content specific to IE */ },
                'de': { /* content specific to DE */ },
                'no': { /* content specific to NO */ },
                'nz': { /* content specific to NZ */ },
                'cz': { /* content specific to CZ */ },
                'at': { /* content specific to AT */ },
                'se': { /* content specific to se */ },
                'international': {
                    missionTitleBet: "Betting Experience",
                    missionShortBet: "Traditional physical casinos are still available...",
                    missionFullBet: "Traditional physical casinos are still available (though in limited quantities each year), but they are not as popular as online versions...",
                    promotionsBet: [
                        {
                            imgSrcBet: "img/LAIMZ.JPG",
                            altTextBet: "777 Spins Promotion",
                            titleBet: "Betting Bonus",
                            ratingBet: 10,
                            buttonLabelBet: "Claim Bonus",
                            featuresBet: [
                                { icon: "💰", text: "Min. deposit", value: "20€" },
                                { icon: "⏳", text: "Payout duration", value: "28 minutes" },
                                { icon: "🎫", text: "License", value: "Latvia" },
                            ],
                            paymentMethodsBet: ["img/mastercard.svg", "img/visa.svg", "img/revolut.svg", "img/skrill.svg", "img/paysera.svg"]
                        },
                        {
                            imgSrcBet: "img/LAIMZ.JPG",
                            altTextBet: "777 Spins Promotion",
                            titleBet: "777 Winspins and cashback up to 1000€",
                            ratingBet: 9,
                            buttonLabelBet: "Claim Bonus",
                            featuresBet: [
                                { icon: "💰", text: "Min. deposit", value: "20€" },
                                { icon: "⏳", text: "Payout duration", value: "28 minutes" },
                                { icon: "🎫", text: "License", value: "Latvia" },
                            ],
                            paymentMethodsBet: ["img/mastercard.svg", "img/visa.svg", "img/revolut.svg", "img/skrill.svg", "img/paysera.svg"]
                        },
                    ],
                    footer: { 
                        aboutUs: "Betting platform dedicated team of experts...",
                        subscribe: "Get the latest betting updates and promotions...",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {  
                        title: "Contact Us",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                }
            };

    
            const content = contentMap[this.language] || contentMap['international'];
            this.renderContent(betContentDiv, content);
            this.renderFooter(footerDiv, content.footer);
            this.renderSidebar(sidebarDiv, content.sidebar);
            this.renderEmailPopup(content.emailPopup);
    
            this.initializeSliders();
            this.initializeReadMore();
            this.initializeSubscriptionForm();
            this.initializeContactForm(content.emailPopup);
        }
    
        renderContent(betContentDiv, content) {
            const promotionsBetHtml = content.promotionsBet.map(promo => `
                <div class="promotion">
                    <div class="promotion-left">
                        <img src="${promo.imgSrcBet}" alt="${promo.altTextBet}">
                    </div>
                    <div class="promotion-content">
                        <h3>${promo.titleBet}</h3>
                        <ul class="promo-details">
                            ${promo.featuresBet.map(feature => `
                                <li>${feature.text} <strong>${feature.value}</strong></li>
                            `).join('')}
                        </ul>
                        <div class="promotion-rating">
                            <div class="stars">
                                ${this.renderStars(promo.ratingBet)}
                            </div>
                            <span class="rating-value">${promo.ratingBet}/10</span>
                        </div>
                        <div class="promotion-features">
                            ${promo.featuresBet.map(feature => `
                                <div class="feature-box">
                                    <div class="feature-icon">${feature.icon}</div>
                                    <div class="feature-text">
                                        <span>${feature.text}</span>
                                        <strong>${feature.value}</strong>
                                    </div>
                                </div>
                            `).join('')}
                            <div class="feature-box payment-box">
                                <div class="feature-text">
                                    <span>Maksājumu veidi</span>
                                    <div class="promotion-payments">
                                        <span class="arrow left-arrow">&#9664;</span>
                                        <div class="payment-slider-container">
                                            <div class="payment-slider">
                                                ${promo.paymentMethodsBet.map(method => `<img src="${method}" alt="Payment Method">`).join('')}
                                            </div>
                                        </div>
                                        <span class="arrow right-arrow">&#9654;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right-top-corner">
                            <div class="bonus-box">
                                <strong>400 bezriska griezieni</strong>
                            </div>
                            <a href="#" class="btn">${promo.buttonLabelBet}</a>
                        </div>
                    </div>
                </div>
            `).join('');
    
            betContentDiv.innerHTML = `
                <div class="highlighted-text">
                    <div class="text-content">
                        <h1>${content.missionTitleBet}</h1>
                        <p class="highlight-text-short">${content.missionShortBet}</p>
                        <p class="highlight-text-full hidden">${content.missionFullBet}</p>
                        <button class="read-more toggle-text">Read More</button>
                    </div>
                    <div class="text-block">
                        <img src="img/LAIMZ.JPG" alt="777 Spins Promotion">
                        <h3>777 Winspins and cashback up to 1000€</h3>
                        <div class="promotion-rating">
                            <div class="stars">
                                ${this.renderStars(9)}
                            </div>
                            <span class="rating-values">9/10</span>
                        </div>
                        <a href="#" class="btn">Claim Bonus</a>
                    </div>
                </div>
                ${promotionsBetHtml}
            `;
        }
        
    }
    class TOSRenderer extends ContentRenderer {

        constructor(language) {
            super(language);
            this.language = language;
            this.loadContent();
        }
    
        loadContent() {
            const tosContentDiv = document.getElementById('tos'); // Corrected ID
            const footerDiv = document.getElementById('footer');
            const sidebarDiv = document.getElementById('sidebar');
    
            const contentMap = {
                'ca': {
                    tosTitle: "Terms of Service - Canada",
                    sections: [
                        { title: "1. Introduction", text: "Welcome to Casino Gambling G Canada. By accessing our website, you agree to these terms and conditions." },
                        { title: "2. Use of Site", text: "Our site is provided for your personal use subject to these terms and conditions." },
                        { title: "3. Intellectual Property", text: "All content included on this site is the property of Casino Gambling G Canada or its content suppliers." },
                        { title: "4. Privacy", text: "We are committed to protecting your privacy. Please review our Privacy Policy for more information." },
                        { title: "5. Changes to Terms", text: "We reserve the right to make changes to these terms at any time." },
                        { title: "6. Contact Us", text: "If you have any questions about these terms, please contact us at info@casinogamblingg.ca." },
                    ],
                    footer: {
                        aboutUs: "About Us content for Canada.",
                        subscribe: "Subscribe content for Canada.",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {
                        title: "Contact Us - Canada",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                },
                'international': {
                    tosTitle: "Terms of Service",
                    sections: [
                        { title: "1. Introduction", text: "Welcome to Casino Gambling G. By accessing our website, you agree to these terms and conditions." },
                        { title: "2. Use of Site", text: "Our site is provided for your personal use subject to these terms and conditions." },
                        { title: "3. Intellectual Property", text: "All content included on this site is the property of Casino Gambling G or its content suppliers." },
                        { title: "4. Privacy", text: "We are committed to protecting your privacy. Please review our Privacy Policy for more information." },
                        { title: "5. Changes to Terms", text: "We reserve the right to make changes to these terms at any time." },
                        { title: "6. Contact Us", text: "If you have any questions about these terms, please contact us at info@casinogamblingg.com." },
                    ],
                    footer: {
                        aboutUs: "We are a dedicated team of experts providing the latest information and promotions on the best online casinos available in Latvia and beyond. Our mission is to help players make informed decisions and have the best gambling experience possible.",
                        subscribe: "Get the latest updates and promotions directly to your inbox. Subscribe to our newsletter:",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {
                        title: "Contact Us",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                }
            };
    
            const content = contentMap[this.language] || contentMap['international'];
            this.renderTOS(tosContentDiv, content);
            this.renderFooter(footerDiv, content.footer);
            this.renderSidebar(sidebarDiv, content.sidebar);
            this.renderEmailPopup(content.emailPopup);
    
            this.initializeSliders();
            this.initializeReadMore();
            this.initializeSubscriptionForm();
            this.initializeContactForm(content.emailPopup);
        }
    
        renderTOS(tosContentDiv, content) {
            if (tosContentDiv) {
                const tosHtml = content.sections.map(section => `
                    <div class="tos-box">
                        <h3 class="tos-section-title">${section.title}</h3>
                        <p class="tos-text">${section.text}</p>
                    </div>
                `).join('');
            
                tosContentDiv.innerHTML = `
                    <div class="tos-container">
                        <h2 class="tos-title">${content.tosTitle}</h2>
                        ${tosHtml}
                    </div>
                `;
            } 
        }
    }
    
    class PrivacyPolicyRenderer extends ContentRenderer {

        constructor(language) {
            super(language);
            this.language = language;
            this.loadContent();
        }
    
        loadContent() {
            const privacyContentDiv = document.getElementById('privacy');
            const footerDiv = document.getElementById('footer');
            const sidebarDiv = document.getElementById('sidebar');
    
            const contentMap = {
                'ca': {
                    privacyTitle: "Privacy Policy - Canada",
                    sections: [
                        { title: "1. Introduction", text: "We value your privacy and are committed to protecting your personal information. This policy outlines how we handle your data." },
                        { title: "2. Data Collection", text: "We collect personal information that you provide to us directly, such as your name, email address, and any other details necessary for providing our services." },
                        { title: "3. Data Use", text: "Your data is used to enhance your experience on our website, including personalizing content and providing tailored promotions." },
                        { title: "4. Data Sharing", text: "We do not share your personal data with third parties without your consent, except as necessary to provide our services or as required by law." },
                        { title: "5. Data Security", text: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction." },
                        { title: "6. Changes to Policy", text: "We reserve the right to update this Privacy Policy at any time. We will notify you of significant changes by posting the new policy on our site." },
                        { title: "7. Contact Us", text: "If you have any questions or concerns about our privacy practices, please contact us at privacy@casinogamblingg.ca." },
                    ],
                    footer: {
                        aboutUs: "About Us content for Canada.",
                        subscribe: "Subscribe content for Canada.",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {
                        title: "Contact Us - Canada",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                },
                'international': {
                    privacyTitle: "Privacy Policy",
                    sections: [
                        { title: "1. Introduction", text: "We value your privacy and are committed to protecting your personal information. This policy outlines how we handle your data." },
                        { title: "2. Data Collection", text: "We collect personal information that you provide to us directly, such as your name, email address, and any other details necessary for providing our services." },
                        { title: "3. Data Use", text: "Your data is used to enhance your experience on our website, including personalizing content and providing tailored promotions." },
                        { title: "4. Data Sharing", text: "We do not share your personal data with third parties without your consent, except as necessary to provide our services or as required by law." },
                        { title: "5. Data Security", text: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction." },
                        { title: "6. Changes to Policy", text: "We reserve the right to update this Privacy Policy at any time. We will notify you of significant changes by posting the new policy on our site." },
                        { title: "7. Contact Us", text: "If you have any questions or concerns about our privacy practices, please contact us at privacy@casinogamblingg.com." },
                    ],
                    footer: {
                        aboutUs: "We are a dedicated team of experts providing the latest information and promotions on the best online casinos available in Latvia and beyond. Our mission is to help players make informed decisions and have the best gambling experience possible.",
                        subscribe: "Get the latest updates and promotions directly to your inbox. Subscribe to our newsletter:",
                        footerLinks: [
                            { text: "YouTube", href: "https://www.youtube.com/channel/UCjq4CUr2qYYsGxmw5gbq4RA" },
                            { text: "Instagram", href: "#" },
                            { text: "X/Twitter", href: "https://x.com/crazygamblingg" },
                        ]
                    },
                    emailPopup: {
                        title: "Contact Us",
                        fields: {
                            email: "Your Email:",
                            name: "Name:",
                            subject: "Subject:",
                            message: "Message:",
                        },
                        submitButton: "Send",
                        successMessage: "Email sent successfully!",
                        failureMessage: "Failed to send email. Please try again later."
                    },
                    sidebar: {
                        links: [
                            { href: "index.html", imgSrc: "img/casino.svg", altText: "Casino", text: "Casino" },
                            { href: "livecasino.html", imgSrc: "img/livecasino.svg", altText: "Live Casino", text: "Live Casino" },
                            { href: "betting.html", imgSrc: "img/betting.svg", altText: "Betting", text: "Betting" },
                        ],
                        bottomLinks: [
                            { href: "privacy.html", text: "Privacy Policy" },
                            { href: "tos.html", text: "TOS" },
                        ]
                    }
                }
            };
    
            const content = contentMap[this.language] || contentMap['international'];
            this.renderPrivacyPolicy(privacyContentDiv, content);
            this.renderFooter(footerDiv, content.footer);
            this.renderSidebar(sidebarDiv, content.sidebar);
            this.renderEmailPopup(content.emailPopup);
    
            this.initializeSliders();
            this.initializeReadMore();
            this.initializeSubscriptionForm();
            this.initializeContactForm(content.emailPopup);
        }
    
        renderPrivacyPolicy(privacyContentDiv, content) {
            if (privacyContentDiv) {
                const privacyHtml = content.sections.map(section => `
                    <div class="privacy-box">
                        <h3 class="privacy-section-title">${section.title}</h3>
                        <p class="privacy-text">${section.text}</p>
                    </div>
                `).join('');
    
                privacyContentDiv.innerHTML = `
                    <div class="privacy-container">
                        <h2 class="privacy-title">${content.privacyTitle}</h2>
                        ${privacyHtml}
                    </div>
                `;
            } 
        }
    }
    
    
    

document.addEventListener('DOMContentLoaded', initialize);




            



            


        function toggleText(event) {
            const button = event.target;
            const shortText = button.parentElement.querySelector('.highlight-text-short');
            const fullText = button.parentElement.querySelector('.highlight-text-full');

            if (fullText.classList.contains('hidden')) {
                fullText.classList.remove('hidden');
                shortText.classList.add('hidden');
                button.textContent = "Read Less";
            } else {
                fullText.classList.add('hidden');
                shortText.classList.remove('hidden');
                button.textContent = "Read More";
            }
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        async function initialize() {
            const geoService = new GeoLocationService();
            const locationData = await geoService.fetchLocationData();
            const languageService = new LanguageService(locationData);
            const language = languageService.language;
        
            // Ensure correct renderer is called based on the page
            if (document.body.classList.contains('main-content')) {
                new ContentRenderer(language);
            } else if (document.body.classList.contains('live-content')) {
                new LiveCasinoRenderer(language);
            } else if (document.body.classList.contains('bet-content')) {
                new BettingRenderer(language);
            } else if (document.body.classList.contains('privacy-content')) {
                new PrivacyPolicyRenderer(language);
            } else if (document.body.classList.contains('tos-content')) {
                new TOSRenderer(language); // Correct renderer for TOS content
            } else {
                console.error('Page type not recognized. Please check the body class.');
            }
        }
        
        
        
        document.addEventListener('DOMContentLoaded', initialize);
        
        
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('loading');
        
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.getElementById('loading-screen').classList.add('hidden');
            }, 1000);
        
            if (typeof emailjs !== 'undefined') {
                emailjs.init("kC8z4K0Lf6-jmZuB1");
            } else {
                console.error("EmailJS library is not loaded");
            }
        
            initialize();
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

            // Subscription form handling
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
                                document.getElementById('subscribeForm').reset();
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

            // Event listeners for toggling the sidebar
            const burgerIcon = document.querySelector('.burger-icon');
            if (burgerIcon) {
                burgerIcon.addEventListener('click', toggleSidebar);
            }

            const closebtn = document.querySelector('.closebtn');
            if (closebtn) {
                closebtn.addEventListener('click', toggleSidebar);
            }

            // Initialize the main content after all event listeners are set
            initialize();
        });

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

        function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            const burgerIcon = document.querySelector(".burger-icon");

            if (sidebar.style.width === "250px") {
                sidebar.style.width = "0";
                burgerIcon.textContent = "☰";
                burgerIcon.style.display = "block";
            } else {
                sidebar.style.width = "250px";
                burgerIcon.style.display = "none";
            }
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
                }, 100);
            }
        }
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://ipapi.co/json/';
        const fullUrl = proxyUrl + apiUrl;
        
        async function fetchLocationData() {
            try {
                const response = await fetch(fullUrl);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching location data:', error.message);
                return null;
            }
        }