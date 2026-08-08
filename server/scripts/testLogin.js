const testLogins = async () => {
  const credentials = [
    { email: "admin@dicbo.com", password: "password123", role: "Administrator" },
    { email: "teacher@dicbo.com", password: "password123", role: "Teacher" },
    { email: "finance@dicbo.com", password: "password123", role: "Finance" }
  ];

  for (const cred of credentials) {
    try {
      console.log(`Testing login for ${cred.role} (${cred.email})...`);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        console.log(`✅ Login SUCCESSFUL for ${cred.email}`);
        console.log(`Token received: ${data.token.substring(0, 20)}...`);
      } else {
        console.log(`❌ Login FAILED for ${cred.email}: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ Login FAILED for ${cred.email}: ${error.message}`);
    }
    console.log("-----------------------------------");
  }
};

testLogins();
