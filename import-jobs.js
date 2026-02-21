import { Client, Databases, ID } from 'node-appwrite';
import fs from 'fs';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT')
    .setProject('YOUR_PROJECT_ID')
    .setKey('YOUR_API_KEY');

const databases = new Databases(client);

const jobs = JSON.parse(fs.readFileSync('./demo-jobs-worker-a1.json', 'utf8'));

async function importJobs() {
    for (const job of jobs) {
        try {
            await databases.createDocument(
                'YOUR_DATABASE_ID',
                'YOUR_BOOKINGS_COLLECTION_ID',
                ID.unique(),
                job
            );
            console.log(`✅ Added: ${job.serviceType}`);
        } catch (error) {
            console.error(`❌ Failed: ${job.serviceType}`, error.message);
        }
    }
    console.log('\\n🎉 Import complete!');
}

importJobs();