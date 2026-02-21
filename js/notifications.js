// ============================================
// IN-APP NOTIFICATIONS MODULE
// Uses Appwrite real-time subscriptions
// ============================================

import { client, databases, APPWRITE_CONFIG, showAlert } from '/js/appwrite.js';
import { Query } from 'https://cdn.jsdelivr.net/npm/appwrite@14.0.1/+esm';

let notifications = [];
let unreadCount = 0;
let bellEl = null;
let badgeEl = null;
let panelEl = null;
let isOpen = false;

const statusMessages = {
    pending: { icon: '🕐', text: 'New booking request received' },
    accepted: { icon: '✅', text: 'Booking has been accepted' },
    completed: { icon: '🎉', text: 'Job has been completed' },
    cancelled: { icon: '❌', text: 'Booking has been cancelled' },
    'in-progress': { icon: '🔧', text: 'Job is in progress' }
};

/**
 * Initialize the notification system
 * @param {string} userId - Current user's ID
 * @param {string} role - 'customer' or 'worker'
 */
export function initNotifications(userId, role) {
    createNotificationUI();
    loadExistingNotifications(userId, role);
    subscribeToChanges(userId, role);
}

/** Create the notification bell and dropdown panel */
function createNotificationUI() {
    // Notification bell container
    const container = document.createElement('div');
    container.className = 'notif-container';
    container.innerHTML = `
        <button class="notif-bell" id="notifBell" aria-label="Notifications">
            🔔
            <span class="notif-badge hidden" id="notifBadge">0</span>
        </button>
        <div class="notif-panel hidden" id="notifPanel">
            <div class="notif-panel-header">
                <span class="notif-panel-title">Notifications</span>
                <button class="notif-clear-btn" id="notifClearBtn">Clear all</button>
            </div>
            <div class="notif-list" id="notifList">
                <div class="notif-empty">No notifications yet</div>
            </div>
        </div>
    `;

    // Insert into navbar
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        const navList = navbar.querySelector('.navbar-nav');
        if (navList) {
            navList.parentNode.insertBefore(container, navList);
        } else {
            navbar.appendChild(container);
        }
    }

    bellEl = document.getElementById('notifBell');
    badgeEl = document.getElementById('notifBadge');
    panelEl = document.getElementById('notifPanel');

    // Toggle panel
    bellEl.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        panelEl.classList.toggle('hidden', !isOpen);
        if (isOpen) {
            unreadCount = 0;
            updateBadge();
        }
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !panelEl.contains(e.target) && e.target !== bellEl) {
            isOpen = false;
            panelEl.classList.add('hidden');
        }
    });

    // Clear all
    document.getElementById('notifClearBtn').addEventListener('click', () => {
        notifications = [];
        unreadCount = 0;
        updateBadge();
        renderNotifications();
    });
}

/** Update the badge count */
function updateBadge() {
    if (unreadCount > 0) {
        badgeEl.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badgeEl.classList.remove('hidden');
    } else {
        badgeEl.classList.add('hidden');
    }
}

/** Render notification list */
function renderNotifications() {
    const list = document.getElementById('notifList');
    if (!list) return;

    if (notifications.length === 0) {
        list.innerHTML = '<div class="notif-empty">No notifications yet</div>';
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.unread ? 'notif-unread' : ''}">
            <span class="notif-icon">${n.icon}</span>
            <div class="notif-content">
                <div class="notif-text">${n.message}</div>
                <div class="notif-time">${timeAgo(n.timestamp)}</div>
            </div>
        </div>
    `).join('');
}

/** Add a notification */
function addNotification(icon, message) {
    notifications.unshift({
        icon,
        message,
        timestamp: new Date(),
        unread: true
    });

    // Keep max 20
    if (notifications.length > 20) notifications.pop();

    unreadCount++;
    updateBadge();
    renderNotifications();

    // Show a toast if panel is closed
    if (!isOpen) {
        showAlert(`${icon} ${message}`, 'info');
    }
}

/** Load recent bookings as initial notifications */
async function loadExistingNotifications(userId, role) {
    try {
        const field = role === 'customer' ? 'customerId' : 'workerId';
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collections.bookings,
            [
                Query.equal(field, userId),
                Query.orderDesc('$updatedAt'),
                Query.limit(5)
            ]
        );

        response.documents.forEach(doc => {
            const statusInfo = statusMessages[doc.status] || { icon: '📋', text: 'Booking updated' };
            notifications.push({
                icon: statusInfo.icon,
                message: `${statusInfo.text} — ${doc.serviceCategory.replace('-', ' ')}`,
                timestamp: new Date(doc.$updatedAt),
                unread: false
            });
        });

        renderNotifications();
    } catch (error) {
        console.warn('Could not load existing notifications:', error);
    }
}

/** Subscribe to real-time booking changes */
function subscribeToChanges(userId, role) {
    try {
        const channel = `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collections.bookings}.documents`;

        client.subscribe(channel, (response) => {
            const doc = response.payload;

            // Only process events relevant to this user
            const isRelevant = role === 'customer'
                ? doc.customerId === userId
                : doc.workerId === userId;

            if (!isRelevant) return;

            const events = response.events || [];
            const isUpdate = events.some(e => e.includes('.update'));
            const isCreate = events.some(e => e.includes('.create'));

            if (isCreate) {
                const icon = role === 'worker' ? '📥' : '📤';
                const msg = role === 'worker'
                    ? `New job request — ${doc.serviceCategory.replace('-', ' ')}`
                    : `Booking created — ${doc.serviceCategory.replace('-', ' ')}`;
                addNotification(icon, msg);
            } else if (isUpdate) {
                const statusInfo = statusMessages[doc.status] || { icon: '📋', text: 'Booking updated' };
                addNotification(statusInfo.icon, `${statusInfo.text} — ${doc.serviceCategory.replace('-', ' ')}`);
            }
        });
    } catch (error) {
        console.warn('Could not subscribe to real-time updates:', error);
    }
}

/** Format relative time */
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}
