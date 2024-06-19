document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signupForm');
    const toast = document.getElementById('toast');

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

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = signUpForm.elements.name.value;
        const email = signUpForm.elements.email.value;
        const password = signUpForm.elements.password.value;

        signUp(name, email, password);
    })

    function signUp(name, email, password) {
        fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Signup failed');
                showToast('Signup Failed', '#FF0000');
            }
            return response.json();
        })
        .then(data => {
            console.log('Signup successful:', data);
            showToast('Signup Sucessful', '#6411da');
            setTimeout(() => {
                window.location.href = '/home/home.html';
            }, 1000);
        })
        .catch(error => {
            console.error('Error signing up:', error);
            showToast('Signup Failed', '#FF0000');
        })
    }
})