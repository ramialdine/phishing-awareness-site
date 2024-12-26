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
            { text: "Welcome to our newsletter! Click here to confirm your subscription: www.newsletter.com.", isPhishing: false }
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
            "Phishing emails often create a sense of urgency, such as claiming your account has been compromised. Always verify the source before clicking links.",
            "Legitimate emails from stores or shipping companies will often include tracking information that matches your actual order. Look for familiar domains.",
            "Phishing emails will ask for immediate action, like resetting your password, often with a suspicious link.",
            "Legitimate newsletters usually include clear unsubscribe links and come from recognized sources."
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
