// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    } else if (user && window.location.href.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
}

// Initialize particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Toggle password visibility
function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = event.currentTarget.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Switch between login and register
function showRegister() {
    document.querySelector('.auth-card').classList.add('hidden');
    document.getElementById('registerCard').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerCard').classList.add('hidden');
    document.querySelector('.auth-card').classList.remove('hidden');
}

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    const user = {
        email: email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    showToast('Welcome back! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Handle Register
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    
    const user = {
        email: email,
        name: name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    showToast('Account created! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
window.onload = function() {
    checkAuth();
    createParticles();
};