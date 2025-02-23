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
            { text: "Your account has been compromised. Please click here to reset your password.", isPhishing: true, explanation: "This is a common phishing tactic to steal your credentials." },
            { text: "Your package has been shipped. Track it here: www.trustedshop.com. (Assuming you have recently made a purchase from this shop)", isPhishing: false, explanation: "This is a legitimate message if you recently made a purchase from this shop." },
            { text: "We've noticed suspicious activity on your account. Please verify your details immediately.", isPhishing: true, explanation: "Phishers often use urgency to trick you into revealing personal information." },
            { text: "Welcome to our newsletter! Click here to confirm your subscription: www.newsletter.com.", isPhishing: false, explanation: "This is a common and legitimate practice for confirming subscriptions." },
            { text: "Congratulations! You've won a free iPhone. Click here to claim your prize: www.free-iphone-giveaway.com", isPhishing: true, explanation: "Be wary of unsolicited offers and prizes, as they are often phishing attempts." },
            { text: "Your credit card payment is due. Log in to your account at www.yourbank.com to make a payment.", isPhishing: false, explanation: "As long as the URL matches your bank's official site, this is legitimate." },
            { text: "URGENT: Your tax refund is ready. Provide your bank details here: www.irs-refund.net", isPhishing: true, explanation: "The IRS will never ask for sensitive information via email." },
            { text: "Your order #1234 has been processed. View your receipt at www.amazon.com/orders", isPhishing: false, explanation: "This is a legitimate order confirmation from Amazon." },
            { text: "Security Alert: Unusual login attempt detected. Verify your identity now: www.google-security.net", isPhishing: true, explanation: "Phishers use fake security alerts to steal your login credentials." },
            { text: "Your flight reservation is confirmed. Check in online at www.delta.com", isPhishing: false, explanation: "This is a legitimate flight confirmation if you booked a flight with Delta." },
            { text: "Your Netflix subscription has expired. Update your payment info here: www.netflix-renewal.com", isPhishing: true, explanation: "Phishers often use fake renewal notifications to steal payment information." },
            { text: "Thank you for your purchase. Leave a review for a 10% discount on your next order at www.etsy.com", isPhishing: false, explanation: "This is a legitimate request for a review from Etsy." },
            { text: "Your social security number has been suspended due to suspicious activity. Call this number immediately: 1-800-555-1234", isPhishing: true, explanation: "Social Security will never suspend your number or call you for verification." },
            { text: "Your password will expire in 3 days. Change it now at portal.yourcompany.com", isPhishing: false, explanation: "This is a legitimate password expiration notice from your company." },
            { text: "You have (1) new voicemail. Listen now: www.voicemail-service.net", isPhishing: true, explanation: "Phishers use fake voicemail notifications to steal your credentials." }
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
                feedback.textContent = "Time's up!";
                feedback.style.color = "orange";
            } else if (example.isPhishing === isPhishing) {
                feedback.textContent = "Correct! " + example.explanation;
                feedback.style.color = "green";
                score++;
            } else {
                feedback.textContent = "Incorrect. " + example.explanation;
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

    // Phishing Email Builder functionality (only execute if on builder page)
    if (document.getElementById("email-builder")) {
        console.log("Email Builder loaded!");

        const form = document.getElementById("builder-form");
        const generateBtn = document.getElementById("generate-btn");
        const generatedEmail = document.getElementById("generated-email");

        generateBtn.addEventListener("click", () => {
            const sender = document.getElementById("sender").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const content = document.getElementById("content").value;
            const link = document.getElementById("link").value;

            if (!sender || !email || !content || !link) {
                alert("Please fill out all fields!");
                return;
            }

            const emailHtml = `
                <p><strong>From:</strong> ${sender} <em>&lt;${email}&gt;</em></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${content}</p>
                <p><a href="${link}" target="_blank">Click here</a></p>
            `;

            generatedEmail.innerHTML = emailHtml;
        });
    }
});
