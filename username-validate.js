/**
 * Username Validator Project
 * A simple DOM manipulation project for real-time username validation.
 */

// 1. Select DOM Elements
const usernameInput = document.getElementById('name');
const messageElement = document.getElementById('message');
const errorsListElement = document.getElementById('errors');

// 2. Define Validation Rules & Error Messages
const validations = [
    {
        // Check if username is less than 5 characters
        condition: (value) => value.length < 5,
        message: "Username must be at least 5 characters long."
    },
    {
        // Check if username contains any spaces
        condition: (value) => /\s/.test(value),
        message: "Username cannot contain spaces."
    },
    {
        // Check if username contains any numbers
        condition: (value) => /\d/.test(value),
        message: "Username cannot contain numbers."
    }
];

/**
 * Validates the input value and updates the UI accordingly.
 * @param {string} value - The username input value to validate
 */
function validateUsername(value) {
    // Clear previous errors and messages
    errorsListElement.innerHTML = '';
    messageElement.textContent = '';
    messageElement.className = 'message';

    // Check for empty input first
    if (value.trim() === '') {
        messageElement.textContent = 'Please enter a username.';
        // Return here to avoid checking rules on empty string
        return;
    }

    // Array to collect error messages
    const errors = [];

    // Run the input through all validation rules
    validations.forEach(rule => {
        if (rule.condition(value)) {
            errors.push(rule.message);
        }
    });

    // Update UI based on validation results
    if (errors.length > 0) {
        // Handle Invalid Case
        messageElement.textContent = 'Invalid Username';
        messageElement.classList.add('error');

        // Render error list dynamically
        errors.forEach(errorMsg => {
            const li = document.createElement('li');
            li.textContent = errorMsg;
            errorsListElement.appendChild(li);
        });
    } else {
        // Handle Valid Case
        messageElement.textContent = 'Valid Username! 🎉';
        messageElement.classList.add('success');
    }
}

// 3. Add Event Listeners
// The 'keyup' event triggers every time the user releases a key
usernameInput.addEventListener('keyup', (event) => {
    const currentValue = event.target.value;
    validateUsername(currentValue);
});