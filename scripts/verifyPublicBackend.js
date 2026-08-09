const https = require('https');

const API_BASE_URL = 'https://dicbo-api-staging.onrender.com/';

console.log(`[${new Date().toISOString()}] Probing Render Backend Base: ${API_BASE_URL}`);

https.get(API_BASE_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("-----------------------------------------");
    console.log(`HTTP Status: ${res.statusCode}`);
    console.log(`Response:    ${data || 'Empty'}`);
    process.exit(0);
  });
}).on('error', (err) => {
  console.error(`❌ ERROR: Could not reach Render API. ${err.message}`);
  process.exit(1);
});
