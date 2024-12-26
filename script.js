console.log("Welcome to Phishing Awareness!");

document.addEventListener("DOMContentLoaded", () => {
    // Placeholder for quiz logic
    console.log("Quiz will go here!");
});

document.addEventListener("DOMContentLoaded", () => {
    const phishingButton = document.getElementById("phishing-btn");
    const legitimateButton = document.getElementById("legitimate-btn");
    const feedback = document.getElementById("feedback");

    // Example 1: Default email shown on load
    const emailExample = {
        text: "Your account has been compromised. Please click here to reset your password.",
        isPhishing: true
    };

    // Event listeners for buttons
    phishingButton.addEventListener("click", () => {
        if (emailExample.isPhishing) {
            feedback.textContent = "Correct! This is a phishing email. Always check links and avoid clicking suspicious ones.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Incorrect. This email is legitimate.";
            feedback.style.color = "red";
        }
    });

    legitimateButton.addEventListener("click", () => {
        if (!emailExample.isPhishing) {
            feedback.textContent = "Correct! This email is legitimate.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Incorrect. This is a phishing email.";
            feedback.style.color = "red";
        }
    });
});
