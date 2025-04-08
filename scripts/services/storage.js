/**
 * Storage service for CommitTracker
 * Handles data persistence using localStorage
 */

// Task data model
/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {string} category - Task category
 * @property {string} priority - Task priority (low, medium, high)
 * @property {string} dueDate - Due date in ISO format
 * @property {boolean} completed - Whether the task is completed
 * @property {string} createdAt - Creation date in ISO format
 */

// Storage keys
const STORAGE_KEYS = {
    TASKS: 'commitTracker_tasks'
};

/**
 * Storage service for tasks
 */
const StorageService = {
    /**
     * Get all tasks from localStorage
     * @returns {Task[]} Array of tasks
     */
    getTasks() {
        const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS);
        return tasksJson ? JSON.parse(tasksJson) : [];
    },

    /**
     * Save tasks to localStorage
     * @param {Task[]} tasks - Array of tasks to save
     */
    saveTasks(tasks) {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    },

    /**
     * Add a new task
     * @param {Task} task - Task to add
     * @returns {Task} Added task with generated ID
     */
    addTask(task) {
        const tasks = this.getTasks();
        const newTask = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            completed: false
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        return newTask;
    },

    /**
     * Update an existing task
     * @param {Task} updatedTask - Task with updated properties
     * @returns {Task|null} Updated task or null if not found
     */
    updateTask(updatedTask) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(task => task.id === updatedTask.id);

        if (index === -1) {
            return null;
        }

        tasks[index] = { ...tasks[index], ...updatedTask };
        this.saveTasks(tasks);
        return tasks[index];
    },

    /**
     * Delete a task by ID
     * @param {string} id - Task ID to delete
     * @returns {boolean} True if task was deleted, false if not found
     */
    deleteTask(id) {
        const tasks = this.getTasks();
        const initialLength = tasks.length;
        const filteredTasks = tasks.filter(task => task.id !== id);

        if (filteredTasks.length === initialLength) {
            return false;
        }

        this.saveTasks(filteredTasks);
        return true;
    },

    /**
     * Get a task by ID
     * @param {string} id - Task ID to find
     * @returns {Task|null} Found task or null if not found
     */
    getTaskById(id) {
        const tasks = this.getTasks();
        return tasks.find(task => task.id === id) || null;
    },

    /**
     * Toggle task completion status
     * @param {string} id - Task ID to toggle
     * @returns {Task|null} Updated task or null if not found
     */
    toggleTaskCompletion(id) {
        const task = this.getTaskById(id);

        if (!task) {
            return null;
        }

        task.completed = !task.completed;
        return this.updateTask(task);
    },

    /**
     * Initialize with sample tasks if storage is empty
     */
    initializeWithSampleTasks() {
        const tasks = this.getTasks();

        if (tasks.length === 0) {
            const sampleTasks = [
                {
                    title: 'Complete project setup',
                    description: 'Set up the basic project structure and dependencies',
                    category: 'Development',
                    priority: 'high',
                    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                    completed: true
                },
                {
                    title: 'Implement task list component',
                    description: 'Create the component to display all tasks',
                    category: 'Development',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
                    completed: false
                },
                {
                    title: 'Design task form',
                    description: 'Create a form for adding and editing tasks',
                    category: 'Design',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
                    completed: false
                }
            ];

            sampleTasks.forEach(task => this.addTask(task));
        }
    }
};

export default StorageService;
