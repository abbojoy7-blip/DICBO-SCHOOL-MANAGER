const https = require('https');

const API_BASE_URL = 'https://dicbo-api-staging.onrender.com/';

console.log(`[${new Date().toISOString()}] Verifying Public Backend: ${API_BASE_URL}`);

https.get(API_BASE_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const status = JSON.parse(data);
      console.log("-----------------------------------------");
      console.log(`HTTP Status:     ${res.statusCode}`);
      console.log(`Response:        ${status.message}`);
      console.log(`Version:         ${status.version}`);
      console.log("-----------------------------------------");
      process.exit(0);
    } catch (e) {
      console.error(`❌ FAILED: Invalid response from Render backend.`);
      console.log("Response data:", data);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error(`❌ CRITICAL: Render backend unreachable: ${err.message}`);
  process.exit(1);
});
