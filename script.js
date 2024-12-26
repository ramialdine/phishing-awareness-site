console.log("Welcome to Phishing Awareness!");

document.addEventListener("DOMContentLoaded", () => {
    // Fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

   // Quiz functionality (only execute if on quiz page)
if (document.getElementById("quiz-section")) {
    const examples = [
        { text: "Your account has been compromised. Please click here to reset your password.", isPhishing: true },
        { text: "Your package has been shipped. Track it here: www.trustedshop.com.", isPhishing: false },
        { text: "We've noticed suspicious activity on your account. Please verify your details immediately.", isPhishing: true },
        { text: "Welcome to our newsletter! Click here to confirm your subscription: www.newsletter.com.", isPhishing: false },
        { text: "Congratulations! You've won a free iPhone. Click here to claim your prize: www.free-iphone-giveaway.com", isPhishing: true },
        { text: "Your credit card payment is due. Log in to your account at www.yourbank.com to make a payment.", isPhishing: false },
        { text: "URGENT: Your tax refund is ready. Provide your bank details here: www.irs-refund.net", isPhishing: true },
        { text: "Your order #1234 has been processed. View your receipt at www.amazon.com/orders", isPhishing: false },
        { text: "Security Alert: Unusual login attempt detected. Verify your identity now: www.google-security.net", isPhishing: true },
        { text: "Your flight reservation is confirmed. Check in online at www.delta.com", isPhishing: false },
        { text: "Your Netflix subscription has expired. Update your payment info here: www.netflix-renewal.com", isPhishing: true },
        { text: "Thank you for your purchase. Leave a review for a 10% discount on your next order at www.etsy.com", isPhishing: false },
        { text: "Your social security number has been suspended due to suspicious activity. Call this number immediately: 1-800-555-1234", isPhishing: true },
        { text: "Your password will expire in 3 days. Change it now at portal.yourcompany.com", isPhishing: false },
        { text: "You have (1) new voicemail. Listen now: www.voicemail-service.net", isPhishing: true }
    ];

        let score = 0;
        const totalQuestions = examples.length;
        let currentExampleIndex = 0;
        let timeLeft = 10;
        let timer;

        const phishingButton = document.getElementById("phishing-btn");
        const legitimateButton = document.getElementById("legitimate-btn");
        const nextButton = document.getElementById("next-btn");
        const startButton = document.getElementById("start-btn");
        const feedback = document.getElementById("feedback");
        const emailExampleElement = document.getElementById("email-example");
        const timerElement = document.getElementById("timer");

   const explanations = [
    "Phishing emails often create a sense of urgency, such as claiming your account has been compromised. Always verify the source before clicking links. If you receive such an email, it's best to directly visit the company's official website or contact their customer support through a trusted channel.",
    "Legitimate emails from stores or shipping companies will often include tracking information that matches your actual order. Look for familiar domains. However, if you haven't made a recent purchase, be cautious of unexpected shipping notifications as they could be phishing attempts.",
    "Phishing emails will ask for immediate action, like resetting your password, often with a suspicious link. Instead of clicking the link, go directly to the official website and check your account status there. Legitimate companies rarely ask you to reset your password via email unless you've requested it.",
    "Legitimate newsletters usually include clear unsubscribe links and come from recognized sources. Before confirming any subscription, ensure you've actually signed up for it. Be wary of unexpected newsletter confirmations, as they could be attempts to verify active email addresses.",
    "While this offer seems tempting, it's likely a scam. Legitimate companies rarely give away expensive items for free. Always be skeptical of 'too good to be true' offers, especially when they require you to click on links or provide personal information.",
    "For online banking, it's generally safer to use the bank's official mobile app or website. If you're making a payment, ensure you've signed up for email or push notifications to track your transactions. Avoid conducting sensitive financial operations on public Wi-Fi networks, as they can be insecure.",
    "Google and other reputable companies will never ask you to verify your identity through a link in an email. If you receive such a request, log in to your account directly through the official website or app to check for any security notifications. Always be cautious of emails claiming security issues.",
    "Legitimate flight confirmations will come from the airline's official email address and typically include your booking reference. If you haven't booked a flight recently, this could be a phishing attempt. Always verify unexpected travel confirmations directly with the airline through their official website or customer service line.",
    "Netflix and other subscription services will typically direct you to their official website to update payment information. Be wary of any emails asking you to click on links to update your payment details. Instead, log in to your account directly through the official website or app to manage your subscription.",
    "While legitimate businesses often request reviews, be cautious of emails offering discounts for reviews, especially if they ask you to click on unfamiliar links. If you've recently made a purchase and receive such an offer, verify it by logging into your account on the official website before proceeding."
    "This is a classic phishing attempt. Government agencies like the IRS never request bank details via email or unsecured websites. Always access government services through their official .gov websites.",
    "This appears to be a legitimate order confirmation. Amazon and other reputable e-commerce sites use their official domains for order-related communications. However, always be cautious and verify the sender's email address.",
    "This is a phishing attempt. Google and other tech companies never use third-party domains for security alerts. Always access your account settings directly through the official website or app to check for security issues.",
    "This looks like a legitimate flight confirmation. However, always double-check that the airline's domain is correct and that you've actually booked a flight. If in doubt, log in to your account on the airline's official website or contact their customer service.",
    "This is a phishing attempt. Netflix and other subscription services will never ask you to update payment information through a third-party website. Always manage your account directly through the official Netflix website or app."
];


        function startTimer() {
            timeLeft = 10;
            timerElement.textContent = `Time left: ${timeLeft}s`;
            stopTimer();
            timer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `Time left: ${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    handleResponse(null);
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function updateExample() {
            const example = examples[currentExampleIndex];
            emailExampleElement.textContent = example.text;
            feedback.textContent = "";
            nextButton.style.display = "none";
            phishingButton.disabled = false;
            legitimateButton.disabled = false;
            timerElement.textContent = "Time left: 10s";
        }

        function handleResponse(isPhishing) {
            stopTimer();
            const example = examples[currentExampleIndex];
            phishingButton.disabled = true;
            legitimateButton.disabled = true;

            if (isPhishing === null) {
                feedback.textContent = "Time's up! " + explanations[currentExampleIndex];
                feedback.style.color = "orange";
            } else if (example.isPhishing === isPhishing) {
                feedback.textContent = "Correct! " + explanations[currentExampleIndex];
                feedback.style.color = "green";
                score++;
            } else {
                feedback.textContent = "Incorrect. " + explanations[currentExampleIndex];
                feedback.style.color = "red";
            }

            nextButton.style.display = "block";
        }

        nextButton.addEventListener("click", () => {
            currentExampleIndex++;
            if (currentExampleIndex >= examples.length) {
                endQuiz();
                return;
            }
            
            updateExample();
            startTimer();
        });

        phishingButton.addEventListener("click", () => handleResponse(true));
        legitimateButton.addEventListener("click", () => handleResponse(false));

        startButton.addEventListener("click", () => {
            document.getElementById("quiz-start-section").style.display = "none";
            document.getElementById("quiz-section").style.display = "block";
            updateExample();
            startTimer();
        });

        function endQuiz() {
            document.getElementById("quiz-section").style.display = "none";
            const resultSection = document.getElementById("result-section");
            resultSection.style.display = "block";
            resultSection.innerHTML = `
                <h2>Quiz Completed!</h2>
                <p>Your score: ${score} out of ${totalQuestions}</p>
                <button id="restart-btn">Restart Quiz</button>
            `;
            
            document.getElementById("restart-btn").addEventListener("click", restartQuiz);
        }

        function restartQuiz() {
            score = 0;
            currentExampleIndex = 0;
            
            document.getElementById("result-section").style.display = "none";
            document.getElementById("quiz-start-section").style.display = "block";
        }

        // Initialize the quiz page
        document.getElementById("quiz-start-section").style.display = "block";
        document.getElementById("quiz-section").style.display = "none";
        document.getElementById("result-section").style.display = "none";
    }
});
