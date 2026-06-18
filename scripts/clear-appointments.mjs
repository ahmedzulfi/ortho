import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// 1. Simple .env parser to read MONGODB_URI
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found. Please make sure it exists in the root directory.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx > 0) {
    const key = trimmed.substring(0, eqIdx).trim();
    let val = trimmed.substring(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

const uri = env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not defined in your .env file.');
  process.exit(1);
}

// 2. Define Schema locally to avoid import issues
const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  service: String,
  preferredDate: Date,
  preferredTime: String,
  message: String,
  status: String,
  notes: String,
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

async function clearData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Successfully connected to database.');

    console.log('Clearing all appointments from database...');
    const result = await Appointment.deleteMany({});
    console.log(`Successfully cleared ${result.deletedCount} appointments!`);
  } catch (err) {
    console.error('Error clearing database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

clearData();
