import { Client, Databases, Users } from 'node-appwrite';

// ============================================
// APPWRITE CLOUD FUNCTION: Send Notification
// ============================================
// This function can be triggered from your app to perform
// server-side operations like sending notifications,
// processing data, or executing admin-level actions.
//
// Trigger via:
//   - Appwrite Console (manual)
//   - Appwrite SDK: functions.createExecution('send-notification', JSON.stringify(payload))
//   - Appwrite Events (e.g., on document create/update)
//   - Scheduled CRON jobs
// ============================================

export default async ({ req, res, log, error }) => {
  // Initialize Appwrite client with function's API key
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const databases = new Databases(client);
  const users = new Users(client);

  try {
    // Parse the incoming payload
    const payload = JSON.parse(req.body || '{}');
    const { userId, message, type = 'info' } = payload;

    if (!userId || !message) {
      return res.json({
        success: false,
        error: 'Missing required fields: userId, message',
      }, 400);
    }

    log(`Sending ${type} notification to user: ${userId}`);
    log(`Message: ${message}`);

    // Example: Fetch the user to verify they exist
    const user = await users.get(userId);
    log(`User found: ${user.name} (${user.email})`);

    // ============================================
    // TODO: Add your notification logic here
    // Examples:
    //   - Send an email via a third-party service
    //   - Create a notification document in the database
    //   - Send a push notification
    //   - Send an SMS
    // ============================================

    // Example: Create a notification record in the database
    // await databases.createDocument(
    //   'YOUR_DATABASE_ID',
    //   'notifications',
    //   ID.unique(),
    //   {
    //     userId,
    //     message,
    //     type,
    //     read: false,
    //     createdAt: new Date().toISOString(),
    //   }
    // );

    return res.json({
      success: true,
      message: `Notification sent to ${user.name}`,
    });
  } catch (err) {
    error(`Function error: ${err.message}`);
    return res.json({
      success: false,
      error: err.message,
    }, 500);
  }
};
