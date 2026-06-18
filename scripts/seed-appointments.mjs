import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// 1. Simple .env parser to read MONGODB_URI without external dependencies
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

// 2. Define Schema locally in the script to avoid esm/astro compile issues in node
const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    service: { type: String, required: true },
    preferredDate: { type: Date, required: false },
    preferredTime: { type: String, required: false },
    message: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

const sampleAppointments = [
  {
    name: 'Sarah Connor',
    phone: '+1 (555) 019-9281',
    email: 'sarah.connor@example.com',
    service: 'Aligners Treatment Planning',
    preferredDate: new Date('2026-06-25'),
    preferredTime: '10:00 AM',
    message: 'Need general consultation for clear aligners treatment duration.',
    status: 'pending',
    notes: ''
  },
  {
    name: 'Bruce Wayne',
    phone: '+1 (555) 044-3912',
    email: 'bruce.wayne@example.com',
    service: 'Clear Aligners Designing',
    preferredDate: new Date('2026-06-26'),
    preferredTime: '02:30 PM',
    message: 'Requesting 3D scans design review.',
    status: 'confirmed',
    notes: 'Patient requested afternoon appointment specifically.'
  },
  {
    name: 'Clark Kent',
    phone: '+1 (555) 098-1234',
    email: 'clark.kent@example.com',
    service: 'Clear Aligners Manufacturing',
    preferredDate: new Date('2026-06-27'),
    preferredTime: '11:15 AM',
    message: 'Pick up aligner trays for step 3 to 10.',
    status: 'completed',
    notes: 'Trays successfully printed and handed over.'
  },
  {
    name: 'Diana Prince',
    phone: '+1 (555) 077-8822',
    email: 'diana.prince@example.com',
    service: 'Outsourcing Treatment Planning',
    preferredDate: new Date('2026-06-28'),
    preferredTime: '09:00 AM',
    message: 'Urgent planning case.',
    status: 'cancelled',
    notes: 'Cancelled due to patient traveling schedule.'
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Successfully connected to database.');

    console.log('Clearing existing appointments...');
    await Appointment.deleteMany({});
    console.log('Database cleared.');

    console.log('Inserting sample appointments...');
    await Appointment.insertMany(sampleAppointments);
    console.log('Successfully seeded 4 sample appointments!');

  } catch (err) {
    console.error('Error during database seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
