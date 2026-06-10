/* ========================================
   Form Validation Module
======================================== */

const Validator = {
    // Validation rules
    rules: {
        required: (value) => {
            return value.trim() !== '' ? '' : 'This field is required.';
        },
        
        email: (value) => {
            if (!value.trim()) return 'Email is required.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
        },
        
        password: (value) => {
            if (!value) return 'Password is required.';
            if (value.length < 8) return 'Password must be at least 8 characters.';
            if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter.';
            if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter.';
            if (!/[0-9]/.test(value)) return 'Password must contain a number.';
            return '';
        },
        
        confirmPassword: (value, password) => {
            if (!value) return 'Please confirm your password.';
            return value === password ? '' : 'Passwords do not match.';
        },
        
        name: (value) => {
            if (!value.trim()) return 'Name is required.';
            if (value.trim().length < 2) return 'Name must be at least 2 characters.';
            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters.';
            return '';
        },
        
        username: (value) => {
            if (!value.trim()) return 'Username is required.';
            if (value.length < 3) return 'Username must be at least 3 characters.';
            if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores.';
            return '';
        },
        
        phone: (value) => {
            if (!value.trim()) return '';
            const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
            return phoneRegex.test(value.replace(/\s/g, '')) ? '' : 'Please enter a valid phone number.';
        },
        
        minLength: (value, min) => {
            return value.length >= min ? '' : `Must be at least ${min} characters.`;
        },
        
        maxLength: (value, max) => {
            return value.length <= max ? '' : `Must be no more than ${max} characters.`;
        }
    },

    // Validate a single field
    validateField(input, rule, ...args) {
        const value = input.value;
        const error = this.rules[rule](value, ...args);
        const errorElement = document.getElementById(input.id + 'Error');
        
        if (error) {
            input.classList.add('error');
            input.classList.remove('success');
            if (errorElement) errorElement.textContent = error;
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    },

    // Get password strength
    getPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        
        if (strength <= 1) return { level: 'weak', text: 'Weak password', class: 'weak' };
        if (strength <= 2) return { level: 'fair', text: 'Fair password', class: 'fair' };
        if (strength <= 3) return { level: 'good', text: 'Good password', class: 'good' };
        return { level: 'strong', text: 'Strong password', class: 'strong' };
    },

    // Show field error
    showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        
        if (input) {
            input.classList.add('error');
            input.classList.remove('success');
        }
        if (errorElement) {
            errorElement.textContent = message;
        }
    },

    // Clear field error
    clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        
        if (input) {
            input.classList.remove('error');
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
    },

    // Clear all errors in a form
    clearAllErrors(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        }
    },

    // Real-time validation setup
    setupRealTimeValidation(inputId, rule, ...args) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        input.addEventListener('blur', () => {
            this.validateField(input, rule, ...args);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                this.validateField(input, rule, ...args);
            }
        });
    }
};