// ============================================
// APPWRITE SDK INITIALIZATION
// ============================================

import { Client, Account, Databases, Storage, Functions, Query } from 'https://cdn.jsdelivr.net/npm/appwrite@14.0.1/+esm';

// ============================================
// CONFIGURATION
// Replace these with your Appwrite project details
// ============================================
const APPWRITE_CONFIG = {
  endpoint: 'https://sgp.cloud.appwrite.io/v1', // Your Appwrite endpoint
  projectId: '699164be00203d3d1b34', // Replace with your project ID
  databaseId: '699172230026429d954f', // Your database ID
  collections: {
    users: 'users',
    workers: 'workers',
    customers: 'customers',
    bookings: 'bookings',
    services: 'services',
    auditLogs: 'audit-logs'
  },
  buckets: {
    idProofs: 'id-proofs',
    qrCodes: 'qr-codes'
  },
  razorpayKeyId: 'rzp_test_REPLACE_WITH_YOUR_KEY' // Replace with your Razorpay Key ID
};

// ============================================
// INITIALIZE APPWRITE CLIENT
// ============================================
const client = new Client();
client
  .setEndpoint(APPWRITE_CONFIG.endpoint)
  .setProject(APPWRITE_CONFIG.projectId);

// ============================================
// INITIALIZE SERVICES
// ============================================
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);

// ============================================
// EXPORT CONFIGURATION AND SERVICES
// ============================================
export {
  client,
  account,
  databases,
  storage,
  functions,
  APPWRITE_CONFIG,
  Query
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    console.error('No active session:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Get user role from database
 */
export async function getUserRole(userId) {
  try {
    const response = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collections.users,
      [
        Query.equal('userId', userId)
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0].role;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}

/**
 * Redirect to appropriate dashboard based on role
 */
export async function redirectToDashboard(role) {
  const dashboards = {
    customer: '/customer/dashboard.html',
    worker: '/worker/dashboard.html',
    admin: '/admin/dashboard.html'
  };

  const dashboard = dashboards[role];
  if (dashboard) {
    window.location.href = dashboard;
  } else {
    console.error('Invalid role:', role);
  }
}

/**
 * Logout user
 */
export async function logout() {
  try {
    await account.deleteSession('current');
    window.location.href = '/index.html';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Show loading overlay
 */
export function showLoading(message = 'Loading...') {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.id = 'loading-overlay';
  overlay.innerHTML = `
    <div class="spinner"></div>
    <p style="color: var(--color-text-secondary); font-size: 1.1rem;">${message}</p>
  `;
  document.body.appendChild(overlay);
}

/**
 * Hide loading overlay
 */
export function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}

/**
 * Show alert message
 */
export function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} animate-fade-in`;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '10001';
  alertDiv.style.minWidth = '300px';
  alertDiv.innerHTML = message;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.opacity = '0';
    setTimeout(() => alertDiv.remove(), 300);
  }, 4000);
}
