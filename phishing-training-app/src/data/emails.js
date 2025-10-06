// Email data for phishing training simulation
export const emailExamples = [
  {
    id: 1,
    subject: "Your Amazon Order Confirmation - Order #123-4567890",
    sender: "orders@amazon.com",
    senderName: "Amazon Orders",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #232F3E; padding: 20px; text-align: center;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style="height: 30px;">
        </div>

        <div style="padding: 20px; background-color: #fff;">
          <h2>Order Confirmation</h2>
          <p>Thank you for shopping with us. Your order has been confirmed and will be shipped soon.</p>

          <div style="border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
            <h3>Order Details:</h3>
            <p><strong>Order #:</strong> 123-4567890</p>
            <p><strong>Total:</strong> $127.43</p>
            <p><strong>Items:</strong> Wireless Bluetooth Headphones</p>
          </div>

          <p>If you have any questions about your order, please visit our help center.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://amazon.com" style="background-color: #FF9900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Track Your Package</a>
          </div>
        </div>

        <div style="background-color: #37475A; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>This email was sent from Amazon.com. If you received this in error, please disregard.</p>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "This is a legitimate Amazon order confirmation email. It has proper branding, clear order details, and comes from an official Amazon domain.",
    difficulty: "easy"
  },
  {
    id: 2,
    subject: "URGENT: Your PayPal Account Has Been Limited",
    sender: "security@paypal-support.com",
    senderName: "PayPal Security Team",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0070ba; padding: 15px; text-align: center;">
          <img src="https://www.paypalobjects.com/webstatic/en_US/i/logo/rebrand/ppcom.svg" alt="PayPal" style="height: 25px;">
        </div>

        <div style="padding: 20px; background-color: #fff; border: 2px solid #ff0000;">
          <h2 style="color: #ff0000;">⚠️ ACCOUNT SECURITY ALERT ⚠️</h2>
          <p>Dear Valued Customer,</p>
          <p>We have detected unusual activity on your PayPal account. To prevent unauthorized access, we have temporarily limited your account functionality.</p>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0;">
            <p><strong>What you need to do:</strong></p>
            <ol>
              <li>Verify your account information</li>
              <li>Update your security settings</li>
              <li>Confirm your recent transactions</li>
            </ol>
          </div>

          <p>Failure to verify your account within 24 hours may result in permanent suspension.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://paypal-secure.com/verify" style="background-color: #0070ba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">VERIFY ACCOUNT NOW</a>
          </div>
        </div>

        <div style="background-color: #003087; color: white; padding: 15px; text-align: center; font-size: 11px;">
          <p>© 2024 PayPal, Inc. All rights reserved.</p>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "This is a phishing email! The sender domain 'paypal-support.com' is suspicious (real PayPal uses 'paypal.com'). It creates urgency and asks you to click a link to 'verify' your account, which is a common phishing tactic.",
    difficulty: "easy"
  },
  {
    id: 3,
    subject: "Congratulations! You've Won $1,000,000!",
    sender: "winners@national-lottery.org",
    senderName: "National Lottery Commission",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 20px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🎉 CONGRATULATIONS! 🎉</h1>
        </div>

        <div style="padding: 30px; background-color: #fff; text-align: center;">
          <h2>You Are Our Lucky Winner!</h2>
          <p style="font-size: 18px; color: #28a745;">You have been selected as the winner of <strong>$1,000,000</strong> in our National Lottery!</p>

          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Your Winning Numbers:</strong> 7-14-21-28-35-42</p>
            <p><strong>Draw Date:</strong> October 5, 2024</p>
            <p><strong>Prize Amount:</strong> $1,000,000.00</p>
          </div>

          <p>To claim your prize, you must contact our claims agent within 7 days.</p>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0;">
            <p><strong>Claims Agent:</strong> Mr. John Smith</p>
            <p><strong>Email:</strong> claims@lottery-winner.com</p>
            <p><strong>Phone:</strong> +1-555-0123</p>
          </div>

          <p>Provide your full name, address, and phone number to begin the claims process.</p>

          <div style="margin-top: 30px;">
            <a href="mailto:claims@lottery-winner.com?subject=Prize Claim" style="background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">Claim Your Prize Now!</a>
          </div>
        </div>

        <div style="background-color: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>National Lottery Commission - Official Winner Notification</p>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "This is definitely a phishing scam! Real lotteries don't notify winners via email for large prizes, and they never ask for personal information to claim winnings. The sender domain and contact information are suspicious.",
    difficulty: "easy"
  },
  {
    id: 4,
    subject: "Security Update Required - Action Needed",
    sender: "no-reply@bankofamerica.com",
    senderName: "Bank of America Security",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0033A0; padding: 15px; text-align: center;">
          <img src="https://www.bankofamerica.com/content/dam/boa-images/static-images/logos/boa_logo.svg" alt="Bank of America" style="height: 25px;">
        </div>

        <div style="padding: 25px; background-color: #fff;">
          <h2>Important Security Update</h2>
          <p>Dear Valued Customer,</p>
          <p>We are implementing enhanced security measures to protect your online banking experience. As part of this update, we require all customers to verify their account information.</p>

          <div style="background-color: #e7f3ff; border-left: 4px solid #0033A0; padding: 15px; margin: 20px 0;">
            <p><strong>What's Changing:</strong></p>
            <ul>
              <li>Enhanced encryption for all transactions</li>
              <li>New two-factor authentication requirements</li>
              <li>Updated security protocols</li>
            </ul>
          </div>

          <p>Please click the link below to complete the security update process. This will take less than 2 minutes.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://secure.bankofamerica.com/update-security" style="background-color: #0033A0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Complete Security Update</a>
          </div>

          <p style="font-size: 12px; color: #666;">If you do not complete this update within 48 hours, your online banking access may be temporarily suspended.</p>
        </div>

        <div style="background-color: #0033A0; color: white; padding: 15px; text-align: center; font-size: 11px;">
          <p>Bank of America, N.A. Member FDIC. © 2024 Bank of America Corporation.</p>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "This is a legitimate security update email from Bank of America. It uses proper branding, comes from an official domain, and provides clear information about the security changes without asking for sensitive information.",
    difficulty: "medium"
  },
  {
    id: 5,
    subject: "Your Netflix Subscription Will Be Cancelled",
    sender: "billing@netflix-support.com",
    senderName: "Netflix Billing Department",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000000; padding: 20px; text-align: center;">
          <img src="https://assets.nflxext.com/us/ffe/logos/netflix-logo.png" alt="Netflix" style="height: 30px;">
        </div>

        <div style="padding: 20px; background-color: #fff; border: 2px solid #ff0000;">
          <h2 style="color: #ff0000;">⚠️ SUBSCRIPTION ALERT ⚠️</h2>
          <p>Hello,</p>
          <p>We were unable to process your recent payment for your Netflix subscription. Your account will be suspended in 24 hours if payment is not updated.</p>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0;">
            <p><strong>Payment Issue:</strong> Credit card expired</p>
            <p><strong>Amount Due:</strong> $15.99</p>
            <p><strong>Due Date:</strong> October 7, 2024</p>
          </div>

          <p>Your billing information needs to be updated immediately to avoid service interruption.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://netflix-billing.com/update-payment" style="background-color: #e50914; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">UPDATE PAYMENT METHOD</a>
          </div>
        </div>

        <div style="background-color: #000000; color: white; padding: 15px; text-align: center; font-size: 11px;">
          <p>Netflix - Watch unlimited movies and TV shows</p>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "This is a phishing email! The sender domain 'netflix-support.com' is fake (Netflix uses 'netflix.com'). The link goes to a suspicious third-party domain instead of Netflix's official site.",
    difficulty: "medium"
  },
  {
    id: 6,
    subject: "Package Delivery Update - Signature Required",
    sender: "ups-delivery@ups.com",
    senderName: "UPS Package Services",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #8B4513; padding: 15px; text-align: center;">
          <img src="https://www.ups.com/assets/resources/images/ups-logo.svg" alt="UPS" style="height: 25px;">
        </div>

        <div style="padding: 20px; background-color: #fff;">
          <h2>Package Delivery Update</h2>
          <p>Dear Customer,</p>
          <p>We have an important package that requires your signature for delivery.</p>

          <div style="background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; margin: 20px 0;">
            <p><strong>Tracking Number:</strong> 1Z999AA1234567890</p>
            <p><strong>Delivery Address:</strong> 123 Main St, Anytown, ST 12345</p>
            <p><strong>Delivery Date:</strong> October 6, 2024</p>
          </div>

          <p>Due to the value of this package, we require additional verification before delivery can be completed.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ups.com/track-package" style="background-color: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Confirm Delivery Details</a>
          </div>

          <p>If you have any questions, please contact UPS Customer Service at 1-800-PICK-UPS.</p>
        </div>

        <div style="background-color: #8B4513; color: white; padding: 15px; text-align: center; font-size: 11px;">
          <p>United Parcel Service - Worldwide Shipping Services</p>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "This is a legitimate UPS notification. It uses proper branding, provides specific tracking information, and directs users to the official UPS website for confirmation.",
    difficulty: "medium"
  }
];

