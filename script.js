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
    const nextButton = document.getElementById("next-btn"); // New button for next question
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
                handleResponse(false); // Automatically mark it incorrect when time runs out
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
        nextButton.style.display = "none"; // Hide next button until after an answer or time runs out
    }

    // Handle user response and move to next question
    function handleResponse(isPhishing) {
        const example = examples[currentExampleIndex];

        // Show explanation based on the answer or time-out
        if (example.isPhishing === isPhishing) {
            feedback.textContent = "Correct! " + explanations[currentExampleIndex];
            feedback.style.color = "green";
            score++;
        } else {
            feedback.textContent = "Incorrect. " + explanations[currentExampleIndex];
            feedback.style.color = "red";
        }

        // Display the "Next Question" button after feedback
        nextButton.style.display = "block";
    }

    // Event listener for "Next Question" button
    nextButton.addEventListener("click", () => {
        currentExampleIndex = (currentExampleIndex + 1) % examples.length; // Move to next example
        updateExample();
        startTimer(); // Restart the timer for the next question
    });

    // Event listeners for the answer buttons
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
