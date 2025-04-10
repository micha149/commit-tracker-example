/**
 * Statistics Component for CommitTracker
 * Displays statistics and visualizations for tasks
 */

import StorageService from '../services/storage.js';
import * as DateUtils from '../utils/dateUtils.js';

/**
 * Statistics component
 */
const Statistics = {
    containerElement: null,

    /**
     * Initialize the statistics component
     */
    init() {
        // Get container element
        this.containerElement = document.getElementById('statistics-container');

        if (!this.containerElement) {
            console.error('Statistics container not found');
            return;
        }

        console.log('Statistics component initialized');

        // Render statistics
        this.render();
    },

    /**
     * Render the statistics
     */
    render() {
        if (!this.containerElement) return;

        // Get tasks from storage
        const tasks = StorageService.getTasks();
        console.log('DEBUG: Fetched tasks for statistics:', tasks); // DEBUG

        if (tasks.length === 0) {
            this.containerElement.innerHTML = `
                <div class="empty-state">
                    <p>No tasks available to generate statistics.</p>
                    <p>Create some tasks to see statistics here.</p>
                </div>
            `;
            return;
        }

        // Basic statistics HTML structure
        this.containerElement.innerHTML = `
            <div class="statistics-grid">
                <div class="stat-card" id="status-stats">
                    <h3>Task Status</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="category-stats">
                    <h3>Categories</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="priority-stats">
                    <h3>Priorities</h3>
                    <div class="stat-content"></div>
                </div>
                <div class="stat-card" id="due-date-stats">
                    <h3>Due Dates</h3>
                    <div class="stat-content"></div>
                </div>
            </div>
        `;

        // Calculate and render statistics
        this.renderStatusStats(tasks);
        this.renderCategoryStats(tasks);
        this.renderPriorityStats(tasks);
        this.renderDueDateStats(tasks);
    },

    /**
     * Calculate task status statistics
     * @param {Array} tasks - Array of tasks
     * @returns {Object} Status statistics
     */
    calculateStatusStats(tasks) {
        console.log('DEBUG: Calculating status statistics'); // DEBUG

        const completed = tasks.filter(task => task.completed).length;
        const pending = tasks.length - completed;

        const stats = {
            completed,
            pending,
            completionRate: tasks.length > 0 ? (completed / tasks.length) * 100 : 0
        };

        console.log('DEBUG: Status statistics result:', stats); // DEBUG
        return stats;
    },

    /**
     * Render task status statistics
     * @param {Array} tasks - Array of tasks
     */
    renderStatusStats(tasks) {
        const stats = this.calculateStatusStats(tasks);
        const container = document.querySelector('#status-stats .stat-content');

        // Format completion rate to 1 decimal place
        const formattedRate = stats.completionRate.toFixed(1);

        container.innerHTML = `
            <div class="stat-summary">
                <p>Completion Rate: <strong>${formattedRate}%</strong></p>
                <p>Completed: <strong>${stats.completed}</strong></p>
                <p>Pending: <strong>${stats.pending}</strong></p>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar-label">
                    <span>Completed</span>
                    <span>${formattedRate}%</span>
                </div>
                <div class="stat-bar-outer">
                    <div class="stat-bar-inner status-completed" style="width: ${formattedRate}%"></div>
                </div>
            </div>
        `;

        console.log('DEBUG: Rendered status statistics'); // DEBUG
    },

    /**
     * Calculate task category statistics
     * @param {Array} tasks - Array of tasks
     * @returns {Object} Category statistics
     */
    calculateCategoryStats(tasks) {
        console.log('DEBUG: Calculating category statistics'); // DEBUG

        // Count tasks by category
        const categoryCounts = {};

        tasks.forEach(task => {
            const category = task.category || 'Uncategorized';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Convert to array of objects for easier rendering
        const categoryStats = Object.keys(categoryCounts).map(category => ({
            name: category,
            count: categoryCounts[category],
            percentage: (categoryCounts[category] / tasks.length) * 100
        }));

        // Sort by count (descending)
        categoryStats.sort((a, b) => b.count - a.count);

        console.log('DEBUG: Category statistics result:', categoryStats); // DEBUG
        return categoryStats;
    },

    /**
     * Render task category statistics
     * @param {Array} tasks - Array of tasks
     */
    renderCategoryStats(tasks) {
        const stats = this.calculateCategoryStats(tasks);
        const container = document.querySelector('#category-stats .stat-content');

        if (stats.length === 0) {
            container.innerHTML = '<p>No category data available</p>';
            return;
        }

        // Create HTML for category bars
        const categoryBars = stats.map(category => `
            <div class="stat-bar-container">
                <div class="stat-bar-label">
                    <span>${category.name}</span>
                    <span>${category.count} (${category.percentage.toFixed(1)}%)</span>
                </div>
                <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: ${category.percentage}%; background-color: ${this.getCategoryColor(category.name)}"></div>
                </div>
            </div>
        `).join('');

        container.innerHTML = categoryBars;
        console.log('DEBUG: Rendered category statistics'); // DEBUG
    },

    /**
     * Calculate task priority statistics
     * @param {Array} tasks - Array of tasks
     * @returns {Object} Priority statistics
     */
    calculatePriorityStats(tasks) {
        console.log('DEBUG: Calculating priority statistics'); // DEBUG

        // Count tasks by priority
        const priorityCounts = {
            high: 0,
            medium: 0,
            low: 0
        };

        tasks.forEach(task => {
            const priority = task.priority || 'low';
            priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
        });

        // Convert to array of objects for easier rendering
        const priorityStats = Object.keys(priorityCounts).map(priority => ({
            name: priority,
            count: priorityCounts[priority],
            percentage: (priorityCounts[priority] / tasks.length) * 100
        }));

        console.log('DEBUG: Priority statistics result:', priorityStats); // DEBUG
        return priorityStats;
    },

    /**
     * Render task priority statistics
     * @param {Array} tasks - Array of tasks
     */
    renderPriorityStats(tasks) {
        const stats = this.calculatePriorityStats(tasks);
        const container = document.querySelector('#priority-stats .stat-content');

        // Create HTML for priority bars
        const priorityBars = stats.map(priority => `
            <div class="stat-bar-container">
                <div class="stat-bar-label">
                    <span>${priority.name.charAt(0).toUpperCase() + priority.name.slice(1)}</span>
                    <span>${priority.count} (${priority.percentage.toFixed(1)}%)</span>
                </div>
                <div class="stat-bar-outer">
                    <div class="stat-bar-inner priority-${priority.name}" style="width: ${priority.percentage}%"></div>
                </div>
            </div>
        `).join('');

        container.innerHTML = priorityBars;
        console.log('DEBUG: Rendered priority statistics'); // DEBUG
    },

    /**
     * Calculate task due date statistics
     * @param {Array} tasks - Array of tasks
     * @returns {Object} Due date statistics
     */
    calculateDueDateStats(tasks) {
        console.log('DEBUG: Calculating due date statistics'); // DEBUG

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        // Initialize counters
        const dueDateStats = {
            overdue: 0,
            dueToday: 0,
            dueThisWeek: 0,
            dueLater: 0,
            noDueDate: 0
        };

        // Calculate days until end of week
        const daysUntilEndOfWeek = 7 - now.getDay();
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + daysUntilEndOfWeek);

        console.log('DEBUG: Today is:', now.toISOString()); // DEBUG
        console.log('DEBUG: End of week is:', endOfWeek.toISOString()); // DEBUG

        // Categorize tasks by due date
        tasks.forEach(task => {
            if (!task.dueDate) {
                dueDateStats.noDueDate++;
                return;
            }

            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);

            console.log(`DEBUG: Task "${task.title}" due date:`, dueDate.toISOString()); // DEBUG

            if (dueDate < now) {
                dueDateStats.overdue++;
            } else if (dueDate.getTime() === now.getTime()) {
                dueDateStats.dueToday++;
            } else if (dueDate <= endOfWeek) {
                dueDateStats.dueThisWeek++;
            } else {
                dueDateStats.dueLater++;
            }
        });

        // Calculate percentages
        Object.keys(dueDateStats).forEach(key => {
            dueDateStats[key + 'Percentage'] = (dueDateStats[key] / tasks.length) * 100;
        });

        console.log('DEBUG: Due date statistics result:', dueDateStats); // DEBUG
        return dueDateStats;
    },

    /**
     * Render task due date statistics
     * @param {Array} tasks - Array of tasks
     */
    renderDueDateStats(tasks) {
        const stats = this.calculateDueDateStats(tasks);
        const container = document.querySelector('#due-date-stats .stat-content');

        container.innerHTML = `
            <div class="stat-summary">
                <p>Overdue: <strong>${stats.overdue}</strong></p>
                <p>Due Today: <strong>${stats.dueToday}</strong></p>
                <p>Due This Week: <strong>${stats.dueThisWeek}</strong></p>
                <p>Due Later: <strong>${stats.dueLater}</strong></p>
                <p>No Due Date: <strong>${stats.noDueDate}</strong></p>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar-label">
                    <span>Overdue</span>
                    <span>${stats.overdue}</span>
                </div>
                <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: ${stats.overduePercentage}%; background-color: #e74c3c"></div>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar-label">
                    <span>Due Today</span>
                    <span>${stats.dueToday}</span>
                </div>
                <div class="stat-bar-outer">
                    <div class="stat-bar-inner" style="width: ${stats.dueTodayPercentage}%; background-color: #f39c12"></div>
                </div>
            </div>
        `;

        console.log('DEBUG: Rendered due date statistics'); // DEBUG
    },

    /**
     * Get a color for a category
     * @param {string} category - Category name
     * @returns {string} Color hex code
     */
    getCategoryColor(category) {
        // Simple hash function to generate consistent colors for categories
        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            hash = category.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Convert to hex color
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }

        console.log(`DEBUG: Generated color for category "${category}":`, color); // DEBUG
        return color;
    }
};

export default Statistics;
