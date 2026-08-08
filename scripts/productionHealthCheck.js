const http = require('http');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1'; // Force local loopback

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/status',
  method: 'GET',
  timeout: 5000
};

console.log(`[${new Date().toISOString()}] Starting Production Health Check on http://${HOST}:${PORT}...`);

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const status = JSON.parse(data);
      console.log("-----------------------------------------");
      console.log(`Server Status:   ${status.server === 'running' ? '✅ ONLINE' : '❌ FAILED'}`);
      console.log(`Database Status: ${status.database === 'connected' ? '✅ CONNECTED' : '❌ DISCONNECTED'}`);
      console.log(`Environment:     ${(process.env.NODE_ENV || 'production').toUpperCase()}`);
      console.log("-----------------------------------------");

      if (status.server !== 'running' || status.database !== 'connected') {
        process.exit(1);
      }
      process.exit(0);
    } catch (e) {
      console.error(`❌ FAILED: Invalid response format from server.`);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ CRITICAL: Could not reach the API. ${e.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('❌ FAILED: Connection timed out.');
  req.destroy();
  process.exit(1);
});

req.end();
