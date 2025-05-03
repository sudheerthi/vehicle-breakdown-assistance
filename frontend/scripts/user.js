const API_URL = 'http://localhost:5000/api/auth';

document.getElementById('user-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    

const email = document.getElementById('user-email').value;
const password = document.getElementById('user-password').value;

try {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('uid', data.email);

        
        window.location.href = `./user-dashboard.html` ;
    } else {
        alert(`Error: ${data.error || 'Login failed'}`);
    }
} catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred while logging in.');
}
});

document.getElementById('user-signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-signup-email').value;
    const password = document.getElementById('user-signup-password').value;
    const secretQuestion = document.getElementById('user-secret-question').value;
    const secretAnswer=document.getElementById('user-secret-answer').value;

    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password ,secretQuestion,secretAnswer}),
    });

    const data = await response.json();
    if (response.ok) {
        alert('Signup successful!');
        window.location.href = './user.html';  
    } else {
        alert(`Signup failed: ${data.message}`);
    }
});




// Forgot Password
document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgot-password-email').value.trim();
    const secretAnswer = document.getElementById('forgot-password-secret-answer').value.trim();
    const secretQuestion = document.getElementById('forgot-password-secret-question').value.trim();

    if (!email || !secretAnswer || !secretQuestion) {
        alert('Please provide all ');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, secretAnswer,  secretQuestion }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Redirect to reset password page if applicable
            window.location.href = `./reset-password.html` ;
            
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during forgot password:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});


 