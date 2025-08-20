"use client";

import {
  FaCheckCircle,
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLFormValidationPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    html5: true,
    javascript: true,
    patterns: true,
    accessibility: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Validation Examples</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1, h2 {
      color: #2c3e50;
    }
    .example {
      margin: 25px 0;
      padding: 20px;
      border-left: 4px solid #3498db;
      background-color: #f8fafc;
      border-radius: 4px;
    }
    form {
      margin: 20px 0;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }
    input, select, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #2980b9;
    }
    .error {
      color: #e74c3c;
      font-size: 14px;
      margin-top: -10px;
      margin-bottom: 15px;
      display: none;
    }
    input:invalid, select:invalid, textarea:invalid {
      border-color: #e74c3c;
    }
    input:valid, select:valid, textarea:valid {
      border-color: #2ecc71;
    }
    .validation-message {
      font-size: 14px;
      margin-top: 5px;
    }
    .valid {
      color: #2ecc71;
    }
    .invalid {
      color: #e74c3c;
    }
    .required::after {
      content: " *";
      color: #e74c3c;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Form Validation Guide</h1>
    <p>Learn different techniques to validate form inputs using HTML and JavaScript.</p>
    
    <!-- Basic HTML5 Validation -->
    <section class="example">
      <h2>Basic HTML5 Validation</h2>
      <form id="basicForm">
        <label for="name" class="required">Name</label>
        <input type="text" id="name" name="name" required>
        <div class="error" id="nameError">Please enter your name</div>
        
        <label for="email" class="required">Email</label>
        <input type="email" id="email" name="email" required>
        <div class="error" id="emailError">Please enter a valid email</div>
        
        <label for="age">Age</label>
        <input type="number" id="age" name="age" min="18" max="120">
        <div class="error" id="ageError">Age must be between 18 and 120</div>
        
        <button type="submit">Submit</button>
      </form>
      
      <script>
        document.getElementById('basicForm').addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Form submitted successfully!');
        });
      </script>
    </section>
    
    <!-- Custom JavaScript Validation -->
    <section class="example">
      <h2>Custom JavaScript Validation</h2>
      <form id="customForm">
        <label for="username" class="required">Username</label>
        <input type="text" id="username" name="username" minlength="4" maxlength="20">
        <div class="error" id="usernameError">Username must be 4-20 characters</div>
        
        <label for="password" class="required">Password</label>
        <input type="password" id="password" name="password" pattern=".{8,}">
        <div class="error" id="passwordError">Password must be at least 8 characters</div>
        
        <label for="confirmPassword" class="required">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword">
        <div class="error" id="confirmPasswordError">Passwords must match</div>
        
        <button type="submit">Register</button>
      </form>
      
      <script>
        const customForm = document.getElementById('customForm');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        customForm.addEventListener('submit', function(e) {
          let isValid = true;
          
          // Validate username
          const username = document.getElementById('username');
          if (username.value.length < 4 || username.value.length > 20) {
            document.getElementById('usernameError').style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('usernameError').style.display = 'none';
          }
          
          // Validate password
          if (password.value.length < 8) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('passwordError').style.display = 'none';
          }
          
          // Validate password match
          if (password.value !== confirmPassword.value) {
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('confirmPasswordError').style.display = 'none';
          }
          
          if (!isValid) {
            e.preventDefault();
          } else {
            alert('Registration successful!');
          }
        });
      </script>
    </section>
    
    <!-- Real-time Validation -->
    <section class="example">
      <h2>Real-time Validation</h2>
      <form id="realtimeForm">
        <label for="creditCard" class="required">Credit Card Number</label>
        <input type="text" id="creditCard" name="creditCard" 
               pattern="[0-9]{13,16}" placeholder="1234 5678 9012 3456">
        <div class="validation-message" id="creditCardMessage"></div>
        
        <label for="expiry" class="required">Expiry Date</label>
        <input type="text" id="expiry" name="expiry" 
               pattern="(0[1-9]|1[0-2])\/[0-9]{2}" placeholder="MM/YY">
        <div class="validation-message" id="expiryMessage"></div>
        
        <button type="submit">Pay Now</button>
      </form>
      
      <script>
        const creditCard = document.getElementById('creditCard');
        const expiry = document.getElementById('expiry');
        
        creditCard.addEventListener('input', function() {
          const message = document.getElementById('creditCardMessage');
          if (this.validity.patternMismatch) {
            message.textContent = 'Please enter a valid credit card number';
            message.className = 'validation-message invalid';
          } else if (this.value === '') {
            message.textContent = '';
          } else {
            message.textContent = 'Valid credit card number';
            message.className = 'validation-message valid';
          }
        });
        
        expiry.addEventListener('input', function() {
          const message = document.getElementById('expiryMessage');
          if (this.validity.patternMismatch) {
            message.textContent = 'Please use MM/YY format';
            message.className = 'validation-message invalid';
          } else if (this.value === '') {
            message.textContent = '';
          } else {
            message.textContent = 'Valid expiry date';
            message.className = 'validation-message valid';
          }
        });
        
        document.getElementById('realtimeForm').addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Payment processed! (demo)');
        });
      </script>
    </section>
    
    <!-- Accessibility Example -->
    <section class="example">
      <h2>Accessible Form Validation</h2>
      <form id="accessibleForm" novalidate>
        <div>
          <label for="fullName" class="required">Full Name</label>
          <input type="text" id="fullName" name="fullName" required
                 aria-describedby="nameHelp nameError">
          <div id="nameHelp" class="validation-message">Enter your full name as it appears on your ID</div>
          <div id="nameError" class="error" role="alert" aria-live="assertive">
            <FaExclamationTriangle /> Please enter your name
          </div>
        </div>
        
        <div>
          <label for="phone" class="required">Phone Number</label>
          <input type="tel" id="phone" name="phone" required
                 pattern="[0-9]{10}" aria-describedby="phoneError">
          <div id="phoneError" class="error" role="alert" aria-live="assertive">
            <FaExclamationTriangle /> Please enter a valid 10-digit phone number
          </div>
        </div>
        
        <button type="submit">Submit</button>
      </form>
      
      <script>
        document.getElementById('accessibleForm').addEventListener('submit', function(e) {
          const fullName = document.getElementById('fullName');
          const phone = document.getElementById('phone');
          let isValid = true;
          
          if (!fullName.value) {
            document.getElementById('nameError').style.display = 'block';
            fullName.setAttribute('aria-invalid', 'true');
            isValid = false;
          } else {
            document.getElementById('nameError').style.display = 'none';
            fullName.setAttribute('aria-invalid', 'false');
          }
          
          if (!phone.value || !phone.validity.valid) {
            document.getElementById('phoneError').style.display = 'block';
            phone.setAttribute('aria-invalid', 'true');
            isValid = false;
          } else {
            document.getElementById('phoneError').style.display = 'none';
            phone.setAttribute('aria-invalid', 'false');
          }
          
          if (!isValid) {
            e.preventDefault();
          } else {
            alert('Form submitted successfully!');
          }
        });
      </script>
    </section>
  </div>
