
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;
    const file = document.getElementById("document").files[0];

    // Clear previous errors
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    let isValid = true;

    // Validate full name
    if (name === "") {
        showError("nameError", "Full name is required.");
        isValid = false;
    }

    // Validate roll number
    if (roll === "") {
        showError("rollError", "Roll number is required.");
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("emailError", "Email address is required.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    // Validate course
    if (course === "") {
        showError("courseError", "Please select a course.");
        isValid = false;
    }

    // Validate password strength
    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

    if (password === "") {
        showError("passwordError", "Password is required.");
        isValid = false;
    } else if (!strongPassword.test(password)) {
        showError(
            "passwordError",
            "Use 8+ characters with uppercase, lowercase, number and special character."
        );
        isValid = false;
    }

    // Validate uploaded document
    if (!file) {
        showError("documentError", "Please upload a student document.");
        isValid = false;
    } else {
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {
            showError("documentError", "Only PDF, JPG and PNG files are allowed.");
            isValid = false;
        } else if (file.size > 2 * 1024 * 1024) {
            showError("documentError", "File size must not exceed 2 MB.");
            isValid = false;
        }
    }

    // Display result
    if (isValid) {
        document.getElementById("successMessage").textContent =
            "Registration form validated successfully!";

        // Demo only: no data is saved or uploaded.
        form.reset();
    }
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}
