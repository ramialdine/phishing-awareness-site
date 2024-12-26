console.log("Welcome to Phishing Awareness!");

document.addEventListener("DOMContentLoaded", () => {
    // Quiz examples
    const examples = [
        { text: "Your account has been compromised. Please click here to reset your password.", isPhishing: true },
        { text: "Your package has been shipped. Track it here: www.trustedshop.com.", isPhishing: false },
        { text: "We've noticed suspicious activity on your account. Please verify your details immediately.", isPhishing: true },
        { text: "Welcome to our newsletter! Click here to confirm your subscription: www.newsletter.com.", isPhishing: false }
    ];

    let score = 0;
    const totalQuestions = examples.length;
    let currentExampleIndex = 0; // Tracks the current example
    let timeLeft = 10; // 10 seconds per question
    let timer;

    const phishingButton = document.getElementById("phishing-btn");
    const legitimateButton = document.getElementById("legitimate-btn");
    const feedback = document.getElementById("feedback");
    const emailExampleElement = document.getElementById("email-example");

    // Explanations for each example
    const explanations = [
        "Phishing emails often create a sense of urgency, such as claiming your account has been compromised. Always verify the source before clicking links.",
        "Legitimate emails from stores or shipping companies will often include tracking information that matches your actual order. Look for familiar domains.",
        "Phishing emails will ask for immediate action, like resetting your password, often with a suspicious link.",
        "Legitimate newsletters usually include clear unsubscribe links and come from recognized sources."
    ];

    // Start timer when the quiz starts
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            feedback.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                feedback.textContent = "Time's up!";
                // Move to the next question automatically after time is up
                currentExampleIndex = (currentExampleIndex + 1) % examples.length;
                updateExample();
                timeLeft = 10; // Reset timer for next question
            }
        }, 1000);
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timer);
        timeLeft = 10; // Reset timer
    }

    // Function to update the displayed example
    function updateExample() {
        const example = examples[currentExampleIndex];
        emailExampleElement.innerHTML = `<p>${example.text}</p>`;
        feedback.textContent = ""; // Clear feedback on load
    }

    // Handle user response and move to next question
    function handleResponse(isPhishing) {
        const example = examples[currentExampleIndex];

        // Check if the response is correct
        if (example.isPhishing === isPhishing) {
            feedback.textContent = "Correct! " + explanations[currentExampleIndex];
            feedback.style.color = "green";
            score++;
        } else {
            feedback.textContent = "Incorrect. " + explanations[currentExampleIndex];
            feedback.style.color = "red";
        }

        // Move to the next example after a short delay
        setTimeout(() => {
            currentExampleIndex = (currentExampleIndex + 1) % examples.length; // Loop back to the start
            updateExample();

            // If all questions are answered, show score
            if (currentExampleIndex === 0) {
                setTimeout(() => {
                    feedback.textContent = `Your score: ${score} / ${totalQuestions}`;
                    feedback.style.color = "blue";
                }, 2000); // Show score after delay
            }
        }, 2000); // 2-second delay
    }

    // Event listeners for the buttons
    phishingButton.addEventListener("click", () => {
        stopTimer();
        handleResponse(true);
        startTimer();
    });
    legitimateButton.addEventListener("click", () => {
        stopTimer();
        handleResponse(false);
        startTimer();
    });

    // Initialize the quiz and start the timer
    updateExample();
    startTimer();
});
