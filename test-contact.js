// Test script to verify EmailJS configuration
// Run with: node test-contact.js

const testData = {
  firstName: "Test",
  lastName: "User", 
  email: "test@example.com",
  phone: "+254700000000",
  service: "Web Development",
  message: "This is a test message from the contact form."
};

console.log("🧪 Test Contact Form Data:");
console.log("Name:", testData.firstName, testData.lastName);
console.log("Email:", testData.email);
console.log("Phone:", testData.phone);
console.log("Service:", testData.service);
console.log("Message:", testData.message);
console.log("\n✅ Use this data to test your contact form once EmailJS is configured!");