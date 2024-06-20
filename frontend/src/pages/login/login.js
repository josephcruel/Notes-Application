document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const toast = document.getElementById('toast'); 

    // Function to display toast notifications
    function showToast(message, color) {
        toast.textContent = message; 
        toast.style.backgroundColor = color; 
        toast.classList.add('show'); 
        // Hide the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Event listener for the login form submission
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Get user inputs from the form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password }; // Stores email and password in an object
        console.log('Sending login data:', loginData); 

        try {
            // Send a POST request to the server-side API for user login
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(loginData) // Converts loginData object to JSON string
            });

            const result = await response.json(); // Parses the JSON response from the server

            if (response.ok) {
                console.log('Login successful:', result); 
                showToast('Login Successful', '#6411da'); 

                // Save the JWT token received in localStorage for future API requests
                localStorage.setItem('token', result.token);

                // Redirect to the home page after successful login
                setTimeout(() => {
                    window.location.href = '/home'; // Redirects to the '/home' 
                }, 1000);
            } else {
                throw new Error('Login failed'); // Throws an error if login was unsuccessful
            }
        } catch (error) {
            console.error('Error logging in:', error); 
            showToast('Login Failed', '#FF0000'); 
        }
    });
});
