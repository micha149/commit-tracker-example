/**
 * Task Form Component for CommitTracker
 * Handles task creation and editing
 */

import StorageService from '../services/storage.js';
import * as DateUtils from '../utils/dateUtils.js';

/**
 * TaskForm component
 */
const TaskForm = {
    formElement: null,
    titleInput: null,
    descriptionInput: null,
    categorySelect: null,
    prioritySelect: null,
    dueDateInput: null,
    idInput: null,
    resetButton: null,
    isEditMode: false,

    /**
     * Initialize the task form
     */
    init() {
        // Get form elements
        this.formElement = document.getElementById('task-form');
        this.titleInput = document.getElementById('task-title');
        this.descriptionInput = document.getElementById('task-description');
        this.categorySelect = document.getElementById('task-category');
        this.prioritySelect = document.getElementById('task-priority');
        this.dueDateInput = document.getElementById('task-due-date');
        this.idInput = document.getElementById('task-id');
        this.resetButton = document.getElementById('reset-form');

        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.dueDateInput.value = DateUtils.toLocalDateString(tomorrow.toISOString());

        // Add event listeners
        this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        this.resetButton.addEventListener('click', this.resetForm.bind(this));

        console.log('Task form initialized');
    },

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleSubmit(event) {
        event.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            return;
        }

        // Get form data
        const taskData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            category: this.categorySelect.value,
            priority: this.prioritySelect.value,
            dueDate: DateUtils.toISODateString(this.dueDateInput.value)
        };

        // Check if we're editing or creating a new task
        if (this.isEditMode && this.idInput.value) {
            // Update existing task
            taskData.id = this.idInput.value;
            const updatedTask = StorageService.updateTask(taskData);

            if (updatedTask) {
                console.log('Task updated:', updatedTask);
                this.showNotification('Task updated successfully!');
                // Dispatch event for task list to update
                document.dispatchEvent(new CustomEvent('task-updated', { detail: updatedTask }));
            } else {
                console.error('Failed to update task');
                this.showNotification('Failed to update task', true);
            }
        } else {
            // Create new task
            const newTask = StorageService.addTask(taskData);
            console.log('New task created:', newTask);
            this.showNotification('Task created successfully!');
            // Dispatch event for task list to update
            document.dispatchEvent(new CustomEvent('task-created', { detail: newTask }));
        }

        // Reset form
        this.resetForm();
    },

    /**
     * Validate form inputs
     * @returns {boolean} True if form is valid
     */
    validateForm() {
        // Check if title is empty
        if (!this.titleInput.value.trim()) {
            this.showNotification('Please enter a task title', true);
            this.titleInput.focus();
            return false;
        }

        // Check if due date is valid
        if (this.dueDateInput.value) {
            const dueDate = new Date(this.dueDateInput.value);
            if (isNaN(dueDate.getTime())) {
                this.showNotification('Please enter a valid due date', true);
                this.dueDateInput.focus();
                return false;
            }
        }

        return true;
    },

    /**
     * Reset the form to its initial state
     */
    resetForm() {
        this.formElement.reset();
        this.idInput.value = '';
        this.isEditMode = false;

        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.dueDateInput.value = DateUtils.toLocalDateString(tomorrow.toISOString());

        // Update form title
        document.querySelector('#task-form-container h2').textContent = 'Add New Task';
    },

    /**
     * Load a task into the form for editing
     * @param {string} taskId - ID of the task to edit
     */
    loadTaskForEdit(taskId) {
        const task = StorageService.getTaskById(taskId);

        if (!task) {
            console.error('Task not found:', taskId);
            return;
        }

        // Fill form with task data
        this.titleInput.value = task.title;
        this.descriptionInput.value = task.description || '';
        this.categorySelect.value = task.category;
        this.prioritySelect.value = task.priority;

        if (task.dueDate) {
            this.dueDateInput.value = DateUtils.toLocalDateString(task.dueDate);
        }

        this.idInput.value = task.id;
        this.isEditMode = true;

        // Update form title
        document.querySelector('#task-form-container h2').textContent = 'Edit Task';

        // Scroll to form
        document.getElementById('task-form-container').scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Show a notification message
     * @param {string} message - Message to display
     * @param {boolean} isError - Whether this is an error message
     */
    showNotification(message, isError = false) {
        // For now, just use alert
        // In a future implementation, this could be replaced with a proper notification component
        if (isError) {
            alert(`Error: ${message}`);
        } else {
            alert(message);
        }
    }
};

export default TaskForm;
