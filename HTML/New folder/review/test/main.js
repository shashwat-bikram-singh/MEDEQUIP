/* ========================================
   Main Application Module
======================================== */

const App = {
    // Initialize the application
    init() {
        this.hidePreloader();
        this.setupNavigation();
        this.setupAuthUI();
        this.setupEventListeners();
        this.setupPageSpecific();
        Animations.init();
    },

    // Hide preloader
    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 500);
            }, 800);
        }
    },

    // Setup navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const backToTop = document.getElementById('backToTop');

        // Scroll effects
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Back to top
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Hamburger menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close on link click
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }

        // Mobile menu for dashboard
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-active');
            });
        }
    },

    // Setup auth UI
    setupAuthUI() {
        Auth.updateAuthUI();
        this.setupLogoutButtons();
    },

    // Setup logout buttons
    setupLogoutButtons() {
        const logoutSelectors = ['#logoutBtn', '#sidebarLogout', '#headerLogout'];
        
        logoutSelectors.forEach(selector => {
            const btn = document.querySelector(selector);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showToast('success', 'Logged Out', 'You have been successfully logged out.');
                    setTimeout(() => Auth.logout(), 1000);
                });
            }
        });
    },

    // Setup page-specific functionality
    setupPageSpecific() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        switch (page) {
            case 'index.html':
            case '':
                this.initHomePage();
                break;
            case 'login.html':
                this.initLoginPage();
                break;
            case 'register.html':
                this.initRegisterPage();
                break;
            case 'dashboard.html':
                this.initDashboardPage();
                break;
            case 'profile.html':
                this.initProfilePage();
                break;
            case 'settings.html':
                this.initSettingsPage();
                break;
            case 'contact.html':
                this.initContactPage();
                break;
            case 'about.html':
                this.initAboutPage();
                break;
        }
    },

    // Setup global event listeners
    setupEventListeners() {
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input').value;
                this.showToast('success', 'Subscribed!', `${email} has been added to our newsletter.`);
                newsletterForm.reset();
            });
        }

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.closest('.input-wrapper').querySelector('input');
                const icon = btn.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });

        // FAQ accordions
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isActive = item.classList.contains('active');
                
                // Close all
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                
                // Open clicked (if wasn't active)
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.closest('.modal').classList.remove('active');
            });
        });
    },

    // ========================================
    // Page Initializers
    // ========================================

    // Home Page
    initHomePage() {
        this.setupTestimonialsSlider();
    },

    // Login Page
    initLoginPage() {
        if (Auth.isAuthenticated()) {
            window.location.href = 'dashboard.html';
            return;
        }

        const loginForm = document.getElementById('loginForm');
        const forgotPassword = document.getElementById('forgotPassword');
        const forgotModal = document.getElementById('forgotPasswordModal');
        const closeForgotModal = document.getElementById('closeForgotModal');

        // Setup validation
        Validator.setupRealTimeValidation('email', 'email');
        Validator.setupRealTimeValidation('password', 'required');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Validate
                let isValid = true;
                isValid = Validator.validateField(document.getElementById('email'), 'email') && isValid;
                isValid = Validator.validateField(document.getElementById('password'), 'required') && isValid;
                
                if (!isValid) {
                    Animations.shake(loginForm);
                    return;
                }
                
                const submitBtn = document.getElementById('loginSubmit');
                Animations.setLoading(submitBtn, true);
                
                // Simulate API call
                setTimeout(() => {
                    const result = Auth.login(email, password);
                    Animations.setLoading(submitBtn, false);
                    
                    if (result.success) {
                        this.showToast('success', 'Welcome Back!', result.message);
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    } else {
                        this.showToast('error', 'Login Failed', result.message);
                        Animations.shake(loginForm);
                    }
                }, 1500);
            });
        }

        // Forgot password modal
        if (forgotPassword && forgotModal) {
            forgotPassword.addEventListener('click', (e) => {
                e.preventDefault();
                forgotModal.classList.add('active');
            });
        }

        if (closeForgotModal) {
            closeForgotModal.addEventListener('click', () => {
                forgotModal.classList.remove('active');
            });
        }

        // Forgot password form
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('resetEmail').value;
                this.showToast('success', 'Email Sent', `Password reset link sent to ${email}`);
                forgotModal.classList.remove('active');
                forgotForm.reset();
            });
        }

        // Social login
        ['googleLogin', 'facebookLogin', 'githubLogin'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    const provider = id.replace('Login', '');
                    this.showToast('info', 'Social Login', `Connecting to ${provider}...`);
                    setTimeout(() => {
                        const result = Auth.socialLogin(provider);
                        if (result.success) {
                            this.showToast('success', 'Success', result.message);
                            setTimeout(() => window.location.href = 'dashboard.html', 1000);
                        }
                    }, 1500);
                });
            }
        });
    },

    // Register Page
    initRegisterPage() {
        if (Auth.isAuthenticated()) {
            window.location.href = 'dashboard.html';
            return;
        }

        let currentStep = 1;
        const totalSteps = 3;

        const showStep = (step) => {
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
            
            document.querySelectorAll('.progress-steps .step').forEach(s => {
                const stepNum = parseInt(s.dataset.step);
                s.classList.remove('active', 'completed');
                if (stepNum < step) s.classList.add('completed');
                if (stepNum === step) s.classList.add('active');
            });

            const progressFill = document.getElementById('progressFill');
            if (progressFill) {
                progressFill.style.width = `${((step - 1) / (totalSteps - 1)) * 100}%`;
            }
            
            currentStep = step;
        };

        // Step 1 → 2
        const nextStep1 = document.getElementById('nextStep1');
        if (nextStep1) {
            nextStep1.addEventListener('click', () => {
                let isValid = true;
                isValid = Validator.validateField(document.getElementById('firstName'), 'name') && isValid;
                isValid = Validator.validateField(document.getElementById('lastName'), 'name') && isValid;
                
                if (isValid) showStep(2);
                else Animations.shake(document.querySelector('.form-step[data-step="1"]'));
            });
        }

        // Step 2 → 3
        const nextStep2 = document.getElementById('nextStep2');
        if (nextStep2) {
            nextStep2.addEventListener('click', () => {
                let isValid = true;
                isValid = Validator.validateField(document.getElementById('regEmail'), 'email') && isValid;
                isValid = Validator.validateField(document.getElementById('username'), 'username') && isValid;
                isValid = Validator.validateField(document.getElementById('regPassword'), 'password') && isValid;
                
                const password = document.getElementById('regPassword').value;
                const confirmEl = document.getElementById('confirmPassword');
                if (confirmEl.value !== password) {
                    Validator.showError('confirmPassword', 'Passwords do not match.');
                    isValid = false;
                } else {
                    Validator.clearError('confirmPassword');
                }
                
                if (isValid) showStep(3);
                else Animations.shake(document.querySelector('.form-step[data-step="2"]'));
            });
        }

        // Back buttons
        const prevStep2 = document.getElementById('prevStep2');
        if (prevStep2) prevStep2.addEventListener('click', () => showStep(1));
        
        const prevStep3 = document.getElementById('prevStep3');
        if (prevStep3) prevStep3.addEventListener('click', () => showStep(2));

        // Password strength
        const regPassword = document.getElementById('regPassword');
        if (regPassword) {
            regPassword.addEventListener('input', () => {
                const strength = Validator.getPasswordStrength(regPassword.value);
                const strengthBar = document.querySelector('.strength-bar');
                const strengthText = document.querySelector('.strength-text');
                
                if (strengthBar) {
                    strengthBar.className = 'strength-bar ' + strength.class;
                }
                if (strengthText) {
                    strengthText.textContent = strength.text;
                }
            });
        }

        // Register form submit
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const terms = document.getElementById('terms');
                if (!terms.checked) {
                    this.showToast('warning', 'Terms Required', 'Please accept the terms and conditions.');
                    return;
                }
                
                const submitBtn = document.getElementById('registerSubmit');
                Animations.setLoading(submitBtn, true);
                
                const userData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    phone: document.getElementById('phone').value,
                    dob: document.getElementById('dob').value,
                    email: document.getElementById('regEmail').value,
                    username: document.getElementById('username').value,
                    password: document.getElementById('regPassword').value,
                    newsletter: document.getElementById('newsletter').checked
                };
                
                setTimeout(() => {
                    const result = Auth.register(userData);
                    Animations.setLoading(submitBtn, false);
                    
                    if (result.success) {
                        this.showToast('success', 'Welcome!', result.message);
                        setTimeout(() => window.location.href = 'dashboard.html', 1500);
                    } else {
                        this.showToast('error', 'Registration Failed', result.message);
                    }
                }, 1500);
            });
        }

        // Social register
        ['googleRegister', 'facebookRegister'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    const provider = id.replace('Register', '');
                    this.showToast('info', 'Social Sign Up', `Connecting to ${provider}...`);
                    setTimeout(() => {
                        const result = Auth.socialLogin(provider);
                        if (result.success) {
                            this.showToast('success', 'Success', 'Account created!');
                            setTimeout(() => window.location.href = 'dashboard.html', 1000);
                        }
                    }, 1500);
                });
            }
        });
    },

    // Dashboard Page
    initDashboardPage() {
        if (!Auth.requireAuth()) return;
        
        const currentUser = Auth.getCurrentUser();
        
        // Load stats
        const userTasks = DataManager.getUserTasks(currentUser.id);
        const completed = userTasks.filter(t => t.completed).length;
        const pending = userTasks.filter(t => !t.completed).length;
        
        this.animateValue('totalProjects', 0, 5, 1000);
        this.animateValue('completedTasks', 0, completed, 1000);
        this.animateValue('pendingTasks', 0, pending, 1000);
        this.animateValue('userRating', 0, 4.8, 1000, 1);

        // Load activity
        this.loadActivity();
        
        // Load tasks
        this.loadTasks(userTasks);
        
        // Setup task filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                let filteredTasks = userTasks;
                
                if (filter === 'completed') filteredTasks = userTasks.filter(t => t.completed);
                if (filter === 'pending') filteredTasks = userTasks.filter(t => !t.completed);
                
                this.loadTasks(filteredTasks);
            });
        });

        // Calendar
        this.initCalendar();

        // Add task modal
        const addTaskBtn = document.getElementById('addTaskBtn');
        const addTaskModal = document.getElementById('addTaskModal');
        const closeTaskModal = document.getElementById('closeTaskModal');

        if (addTaskBtn && addTaskModal) {
            addTaskBtn.addEventListener('click', () => addTaskModal.classList.add('active'));
        }
        if (closeTaskModal) {
            closeTaskModal.addEventListener('click', () => addTaskModal.classList.remove('active'));
        }

        // Add task form
        const addTaskForm = document.getElementById('addTaskForm');
        if (addTaskForm) {
            addTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const taskData = {
                    userId: currentUser.id,
                    title: document.getElementById('taskTitle').value,
                    description: document.getElementById('taskDescription').value,
                    dueDate: document.getElementById('taskDueDate').value,
                    priority: document.getElementById('taskPriority').value
                };
                
                DataManager.addTask(taskData);
                this.showToast('success', 'Task Added', 'New task has been created successfully.');
                addTaskModal.classList.remove('active');
                addTaskForm.reset();
                
                // Reload tasks
                const updatedTasks = DataManager.getUserTasks(currentUser.id);
                this.loadTasks(updatedTasks);
            });
        }
    },

    // Profile Page
    initProfilePage() {
        if (!Auth.requireAuth()) return;
        
        const currentUser = Auth.getCurrentUser();
        
        // Populate profile data
        const setTextById = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text || '';
        };

        setTextById('profileFullName', `${currentUser.firstName} ${currentUser.lastName}`);
        setTextById('profileUsername', `@${currentUser.username}`);
        setTextById('profileBio', currentUser.bio || 'No bio yet');
        setTextById('profileEmail', currentUser.email);
        setTextById('profilePhone', currentUser.phone || 'Not provided');
        setTextById('company', currentUser.company || 'Not provided');
        setTextById('position', currentUser.position || 'Not provided');
        setTextById('location', currentUser.location || 'Not provided');
        setTextById('profileWebsite', currentUser.website || 'Not provided');
        setTextById('aboutText', currentUser.bio || 'No bio yet.');

        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) profileAvatar.src = currentUser.avatar;

        // Skills
        const skillsList = document.getElementById('skillsList');
        if (skillsList && currentUser.skills) {
            skillsList.innerHTML = currentUser.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
        }

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const tab = document.getElementById(btn.dataset.tab);
                if (tab) tab.classList.add('active');
            });
        });

        // Load activity timeline
        this.loadProfileActivity();
        
        // Load projects
        this.loadProfileProjects();
        
        // Load achievements
        this.loadAchievements();

        // Edit profile
        const editProfileBtn = document.getElementById('editProfileBtn');
        const editProfileModal = document.getElementById('editProfileModal');
        const closeEditModal = document.getElementById('closeEditProfileModal');

        if (editProfileBtn && editProfileModal) {
            editProfileBtn.addEventListener('click', () => {
                // Pre-fill form
                document.getElementById('editFirstName').value = currentUser.firstName;
                document.getElementById('editLastName').value = currentUser.lastName;
                document.getElementById('editBio').value = currentUser.bio || '';
                document.getElementById('editCompany').value = currentUser.company || '';
                document.getElementById('editPosition').value = currentUser.position || '';
                document.getElementById('editLocation').value = currentUser.location || '';
                document.getElementById('editWebsite').value = currentUser.website || '';
                
                editProfileModal.classList.add('active');
            });
        }

        if (closeEditModal) {
            closeEditModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
        }

        // Edit profile form
        const editForm = document.getElementById('editProfileForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const updates = {
                    firstName: document.getElementById('editFirstName').value,
                    lastName: document.getElementById('editLastName').value,
                    bio: document.getElementById('editBio').value,
                    company: document.getElementById('editCompany').value,
                    position: document.getElementById('editPosition').value,
                    location: document.getElementById('editLocation').value,
                    website: document.getElementById('editWebsite').value
                };
                
                const result = Auth.updateProfile(updates);
                if (result.success) {
                    this.showToast('success', 'Profile Updated', result.message);
                    editProfileModal.classList.remove('active');
                    setTimeout(() => location.reload(), 500);
                }
            });
        }

        // Avatar upload
        const editAvatarBtn = document.getElementById('editAvatarBtn');
        const avatarInput = document.getElementById('avatarInput');
        
        if (editAvatarBtn && avatarInput) {
            editAvatarBtn.addEventListener('click', () => avatarInput.click());
            
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const avatarUrl = event.target.result;
                        Auth.updateProfile({ avatar: avatarUrl });
                        if (profileAvatar) profileAvatar.src = avatarUrl;
                        this.showToast('success', 'Avatar Updated', 'Your profile picture has been updated.');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    },

    // Settings Page
    initSettingsPage() {
        if (!Auth.requireAuth()) return;
        
        const currentUser = Auth.getCurrentUser();
        
        // Populate settings form
        if (document.getElementById('settingsFirstName')) {
            document.getElementById('settingsFirstName').value = currentUser.firstName;
            document.getElementById('settingsLastName').value = currentUser.lastName;
            document.getElementById('settingsEmail').value = currentUser.email;
            document.getElementById('settingsUsername').value = currentUser.username;
            document.getElementById('settingsPhone').value = currentUser.phone || '';
        }

        // Settings navigation
        document.querySelectorAll('.settings-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.settings-nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
                
                btn.classList.add('active');
                const section = document.getElementById(btn.dataset.section);
                if (section) section.classList.add('active');
            });
        });

        // Account settings form
        const accountForm = document.getElementById('accountSettingsForm');
        if (accountForm) {
            accountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const updates = {
                    firstName: document.getElementById('settingsFirstName').value,
                    lastName: document.getElementById('settingsLastName').value,
                    email: document.getElementById('settingsEmail').value,
                    username: document.getElementById('settingsUsername').value,
                    phone: document.getElementById('settingsPhone').value
                };
                
                const result = Auth.updateProfile(updates);
                if (result.success) {
                    this.showToast('success', 'Settings Saved', 'Account settings updated successfully.');
                }
            });
        }

        // Change password form
        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const currentPw = document.getElementById('currentPassword').value;
                const newPw = document.getElementById('newPassword').value;
                const confirmPw = document.getElementById('confirmNewPassword').value;
                
                if (newPw !== confirmPw) {
                    this.showToast('error', 'Error', 'New passwords do not match.');
                    return;
                }
                
                const result = Auth.changePassword(currentPw, newPw);
                if (result.success) {
                    this.showToast('success', 'Password Changed', result.message);
                    changePasswordForm.reset();
                } else {
                    this.showToast('error', 'Error', result.message);
                }
            });
        }

        // Delete account
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        const deleteModal = document.getElementById('deleteAccountModal');
        const closeDeleteModal = document.getElementById('closeDeleteModal');
        const cancelDelete = document.getElementById('cancelDelete');
        const deleteConfirmation = document.getElementById('deleteConfirmation');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        if (deleteAccountBtn && deleteModal) {
            deleteAccountBtn.addEventListener('click', () => deleteModal.classList.add('active'));
        }

        if (closeDeleteModal) {
            closeDeleteModal.addEventListener('click', () => deleteModal.classList.remove('active'));
        }

        if (cancelDelete) {
            cancelDelete.addEventListener('click', () => deleteModal.classList.remove('active'));
        }

        if (deleteConfirmation && confirmDeleteBtn) {
            deleteConfirmation.addEventListener('input', () => {
                confirmDeleteBtn.disabled = deleteConfirmation.value !== 'DELETE';
            });
        }

        const deleteForm = document.getElementById('deleteAccountForm');
        if (deleteForm) {
            deleteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (deleteConfirmation.value === 'DELETE') {
                    Auth.deleteAccount();
                    this.showToast('info', 'Account Deleted', 'Your account has been deleted.');
                    setTimeout(() => window.location.href = 'index.html', 1500);
                }
            });
        }

        // Notification toggles
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', () => {
                this.showToast('success', 'Setting Updated', 'Your preference has been saved.');
            });
        });

        // Theme options
        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', () => {
                DataManager.setTheme(radio.value === 'dark' ? 'dark' : 'light');
                this.showToast('success', 'Theme Changed', `Switched to ${radio.value} mode.`);
            });
        });
    },

    // Contact Page
    initContactPage() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                const name = document.getElementById('contactName');
                const email = document.getElementById('contactEmail');
                const subject = document.getElementById('contactSubject');
                const message = document.getElementById('contactMessage');
                
                if (!name.value.trim()) { Validator.showError('contactName', 'Name is required.'); isValid = false; }
                else Validator.clearError('contactName');
                
                if (!Validator.rules.email(email.value) === '') { 
                    Validator.showError('contactEmail', 'Valid email is required.'); 
                    isValid = false; 
                } else Validator.clearError('contactEmail');
                
                if (!subject.value.trim()) { Validator.showError('contactSubject', 'Subject is required.'); isValid = false; }
                else Validator.clearError('contactSubject');
                
                if (!message.value.trim()) { Validator.showError('contactMessage', 'Message is required.'); isValid = false; }
                else Validator.clearError('contactMessage');
                
                if (!isValid) {
                    Animations.shake(contactForm);
                    return;
                }
                
                const submitBtn = document.getElementById('contactSubmit');
                Animations.setLoading(submitBtn, true);
                
                setTimeout(() => {
                    DataManager.addContactMessage({
                        name: name.value,
                        email: email.value,
                        subject: subject.value,
                        category: document.getElementById('contactCategory').value,
                        message: message.value
                    });
                    
                    Animations.setLoading(submitBtn, false);
                    this.showToast('success', 'Message Sent!', 'We\'ll get back to you within 24 hours.');
                    contactForm.reset();
                }, 1500);
            });
        }
    },

    // About Page
    initAboutPage() {
        // Nothing specific needed, animations handled globally
    },

    // ========================================
    // Helper Methods
    // ========================================

    // Toast notification
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="${icons[type]}"></i></div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;

        container.appendChild(toast);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 4500);
    },

    // Testimonials Slider
    setupTestimonialsSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dotsContainer = document.getElementById('sliderDots');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        
        if (!cards.length || !dotsContainer) return;

        let currentIndex = 0;

        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            cards.forEach(c => c.classList.remove('active'));
            dotsContainer.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
            
            cards[index].classList.add('active');
            dotsContainer.querySelectorAll('.slider-dot')[index].classList.add('active');
            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex === cards.length - 1 ? 0 : currentIndex + 1);
            });
        }

        // Auto slide
        setInterval(() => {
            goToSlide(currentIndex === cards.length - 1 ? 0 : currentIndex + 1);
        }, 5000);
    },

    // Load activity list
    loadActivity() {
        const list = document.getElementById('activityList');
        if (!list) return;

        const activities = DataManager.getActivity();
        list.innerHTML = activities.map(a => `
            <div class="activity-item">
                <div class="activity-icon ${a.iconClass}">
                    <i class="${a.icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${a.title}</h4>
                    <p>${a.description}</p>
                </div>
                <span class="activity-time">${a.time}</span>
            </div>
        `).join('');
    },

    // Load tasks list
    loadTasks(tasks) {
        const list = document.getElementById('tasksList');
        if (!list) return;

        if (!tasks.length) {
            list.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:2rem;">No tasks found.</p>';
            return;
        }

        list.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox" onclick="App.toggleTask('${task.id}')"></div>
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-due">${task.dueDate ? 'Due: ' + new Date(task.dueDate).toLocaleDateString() : 'No due date'}</div>
                </div>
                <span class="task-priority ${task.priority}">${task.priority}</span>
                <button class="task-delete" onclick="App.deleteTask('${task.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },

    // Toggle task
    toggleTask(taskId) {
        DataManager.toggleTask(taskId);
        const currentUser = Auth.getCurrentUser();
        const tasks = DataManager.getUserTasks(currentUser.id);
        this.loadTasks(tasks);
    },

    // Delete task
    deleteTask(taskId) {
        DataManager.deleteTask(taskId);
        const currentUser = Auth.getCurrentUser();
        const tasks = DataManager.getUserTasks(currentUser.id);
        this.loadTasks(tasks);
        this.showToast('info', 'Task Deleted', 'Task has been removed.');
    },

    // Calendar
    initCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthEl = document.getElementById('currentMonth');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        if (!calendarGrid) return;

        let currentDate = new Date();

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            
            if (currentMonthEl) {
                currentMonthEl.textContent = `${monthNames[month]} ${year}`;
            }

            let html = '';
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayNames.forEach(day => {
                html += `<div class="calendar-day-name">${day}</div>`;
            });

            // Previous month days
            const prevMonthDays = new Date(year, month, 0).getDate();
            for (let i = firstDay - 1; i >= 0; i--) {
                html += `<div class="calendar-day other-month">${prevMonthDays - i}</div>`;
            }

            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                html += `<div class="calendar-day ${isToday ? 'today' : ''}">${i}</div>`;
            }

            // Next month days
            const totalCells = firstDay + daysInMonth;
            const remaining = 42 - totalCells;
            for (let i = 1; i <= remaining; i++) {
                html += `<div class="calendar-day other-month">${i}</div>`;
            }

            calendarGrid.innerHTML = html;
        }

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }

        renderCalendar();
    },

    // Load profile activity
    loadProfileActivity() {
        const timeline = document.getElementById('profileActivityTimeline');
        if (!timeline) return;

        const activities = DataManager.getActivity();
        timeline.innerHTML = activities.map(a => `
            <div class="timeline-item">
                <span class="timeline-date">${a.time}</span>
                <h4>${a.title}</h4>
                <p>${a.description}</p>
            </div>
        `).join('');
    },

    // Load profile projects
    loadProfileProjects() {
        const grid = document.getElementById('profileProjectsGrid');
        if (!grid) return;

        const projects = DataManager.getProjects();
        grid.innerHTML = projects.map(p => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <div class="project-tags">
                        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Load achievements
    loadAchievements() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;

        const achievements = DataManager.getAchievements();
        grid.innerHTML = achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? '' : 'locked'}" style="${!a.unlocked ? 'opacity: 0.5' : ''}">
                <div class="achievement-icon">${a.icon}</div>
                <h4>${a.title}</h4>
                <p>${a.description}</p>
                ${!a.unlocked ? '<span class="badge">Locked</span>' : ''}
            </div>
        `).join('');
    },

    // Animate number value
    animateValue(elementId, start, end, duration, decimals = 0) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;

            element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});