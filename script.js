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
            // ... Other examples here ...
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
                feedback.textContent = "Correct!";
                feedback.style.color = "green";
                score++;
            } else {
                feedback.textContent = "Incorrect.";
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
