/* ========================================
   Data Management Module
======================================== */

const DataManager = {
    // Storage keys
    KEYS: {
        USERS: 'mywebsite_users',
        CURRENT_USER: 'mywebsite_current_user',
        TASKS: 'mywebsite_tasks',
        SETTINGS: 'mywebsite_settings',
        CONTACTS: 'mywebsite_contacts',
        THEME: 'mywebsite_theme'
    },

    // Initialize default data
    init() {
        if (!this.getUsers().length) {
            const defaultUsers = [
                {
                    id: 'user_1',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    username: 'johndoe',
                    password: 'Password123!',
                    phone: '+1 234 567 8900',
                    dob: '1995-06-15',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
                    company: 'Tech Corp',
                    position: 'Senior Developer',
                    location: 'San Francisco, CA',
                    website: 'www.johndoe.com',
                    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML'],
                    createdAt: new Date('2024-01-15').toISOString(),
                    settings: {
                        newsletter: true,
                        pushNotifications: false,
                        publicProfile: true,
                        showEmail: false,
                        theme: 'light',
                        accentColor: 'blue'
                    }
                },
                {
                    id: 'user_2',
                    firstName: 'Sarah',
                    lastName: 'Johnson',
                    email: 'sarah@example.com',
                    username: 'sarahj',
                    password: 'Password456!',
                    phone: '+1 555 987 6543',
                    dob: '1992-03-22',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    bio: 'UX Designer | Creative Thinker',
                    company: 'Design Studio',
                    position: 'Lead Designer',
                    location: 'New York, NY',
                    website: 'www.sarahj.design',
                    skills: ['Figma', 'Sketch', 'Adobe XD', 'CSS', 'Illustration'],
                    createdAt: new Date('2024-02-20').toISOString(),
                    settings: {
                        newsletter: true,
                        pushNotifications: true,
                        publicProfile: true,
                        showEmail: true,
                        theme: 'light',
                        accentColor: 'purple'
                    }
                }
            ];
            this.save(this.KEYS.USERS, defaultUsers);
        }

        if (!this.getTasks().length) {
            const defaultTasks = [
                {
                    id: 'task_1',
                    userId: 'user_1',
                    title: 'Complete dashboard redesign',
                    description: 'Redesign the main dashboard with new components',
                    dueDate: '2024-12-30',
                    priority: 'high',
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'task_2',
                    userId: 'user_1',
                    title: 'Review pull requests',
                    description: 'Review and merge pending pull requests',
                    dueDate: '2024-12-25',
                    priority: 'medium',
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'task_3',
                    userId: 'user_1',
                    title: 'Update documentation',
                    description: 'Update API documentation with new endpoints',
                    dueDate: '2024-12-28',
                    priority: 'low',
                    completed: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'task_4',
                    userId: 'user_1',
                    title: 'Fix login bug',
                    description: 'Fix the authentication timeout issue',
                    dueDate: '2024-12-22',
                    priority: 'high',
                    completed: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'task_5',
                    userId: 'user_1',
                    title: 'Set up CI/CD pipeline',
                    description: 'Configure automated testing and deployment',
                    dueDate: '2025-01-05',
                    priority: 'medium',
                    completed: false,
                    createdAt: new Date().toISOString()
                }
            ];
            this.save(this.KEYS.TASKS, defaultTasks);
        }
    },

    // Generic save/load methods
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    },

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading data:', e);
            return null;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    // User methods
    getUsers() {
        return this.load(this.KEYS.USERS) || [];
    },

    getUserById(id) {
        return this.getUsers().find(u => u.id === id);
    },

    getUserByEmail(email) {
        return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    getUserByUsername(username) {
        return this.getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
    },

    addUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: 'user_' + Date.now(),
            ...userData,
            avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=6366f1&color=fff`,
            bio: '',
            company: '',
            position: '',
            location: '',
            website: '',
            skills: [],
            createdAt: new Date().toISOString(),
            settings: {
                newsletter: userData.newsletter || false,
                pushNotifications: false,
                publicProfile: true,
                showEmail: false,
                theme: 'light',
                accentColor: 'blue'
            }
        };
        users.push(newUser);
        this.save(this.KEYS.USERS, users);
        return newUser;
    },

    updateUser(id, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            this.save(this.KEYS.USERS, users);
            
            // Update current user if it's the same
            const currentUser = this.getCurrentUser();
            if (currentUser && currentUser.id === id) {
                this.setCurrentUser(users[index]);
            }
            return users[index];
        }
        return null;
    },

    deleteUser(id) {
        let users = this.getUsers();
        users = users.filter(u => u.id !== id);
        this.save(this.KEYS.USERS, users);
        
        // Remove user tasks
        let tasks = this.getTasks();
        tasks = tasks.filter(t => t.userId !== id);
        this.save(this.KEYS.TASKS, tasks);
    },

    // Session methods
    getCurrentUser() {
        return this.load(this.KEYS.CURRENT_USER);
    },

    setCurrentUser(user) {
        this.save(this.KEYS.CURRENT_USER, user);
    },

    clearCurrentUser() {
        this.remove(this.KEYS.CURRENT_USER);
    },

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    // Task methods
    getTasks() {
        return this.load(this.KEYS.TASKS) || [];
    },

    getUserTasks(userId) {
        return this.getTasks().filter(t => t.userId === userId);
    },

    addTask(taskData) {
        const tasks = this.getTasks();
        const newTask = {
            id: 'task_' + Date.now(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        this.save(this.KEYS.TASKS, tasks);
        return newTask;
    },

    updateTask(id, updates) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            this.save(this.KEYS.TASKS, tasks);
            return tasks[index];
        }
        return null;
    },

    deleteTask(id) {
        let tasks = this.getTasks();
        tasks = tasks.filter(t => t.id !== id);
        this.save(this.KEYS.TASKS, tasks);
    },

    toggleTask(id) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save(this.KEYS.TASKS, tasks);
            return task;
        }
        return null;
    },

    // Contact messages
    addContactMessage(messageData) {
        const contacts = this.load(this.KEYS.CONTACTS) || [];
        const newMessage = {
            id: 'msg_' + Date.now(),
            ...messageData,
            createdAt: new Date().toISOString()
        };
        contacts.push(newMessage);
        this.save(this.KEYS.CONTACTS, contacts);
        return newMessage;
    },

    // Theme
    getTheme() {
        return this.load(this.KEYS.THEME) || 'light';
    },

    setTheme(theme) {
        this.save(this.KEYS.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
    },

    // Activity Log
    getActivity(userId) {
        const activities = [
            {
                icon: 'fas fa-check-circle',
                iconClass: 'green',
                title: 'Completed task "Fix login bug"',
                description: 'Authentication issue resolved',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-folder',
                iconClass: 'blue',
                title: 'Created new project "Website Redesign"',
                description: 'Started a new project workspace',
                time: '5 hours ago'
            },
            {
                icon: 'fas fa-user-edit',
                iconClass: 'orange',
                title: 'Updated profile information',
                description: 'Changed bio and location',
                time: 'Yesterday'
            },
            {
                icon: 'fas fa-star',
                iconClass: 'purple',
                title: 'Earned "Early Adopter" badge',
                description: 'Achievement unlocked!',
                time: '2 days ago'
            },
            {
                icon: 'fas fa-comment',
                iconClass: 'blue',
                title: 'Left a review on Project Alpha',
                description: 'Rated 5 stars',
                time: '3 days ago'
            }
        ];
        return activities;
    },

    // Projects data
    getProjects() {
        return [
            {
                title: 'Website Redesign',
                description: 'Complete overhaul of the company website with modern design.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
                tags: ['React', 'CSS', 'UI/UX']
            },
            {
                title: 'Mobile App',
                description: 'Cross-platform mobile application for task management.',
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
                tags: ['React Native', 'Firebase']
            },
            {
                title: 'API Development',
                description: 'RESTful API for the new microservices architecture.',
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
                tags: ['Node.js', 'Express', 'MongoDB']
            }
        ];
    },

    // Achievements data
    getAchievements() {
        return [
            { icon: '🏆', title: 'Early Adopter', description: 'Joined in the first month', unlocked: true },
            { icon: '⭐', title: 'Top Rated', description: 'Maintained 4.5+ rating', unlocked: true },
            { icon: '🚀', title: 'Fast Starter', description: 'Completed 5 tasks in first week', unlocked: true },
            { icon: '💎', title: 'Diamond Member', description: 'Premium member for 1 year', unlocked: false },
            { icon: '🎯', title: 'Goal Setter', description: 'Set and achieved 10 goals', unlocked: true },
            { icon: '🌟', title: 'Superstar', description: 'Completed 100 tasks', unlocked: false }
        ];
    }
};

// Initialize data on load
DataManager.init();