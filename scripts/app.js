/**
 * Main application script for CommitTracker
 * This file contains the main application logic
 */

import StorageService from './services/storage.js';
import * as DateUtils from './utils/dateUtils.js';
import TaskForm from './components/taskForm.js';
import Statistics from './components/statistics.js';

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    console.log('CommitTracker application initialized');

    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Initialize storage with sample data if empty
    StorageService.initializeWithSampleTasks();

    // Initialize components
    TaskForm.init();

    // Log the number of tasks
    const tasks = StorageService.getTasks();
    console.log(`Loaded ${tasks.length} tasks from storage`);

    // Display a welcome message
    console.log('Welcome to CommitTracker!');
    console.log('This is a simple task management application.');

    // Log sample date formatting
    const today = new Date().toISOString();
    console.log('Today formatted:', DateUtils.formatDate(today));
    console.log('Relative time:', DateUtils.getRelativeTimeDescription(today));

    // Setup event listeners for navigation
    setupNavigation();
}

/**
 * Setup navigation event listeners
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const taskFormContainer = document.getElementById('task-form-container');
    const taskListContainer = document.getElementById('task-list-container');
    const statisticsContainer = document.getElementById('statistics-container');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Handle navigation
            const target = this.textContent.trim().toLowerCase();
            console.log(`Navigating to: ${target}`);

            // Show/hide sections based on navigation
            if (target === 'tasks') {
                taskFormContainer.style.display = 'block';
                taskListContainer.style.display = 'block';
                statisticsContainer.style.display = 'none';
            } else if (target === 'statistics') {
                taskFormContainer.style.display = 'none';
                taskListContainer.style.display = 'none';
                statisticsContainer.style.display = 'block';

                // Initialize statistics component when navigating to it
                Statistics.init();
            } else {
                // For other sections, show an alert for now
                alert(`The "${target}" section will be implemented in future commits.`);
            }
        });
    });
}
