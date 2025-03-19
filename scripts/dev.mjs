import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start Python Flask server
const flaskServer = spawn('python', [path.join(__dirname, '../server.py')], {
  stdio: 'inherit',
});

// Start Next.js dev server
const nextServer = spawn('npm', ['run', 'next:dev'], {
  stdio: 'inherit',
});

// Handle process termination
process.on('SIGINT', () => {
  flaskServer.kill();
  nextServer.kill();
  process.exit();
});

console.log('🚀 Development servers started');
console.log('🔸 Next.js: http://localhost:3000');
console.log('🔸 Flask API: http://localhost:5000');
console.log('📌 Press Ctrl+C to stop both servers'); 