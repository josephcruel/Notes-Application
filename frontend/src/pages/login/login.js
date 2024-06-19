document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
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

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;

        logIn(email, password);
    });

    function logIn(email, password) {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
                showToast('Signup Failed', '#FF0000');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            showToast('Signup Sucessful', '#6411da');
            setTimeout(() => {
                window.location.href = '/home/home.html';
            }, 1000);
        })
        .catch(error => {
            console.error('Error logging in:', error);
            showToast('Signup Failed', '#FF0000');
        });
    }
});
