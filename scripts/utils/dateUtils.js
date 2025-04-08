/**
 * Date Utility Functions for CommitTracker
 * Provides helper functions for date handling
 */

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, options = {}) {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const mergedOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat('en-US', mergedOptions).format(date);
}

/**
 * Check if a date is in the past
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if date is in the past
 */
export function isDateInPast(dateString) {
    if (!dateString) return false;

    const date = new Date(dateString);
    const today = new Date();

    // Reset time part for comparison
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate < today;
}

/**
 * Check if a date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if date is today
 */
export function isDateToday(dateString) {
    if (!dateString) return false;

    const date = new Date(dateString);
    const today = new Date();

    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

/**
 * Get relative time description (e.g., "2 days ago", "in 3 days")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time description
 */
export function getRelativeTimeDescription(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Tomorrow';
    } else if (diffDays === -1) {
        return 'Yesterday';
    } else if (diffDays > 0) {
        return `In ${diffDays} days`;
    } else {
        return `${Math.abs(diffDays)} days ago`;
    }
}

/**
 * Convert a local date string (YYYY-MM-DD) to ISO format
 * @param {string} localDateString - Date string in YYYY-MM-DD format
 * @returns {string} ISO date string
 */
export function toISODateString(localDateString) {
    if (!localDateString) return '';

    // Create a date object and get ISO string
    const date = new Date(localDateString);
    return date.toISOString();
}

/**
 * Convert an ISO date string to local date format (YYYY-MM-DD)
 * @param {string} isoDateString - ISO date string
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function toLocalDateString(isoDateString) {
    if (!isoDateString) return '';

    const date = new Date(isoDateString);

    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
}
