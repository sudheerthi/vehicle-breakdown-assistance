const API_OWNER_URL = 'http://localhost:5000/api/auth';

// Handle Owner Login
document.getElementById('owner-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('owner-email').value;
    const password = document.getElementById('owner-password').value;

    try {
        const response = await fetch(`${API_OWNER_URL}/owner/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Save token in local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('eid',data.email);
            alert('Owner login successful!');
            // Redirect to owner dashboard
            window.location.href = `./owner-dashboard.html`;
        } else {
            // Handle error response with proper validation
            console.error('Login Error:', data);
            alert(`Login failed: ${data.message || 'Unknown error'}`);
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('An error occurred while logging in. Please try again later.');
    }
});

// Forgot Password
document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgot-password-email').value.trim();
    const secretAnswer = document.getElementById('forgot-password-secret-answer').value.trim();
    const secretQuestion = document.getElementById('forgot-password-secret-question').value.trim();
    //console.log(email,secretAnswer,secretQuestion);

    if (!email || !secretAnswer || !secretQuestion) {
        alert('Please provide all ');
        return;
    }

    try {
        const response = await fetch(`${ API_OWNER_URL }/forgot-password1`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, secretAnswer,  secretQuestion }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
   
            window.location.href = `./reset-password1.html` ;
            
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during forgot password:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});


 
