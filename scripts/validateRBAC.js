const http = require('http');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const roles = [
  { role: 'administrator', permissions: ['students', 'fees', 'reports', 'settings', 'staff'] },
  { role: 'teacher', permissions: ['students', 'attendance', 'exams'], restricted: ['fees', 'settings', 'staff'] },
  { role: 'accountant', permissions: ['fees', 'hr/payroll', 'reports'], restricted: ['settings', 'staff'] },
];

const generateToken = (role, schoolId = '66b1a1a1a1a1a1a1a1a1a1a1') => {
  return jwt.sign(
    { id: 'user_id_123', role, schoolId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const testAccess = (token, endpoint) => {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: `/api/${endpoint}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      resolve({ status: res.statusCode, allowed: res.statusCode < 400 });
    });

    req.on('error', () => resolve({ status: 500, allowed: false }));
    req.end();
  });
};

const validate = async () => {
  console.log("--- STARTING FINAL RBAC VERIFICATION ---");

  for (const roleData of roles) {
    console.log(`\nTesting Role: ${roleData.role.toUpperCase()}`);
    const token = generateToken(roleData.role);

    for (const perm of roleData.permissions) {
      const result = await testAccess(token, perm);
      const pass = result.allowed || result.status === 404;
      console.log(`  [PERMITTED] ${perm.padEnd(12)}: ${pass ? '✅ PASS' : '❌ FAIL'} (Status: ${result.status})`);
    }

    if (roleData.restricted) {
      for (const rest of roleData.restricted) {
        const result = await testAccess(token, rest);
        const pass = !result.allowed && (result.status === 403 || result.status === 401);
        console.log(`  [RESTRICTED] ${rest.padEnd(11)}: ${pass ? '✅ PASS' : '❌ FAIL'} (Status: ${result.status})`);
      }
    }
  }

  console.log("\n--- RBAC VERIFICATION COMPLETE ---");
};

validate();
