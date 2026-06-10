/* ========================================
   Authentication Module
======================================== */

const Auth = {
    // Login user
    login(email, password) {
        const user = DataManager.getUserByEmail(email);
        
        if (!user) {
            return { success: false, message: 'No account found with this email address.' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password. Please try again.' };
        }
        
        // Set current user
        DataManager.setCurrentUser(user);
        
        return { success: true, message: 'Login successful! Redirecting...', user };
    },

    // Register user
    register(userData) {
        // Check if email already exists
        if (DataManager.getUserByEmail(userData.email)) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        
        // Check if username already exists
        if (DataManager.getUserByUsername(userData.username)) {
            return { success: false, message: 'This username is already taken.' };
        }
        
        // Create new user
        const newUser = DataManager.addUser(userData);
        
        // Auto login
        DataManager.setCurrentUser(newUser);
        
        return { success: true, message: 'Account created successfully!', user: newUser };
    },

    // Logout
    logout() {
        DataManager.clearCurrentUser();
        window.location.href = 'index.html';
    },

    // Check if user is logged in
    isAuthenticated() {
        return DataManager.isLoggedIn();
    },

    // Get current user
    getCurrentUser() {
        return DataManager.getCurrentUser();
    },

    // Update profile
    updateProfile(updates) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not authenticated.' };
        
        const updatedUser = DataManager.updateUser(currentUser.id, updates);
        if (updatedUser) {
            return { success: true, message: 'Profile updated successfully!', user: updatedUser };
        }
        return { success: false, message: 'Failed to update profile.' };
    },

    // Change password
    changePassword(currentPassword, newPassword) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not authenticated.' };
        
        if (currentUser.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        
        const result = DataManager.updateUser(currentUser.id, { password: newPassword });
        if (result) {
            return { success: true, message: 'Password changed successfully!' };
        }
        return { success: false, message: 'Failed to change password.' };
    },

    // Delete account
    deleteAccount() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not authenticated.' };
        
        DataManager.deleteUser(currentUser.id);
        DataManager.clearCurrentUser();
        
        return { success: true, message: 'Account deleted successfully.' };
    },

    // Require authentication (redirect if not logged in)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Update UI based on auth state
    updateAuthUI() {
        const isLoggedIn = this.isAuthenticated();
        const currentUser = this.getCurrentUser();
        
        // Navigation auth buttons
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userMenu = document.getElementById('userMenu');
        const dashboardLink = document.getElementById('dashboardLink');
        
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
        if (registerBtn) registerBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
        if (userMenu) userMenu.style.display = isLoggedIn ? 'flex' : 'none';
        if (dashboardLink) dashboardLink.style.display = isLoggedIn ? 'block' : 'none';
        
        if (isLoggedIn && currentUser) {
            // Update user name displays
            const userNameElements = document.querySelectorAll('#userName, #headerUserName, #welcomeName');
            userNameElements.forEach(el => {
                if (el) el.textContent = currentUser.firstName;
            });
            
            // Update user avatar displays
            const avatarElements = document.querySelectorAll('#userAvatar, #headerUserAvatar');
            avatarElements.forEach(el => {
                if (el) el.src = currentUser.avatar;
            });
        }
    },

    // Social login (simulated)
    socialLogin(provider) {
        // Simulate social login
        const socialUser = {
            firstName: 'Social',
            lastName: 'User',
            email: `social_${Date.now()}@${provider}.com`,
            username: `${provider}_user_${Date.now()}`,
            password: 'SocialLogin123!',
            phone: '',
            dob: ''
        };
        
        // Check if user exists or create new
        let user = DataManager.getUserByEmail(socialUser.email);
        if (!user) {
            user = DataManager.addUser(socialUser);
        }
        
        DataManager.setCurrentUser(user);
        
        return { success: true, message: `Logged in with ${provider}!`, user };
    }
};