</body>
</html>`;

    try {
      localStorage.setItem("html-code", staticHtmlContent);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const basicValidationExamples = [
    {
      title: "Required Fields",
      description: "Marking fields as required using the required attribute",
      code: `<form>
  <label for="username" class="required">Username</label>
  <input type="text" id="username" name="username" required>
  
  <button type="submit">Submit</button>
</form>

<style>
  .required::after {
    content: " *";
    color: #e74c3c;
  }
</style>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-username" className="block mb-1 font-medium">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="demo-username"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Email Validation",
      description: "Using type='email' for automatic email format validation",
      code: `<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="demo-email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Number Range",
      description: "Setting minimum and maximum values for number inputs",
      code: `<form>
  <label for="age">Age (18-120)</label>
  <input type="number" id="age" name="age" min="18" max="120">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-age" className="block mb-1 font-medium">
              Age (18-120)
            </label>
            <input
              type="number"
              id="demo-age"
              min="18"
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  const html5ValidationExamples = [
    {
      title: "Pattern Matching",
      description: "Using regex patterns for custom validation",
      code: `<form>
  <label for="zipcode">ZIP Code</label>
  <input type="text" id="zipcode" name="zipcode" 
         pattern="[0-9]{5}" title="5-digit ZIP code">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-zipcode" className="block mb-1 font-medium">
              ZIP Code
            </label>
            <input
              type="text"
              id="demo-zipcode"
              pattern="[0-9]{5}"
              title="5-digit ZIP code"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Password Strength",
      description: "Enforcing password complexity with pattern attribute",
      code: `<form>
  <label for="password">Password</label>
  <input type="password" id="password" name="password"
         pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
         title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="demo-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Custom Error Messages",
      description: "Overriding default validation messages",
      code: `<form id="customMessageForm">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" required>
  
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('customMessageForm').addEventListener('invalid', function(e) {
    e.preventDefault();
    if (e.target.id === 'username') {
      e.target.setCustomValidity('Please enter your username');
    }
    e.target.reportValidity();
  }, true);
</script>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-username2" className="block mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              id="demo-username2"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  const javascriptValidationExamples = [
    {
      title: "Password Match",
      description: "Confirm password matches using JavaScript",
      code: `<form id="passwordForm">
  <label for="password">Password</label>
  <input type="password" id="password" name="password" required>
  
  <label for="confirmPassword">Confirm Password</label>
  <input type="password" id="confirmPassword" name="confirmPassword" required>
  <div id="passwordError" class="error-message"></div>
  
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('passwordForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorElement = document.getElementById('passwordError');
    
    if (password.value !== confirmPassword.value) {
      errorElement.textContent = 'Passwords do not match';
      e.preventDefault();
    }
  });
</script>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-password2" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="demo-password2"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="demo-confirm-password"
              className="block mb-1 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="demo-confirm-password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <div id="demo-password-error" className="text-red-500 text-sm mt-1"></div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Real-time Validation",
      description: "Validate inputs as user types",
      code: `<form id="realtimeForm">
  <label for="email">Email</label>
  <input type="email" id="email" name="email">
  <div id="emailMessage" class="validation-message"></div>
  
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('email').addEventListener('input', function() {
    const message = document.getElementById('emailMessage');
    if (this.validity.typeMismatch) {
      message.textContent = 'Please enter a valid email';
      message.className = 'validation-message invalid';
    } else if (this.value === '') {
      message.textContent = '';
    } else {
      message.textContent = 'Valid email';
      message.className = 'validation-message valid';
    }
  });
</script>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-email2" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="demo-email2"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <div id="demo-email-message" className="text-sm mt-1"></div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Custom Validation Logic",
      description: "Implement complex validation rules with JavaScript",
      code: `<form id="complexForm">
  <label for="username">Username</label>
  <input type="text" id="username" name="username">
  <div id="usernameError" class="error-message"></div>
  
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('complexForm').addEventListener('submit', function(e) {
    const username = document.getElementById('username');
    const errorElement = document.getElementById('usernameError');
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    
    if (!usernameRegex.test(username.value)) {
      errorElement.textContent = 'Username must be 4-20 characters and can only contain letters, numbers, and underscores';
      e.preventDefault();
    }
  });
</script>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-username3" className="block mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              id="demo-username3"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <div id="demo-username-error" className="text-red-500 text-sm mt-1"></div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  const patternExamples = [
    {
      title: "Phone Number",
      description: "Validate phone number format",
      code: `<form>
  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" name="phone" 
         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
         placeholder="123-456-7890">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-phone" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="demo-phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Credit Card",
      description: "Validate credit card number format",
      code: `<form>
  <label for="creditcard">Credit Card</label>
  <input type="text" id="creditcard" name="creditcard" 
         pattern="[0-9]{13,16}" 
         placeholder="1234567890123456">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-creditcard" className="block mb-1 font-medium">
              Credit Card
            </label>
            <input
              type="text"
              id="demo-creditcard"
              pattern="[0-9]{13,16}"
              placeholder="1234567890123456"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Date Format",
      description: "Validate date in MM/DD/YYYY format",
      code: `<form>
  <label for="date">Expiration Date (MM/DD/YYYY)</label>
  <input type="text" id="date" name="date" 
         pattern="(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/(19|20)\\d{2}" 
         placeholder="MM/DD/YYYY">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-date" className="block mb-1 font-medium">
              Expiration Date (MM/DD/YYYY)
            </label>
            <input
              type="text"
              id="demo-date"
              pattern="(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}"
              placeholder="MM/DD/YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  const accessibilityExamples = [
    {
      title: "ARIA Attributes",
      description: "Using ARIA for accessible validation messages",
      code: `<form id="ariaForm">
  <label for="username">Username</label>
  <input type="text" id="username" name="username" 
         aria-describedby="usernameError" required>
  <div id="usernameError" role="alert" aria-live="assertive"></div>
  
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('ariaForm').addEventListener('submit', function(e) {
    const username = document.getElementById('username');
    const errorElement = document.getElementById('usernameError');
    
    if (!username.value) {
      username.setAttribute('aria-invalid', 'true');
      errorElement.textContent = 'Username is required';
      e.preventDefault();
    } else {
      username.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
    }
  });
</script>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-username4" className="block mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              id="demo-username4"
              aria-describedby="demo-username4-error"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <div
              id="demo-username4-error"
              role="alert"
              aria-live="assertive"
              className="text-red-500 text-sm mt-1"
            ></div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
    {
      title: "Visual Indicators",
      description: "Combining visual and non-visual cues for validation",
      code: `<form id="visualForm">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" 
         aria-describedby="emailHelp emailError">
  <div id="emailHelp" class="help-text">Enter your email address</div>
  <div id="emailError" role="alert" class="error-message"></div>
  
  <button type="submit">Submit</button>
</form>

<style>
  input:invalid {
    border-color: #e74c3c;
  }
  input:valid {
    border-color: #2ecc71;
  }
  .error-message {
    color: #e74c3c;
  }
  .help-text {
    color: #7f8c8d;
    font-size: 0.875rem;
  }
</style>`,
      preview: (
        <div className="space-y-4">
          <div>
            <label htmlFor="demo-email3" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="demo-email3"
              aria-describedby="demo-email3-help demo-email3-error"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <div id="demo-email3-help" className="text-gray-500 text-sm mt-1">
              Enter your email address
            </div>
            <div
              id="demo-email3-error"
              role="alert"
              className="text-red-500 text-sm mt-1"
            ></div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Form Validation Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to implement client-side form validation using HTML and JavaScript
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-blue-500" />
          Introduction to Form Validation
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Form validation is essential for ensuring data quality and improving user experience.
          HTML5 introduced built-in validation attributes, while JavaScript allows for more
          complex validation logic and better user feedback.
        </p>
        <button
          onClick={handleOpenEditor}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Basic Validation */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCheckCircle className="text-blue-500" />
            Basic Validation
          </h2>
          <button
            onClick={() => toggleSection("basics")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.basics ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.basics && (
          <div className="grid grid-cols-1 gap-6">
            {basicValidationExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HTML5 Validation */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCheckCircle className="text-blue-500" />
            HTML5 Validation Attributes
          </h2>
          <button
            onClick={() => toggleSection("html5")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.html5 ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.html5 && (
          <div className="grid grid-cols-1 gap-6">
            {html5ValidationExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* JavaScript Validation */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            JavaScript Validation
          </h2>
          <button
            onClick={() => toggleSection("javascript")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.javascript ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.javascript && (
          <div className="grid grid-cols-1 gap-6">
            {javascriptValidationExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pattern Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Common Validation Patterns
          </h2>
          <button
            onClick={() => toggleSection("patterns")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.patterns ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.patterns && (
          <div className="grid grid-cols-1 gap-6">
            {patternExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Accessibility */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Accessible Validation
          </h2>
          <button
            onClick={() => toggleSection("accessibility")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.accessibility ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.accessibility && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibilityExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/form-attributes"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/audio"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}