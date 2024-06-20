document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signupForm'); // Selecting the signup form element
    const toast = document.getElementById('toast'); // Selecting the toast notification element

    // Toast notification function
    function showToast(message, color) {
        toast.textContent = message; 
        toast.style.backgroundColor = color; 
        toast.className = 'toast show'; 

        // Hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast'; 
        }, 3000);
    }

    // Event listener for the signup form submission
    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get user inputs from the form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signUp(name, email, password); // Call signUp function to handle signup process
        } catch (error) {
            console.error('Error signing up:', error);
            showToast('Signup Failed', '#FF0000'); 
        }
    });

    // Function to handle signup process
    async function signUp(name, email, password) {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            showToast('Signup Successful', '#6411da'); 
            setTimeout(() => {
                window.location.href = '/home/home.html'; // Redirect to home page after successful signup
            }, 1000);
        } catch (error) {
            throw new Error(error.message); 
        }
    }
});