export const getRandomEmail = () => {
  return emailExamples[Math.floor(Math.random() * emailExamples.length)];
};

export const getEmailsByDifficulty = (difficulty) => {
  return emailExamples.filter(email => email.difficulty === difficulty);
};

// Advanced phishing examples for higher levels
export const advancedEmailExamples = [
  {
    id: 7,
    subject: "CEO Request - Urgent Wire Transfer",
    sender: "ceo@company-exec.com",
    senderName: "David Wilson - CEO",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Urgent: Wire Transfer Request</h2>

          <p>Hi Team,</p>
          <p>I need you to process an urgent wire transfer immediately. This is a time-sensitive business matter that requires your immediate attention.</p>

          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p><strong>Transfer Details:</strong></p>
            <p><strong>Bank:</strong> International Commerce Bank</p>
            <p><strong>Account:</strong> *******4789</p>
            <p><strong>Routing:</strong> 123456789</p>
            <p><strong>Amount:</strong> $45,670.00</p>
            <p><strong>Purpose:</strong> Vendor Payment - Confidential</p>
          </div>

          <p>Please confirm receipt and completion of this transfer within the next 30 minutes.</p>

          <p>Best regards,<br>David Wilson<br><em>Chief Executive Officer</em></p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:ceo@company-exec.com?subject=Wire Transfer Confirmation" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reply to Confirm</a>
          </div>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "This is a business email compromise (BEC) scam! The sender domain 'company-exec.com' is suspicious and doesn't match the company's official domain. Real CEOs rarely request wire transfers via email, especially with such urgency.",
    difficulty: "hard"
  },
  {
    id: 8,
    subject: "Your Apple ID Has Been Accessed From a New Device",
    sender: "security@apple-id.com",
    senderName: "Apple Security Alert",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #000000; padding: 15px; text-align: center;">
          <img src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" alt="Apple" style="height: 25px; filter: brightness(0) invert(1);">
        </div>

        <div style="padding: 25px; background-color: #fff;">
          <h2 style="color: #333;">Security Alert: New Device Sign-In</h2>

          <p>Dear Apple Customer,</p>

          <p>We detected a new sign-in to your Apple ID from an unrecognized device. If this was you, no action is required. If this wasn't you, your account may be at risk.</p>

          <div style="background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; margin: 20px 0;">
            <p><strong>Sign-In Details:</strong></p>
            <p><strong>Time:</strong> October 6, 2024 at 3:42 PM</p>
            <p><strong>Location:</strong> New York, NY</p>
            <p><strong>Device:</strong> iPhone 15 Pro</p>
            <p><strong>Browser:</strong> Safari Mobile</p>
          </div>

          <p>If you don't recognize this activity, please secure your account immediately.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://apple-id-security.com/verify" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Secure Your Account</a>
          </div>

          <p style="font-size: 12px; color: #666; margin-top: 20px;">This is an automated security notification. Please do not reply to this email.</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 11px; color: #666;">
          <p>Apple Inc. © 2024. All rights reserved.</p>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "This is a sophisticated phishing email! While it looks legitimate, the link goes to 'apple-id-security.com' instead of Apple's official domain (apple.com). The sender domain is also suspicious.",
    difficulty: "hard"
  },
  {
    id: 9,
    subject: "Weekly Team Meeting - Calendar Invite",
    sender: "calendar@company.com",
    senderName: "Company Calendar System",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4285f4; padding: 15px; text-align: center;">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" style="height: 20px; filter: brightness(0) invert(1);">
        </div>

        <div style="padding: 20px; background-color: #fff;">
          <h2>📅 Calendar Invitation</h2>

          <p>You have been invited to a new event:</p>

          <div style="background-color: #f8f9fa; border-left: 4px solid #4285f4; padding: 15px; margin: 20px 0;">
            <h3>Weekly Team Standup</h3>
            <p><strong>When:</strong> October 7, 2024 at 10:00 AM - 11:00 AM</p>
            <p><strong>Where:</strong> Conference Room A</p>
            <p><strong>Organizer:</strong> Sarah Johnson - Team Lead</p>
            <p><strong>Description:</strong> Regular weekly team sync to discuss project updates and blockers.</p>
          </div>

          <p>Please respond to this invitation at your earliest convenience.</p>

          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 30px;">
            <a href="https://calendar.google.com/accept" style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Accept</a>
            <a href="https://calendar.google.com/decline" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Decline</a>
            <a href="https://calendar.google.com/tentative" style="background-color: #ffc107; color: #212529; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Maybe</a>
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 11px; color: #666;">
          <p>Google Calendar - Manage your time better</p>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "This is a legitimate calendar invitation from Google Calendar. It uses proper branding, clear event details, and provides appropriate response options. The links go to legitimate Google Calendar domains.",
    difficulty: "easy"
  },
  {
    id: 10,
    subject: "Invoice #INV-2024-5678 from TechCorp Solutions",
    sender: "billing@techcorp-solutions.com",
    senderName: "TechCorp Solutions Billing",
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">TechCorp Solutions</h1>
        </div>

        <div style="padding: 25px; background-color: #fff;">
          <h2>Invoice</h2>

          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div>
              <p><strong>Bill To:</strong><br>Acme Corporation<br>123 Business Ave<br>Suite 100<br>Business City, BC 12345</p>
            </div>
            <div style="text-align: right;">
              <p><strong>Invoice #:</strong> INV-2024-5678</p>
              <p><strong>Date:</strong> October 1, 2024</p>
              <p><strong>Due Date:</strong> October 31, 2024</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Description</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Qty</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Unit Price</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 12px;">Software Development Services - September 2024</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">1</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$5,500.00</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$5,500.00</td>
              </tr>
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 12px;">System Maintenance & Support</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">1</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$850.00</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$850.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td colspan="3" style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Total:</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$6,350.00</td>
              </tr>
            </tfoot>
          </table>

          <p>Payment is due within 30 days of the invoice date. Please remit payment to:</p>

          <div style="background-color: #e7f3ff; padding: 15px; margin: 15px 0;">
            <p><strong>Payment Methods:</strong></p>
            <p>• Bank Transfer: Account #123456789, Routing #987654321</p>
            <p>• Check: Mail to TechCorp Solutions, PO Box 12345, Business City, BC 12345</p>
            <p>• Credit Card: Call (555) 123-4567 to pay over phone</p>
          </div>

          <p>Thank you for your business!</p>

          <p>Best regards,<br>Billing Department<br>TechCorp Solutions</p>
        </div>

        <div style="background-color: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 11px;">
          <p>TechCorp Solutions - Innovative Technology Solutions</p>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "This is a legitimate business invoice. It contains proper business formatting, detailed line items, clear payment instructions, and professional presentation. The sender domain matches the company name.",
    difficulty: "medium"
  }
];

// Combine all emails
export const allEmails = [...emailExamples, ...advancedEmailExamples];

export const getRandomEmailAdvanced = () => {
  return allEmails[Math.floor(Math.random() * allEmails.length)];
};