const https = require('https');

const FRONTEND_URL = 'https://dit-erp-portal.vercel.app';

console.log(`[${new Date().toISOString()}] Probing Vercel Frontend: ${FRONTEND_URL}`);

https.get(FRONTEND_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("-----------------------------------------");
    console.log(`HTTP Status: ${res.statusCode}`);
    console.log(`Title:       ${data.includes('<title>') ? data.split('<title>')[1].split('</title>')[0] : 'No Title'}`);
    process.exit(0);
  });
}).on('error', (err) => {
  console.error(`❌ ERROR: Could not reach Vercel frontend. ${err.message}`);
  process.exit(1);
});
