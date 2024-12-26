console.log("Welcome to Phishing Awareness!");

document.addEventListener("DOMContentLoaded", () => {
    // Quiz examples
    const examples = [
        { 
            text: "Your account has been compromised. Please click here to reset your password.", 
            isPhishing: true 
        },
        { 
            text: "Your package has been shipped. Track it here: www.trustedshop.com.", 
            isPhishing: false 
        },
        { 
            text: "We've noticed suspicious activity on your account. Please verify your details immediately.", 
            isPhishing: true 
        },
        { 
            text: "Welcome to our newsletter! Click here to confirm your subscription: www.newsletter.com.", 
            isPhishing: false 
        }
    ];

    let currentExampleIndex = 0; // Tracks the current example
    const phishingButton = document.getElementById("phishing-btn");
    const legitimateButton = document.getElementById("legitimate-btn");
    const feedback = document.getElementById("feedback");
    const emailExampleElement = document.getElementById("email-example");

    // Function to update the displayed example
    function updateExample() {
        const example = examples[currentExampleIndex];
        emailExampleElement.innerHTML = `<p>${example.text}</p>`;
        feedback.textContent = ""; // Clear feedback on load
    }

    // Function to handle user response
    function handleResponse(isPhishing) {
        const example = examples[currentExampleIndex];
        if (example.isPhishing === isPhishing) {
            feedback.textContent = "Correct! " + (isPhishing ? "This is a phishing email. Always check links and avoid clicking suspicious ones." : "This email is legitimate.");
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Incorrect. " + (isPhishing ? "This email is legitimate." : "This is a phishing email.");
            feedback.style.color = "red";
        }
        // Move to the next example after a short delay
        setTimeout(() => {
            currentExampleIndex = (currentExampleIndex + 1) % examples.length; // Loop back to the start
            updateExample();
        }, 2000); // 2-second delay
    }

    // Event listeners for the buttons
    phishingButton.addEventListener("click", () => handleResponse(true));
    legitimateButton.addEventListener("click", () => handleResponse(false));

    // Initialize the quiz
    updateExample();
});
