import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Root pages
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),

        // Admin pages
        adminDashboard: resolve(__dirname, 'admin/dashboard.html'),
        adminWorkers: resolve(__dirname, 'admin/workers.html'),
        adminCustomers: resolve(__dirname, 'admin/customers.html'),
        adminBookings: resolve(__dirname, 'admin/bookings.html'),
        adminServices: resolve(__dirname, 'admin/services.html'),
        adminAnalytics: resolve(__dirname, 'admin/analytics.html'),

        // Customer pages
        customerDashboard: resolve(__dirname, 'customer/dashboard.html'),
        customerServices: resolve(__dirname, 'customer/services.html'),
        customerBooking: resolve(__dirname, 'customer/booking.html'),
        customerHistory: resolve(__dirname, 'customer/history.html'),
        customerProfile: resolve(__dirname, 'customer/profile.html'),

        // Worker pages
        workerDashboard: resolve(__dirname, 'worker/dashboard.html'),
        workerJobs: resolve(__dirname, 'worker/jobs.html'),
        workerProfile: resolve(__dirname, 'worker/profile.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
});
