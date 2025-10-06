// Game State
let currentEmailIndex = 0;
let score = 0;
let correctAnswers = 0;
let totalEmails = 0;
let gameEmails = [];
let userAnswers = [];

// Email Database - Mix of legitimate and phishing emails
const emailDatabase = [
    // Legitimate Emails
    {
        type: 'legitimate',
        from: 'notifications@github.com',
        to: 'student@university.edu',
        subject: 'Your pull request has been merged',
        date: 'Today, 2:30 PM',
        body: `Hi there,

Your pull request #42 "Fix login validation bug" has been successfully merged into the main branch of the repository "student-portal".

Repository: university/student-portal
Branch: main
Commit: a1b2c3d4

You can view the changes at: https://github.com/university/student-portal/pull/42

Thanks for your contribution!

Best regards,
The GitHub Team`,
        hint: 'Check the sender domain and the professional tone of the message.',
        explanation: 'This is a legitimate GitHub notification. The sender domain matches GitHub\'s official domain, the content is relevant to a specific action, and the tone is professional.',
        redFlags: [],
        greenFlags: ['Official GitHub domain', 'Specific repository details', 'Professional formatting', 'No urgent call to action']
    },
    
    // Phishing Email - Fake Bank Alert
    {
        type: 'phishing',
        from: 'security-alert@bankofamerica-security.net',
        to: 'student@university.edu',
        subject: 'URGENT: Suspicious Activity Detected - Verify Account NOW',
        date: 'Today, 11:45 AM',
        body: `Dear Valued Customer,

We have detected suspicious activity on your Bank of America account. Your account will be SUSPENDED in 24 hours unless you verify your identity immediately.

Suspicious transactions detected:
- $2,500 withdrawal from ATM in Nigeria
- $850 online purchase from unknown merchant

CLICK HERE TO VERIFY YOUR ACCOUNT: http://bankofamerica-verify-security.net/login

If you do not verify within 24 hours, your account will be permanently closed and funds may be frozen.

Act now to protect your account!

Bank of America Security Team
Customer ID: BOA-7829-XYZ`,
        hint: 'Look carefully at the sender domain and the urgent tone of the message.',
        explanation: 'This is a phishing email. The domain "bankofamerica-security.net" is not Bank of America\'s official domain. Real banks never ask for account verification via email links.',
        redFlags: ['Fake domain (not bankofamerica.com)', 'Creates false urgency', 'Asks to click suspicious link', 'Threatens account closure', 'Poor grammar in places'],
        greenFlags: []
    },

    // Legitimate Email - University Announcement
    {
        type: 'legitimate',
        from: 'registrar@university.edu',
        to: 'student@university.edu',
        subject: 'Fall 2024 Registration Opens Monday',
        date: 'Yesterday, 4:15 PM',
        body: `Dear Students,

Fall 2024 course registration will open on Monday, March 18th at 8:00 AM EST.

Important reminders:
• Meet with your academic advisor before registering
• Check for any holds on your account
• Priority registration is based on credit hours completed
• Add/drop period ends on September 6th

To register for courses, log into the student portal at: https://portal.university.edu

If you have questions, contact the Registrar's Office at (555) 123-4567 or visit us in the Student Services Building, Room 201.

Best regards,
Office of the Registrar
University Academic Affairs`,
        hint: 'Notice the official university domain and the informational nature of the content.',
        explanation: 'This is a legitimate university email. It comes from the official university domain, provides useful information without urgency, and includes proper contact information.',
        redFlags: [],
        greenFlags: ['Official university domain', 'Informational content', 'Proper contact information', 'No suspicious links', 'Professional tone']
    },

    // Phishing Email - Fake PayPal
    {
        type: 'phishing',
        from: 'service@paypal-security.com',
        to: 'student@university.edu',
        subject: 'Action Required: Confirm Your PayPal Account',
        date: 'Today, 9:22 AM',
        body: `Hello,

We've noticed some unusual activity on your PayPal account and need to verify your information to ensure your security.

Recent activity includes:
- Login attempt from unknown device
- Payment of $299.99 to "TechStore Online"

To maintain access to your account, please confirm your details by clicking the link below:

VERIFY ACCOUNT: http://paypal-verification.secure-login.net

Failure to verify within 48 hours will result in account limitation.

Thank you for using PayPal.

PayPal Customer Service`,
        hint: 'Examine the sender domain carefully and consider PayPal\'s actual security practices.',
        explanation: 'This is a phishing email. PayPal\'s official domain is paypal.com, not paypal-security.com. PayPal never asks users to verify accounts through email links.',
        redFlags: ['Fake domain (not paypal.com)', 'Suspicious verification link', 'Creates urgency with threats', 'Vague "unusual activity"'],
        greenFlags: []
    },

    // Legitimate Email - Course Reminder
    {
        type: 'legitimate',
        from: 'prof.johnson@university.edu',
        to: 'student@university.edu',
        subject: 'CS 301 - Assignment 3 Due Tomorrow',
        date: 'Today, 1:10 PM',
        body: `Hi Class,

Just a friendly reminder that Assignment 3 (Database Design Project) is due tomorrow (Friday) by 11:59 PM.

Submission guidelines:
- Submit via the course LMS
- Include both your ER diagram and SQL scripts
- Name your files: LastName_FirstName_Assignment3

Office hours today: 2:00 PM - 4:00 PM in Room 305
If you have questions, feel free to stop by or email me.

Good luck!

Dr. Sarah Johnson
Computer Science Department
Office: Tech Building, Room 305
Email: prof.johnson@university.edu`,
        hint: 'This comes from a professor at your university with specific course information.',
        explanation: 'This is a legitimate email from a university professor. It uses the official university domain, contains specific course information, and has a helpful, educational tone.',
        redFlags: [],
        greenFlags: ['Official university domain', 'Specific course details', 'Professional signature', 'Educational content', 'Helpful tone']
    },

    // Phishing Email - Fake Microsoft
    {
        type: 'phishing',
        from: 'security@microsoft-account-team.com',
        to: 'student@university.edu',
        subject: 'Microsoft Account Security Alert - Immediate Action Required',
        date: 'Today, 7:33 AM',
        body: `Microsoft Account Security Team

We detected a sign-in attempt to your Microsoft account from an unrecognized device.

Location: Moscow, Russia
Device: Unknown Windows PC
Time: March 15, 2024 3:22 AM

If this wasn't you, your account may be compromised. Secure your account immediately:

SECURE MY ACCOUNT → http://microsoft-security-center.net/verify

This link expires in 2 hours for your security.

Microsoft will never ask for your password via email, but we may ask you to verify your identity through our secure portal.

Microsoft Account Team
One Microsoft Way, Redmond, WA`,
        hint: 'Check if this is really from Microsoft and examine the verification link.',
        explanation: 'This is a phishing email. Microsoft\'s official domain is microsoft.com, not microsoft-account-team.com. The verification link leads to a suspicious domain.',
        redFlags: ['Fake domain (not microsoft.com)', 'Suspicious verification link', 'Creates false urgency', 'Time pressure tactics'],
        greenFlags: []
    },

    // Legitimate Email - Library Notice
    {
        type: 'legitimate',
        from: 'library@university.edu',
        to: 'student@university.edu',
        subject: 'Books Due Soon - Renewal Available',
        date: 'Yesterday, 10:30 AM',
        body: `Dear Library Patron,

You have 2 books due in 3 days. You can renew them online if needed.

Books due March 18, 2024:
1. "Introduction to Algorithms" - Call #: QA76.6 .C662 2009
2. "Database System Concepts" - Call #: QA76.9.D3 S5513 2020

To renew your books:
• Visit our website: https://library.university.edu
• Call us: (555) 123-BOOK (2665)
• Visit the circulation desk

Library hours this week:
Monday-Thursday: 7 AM - 11 PM
Friday: 7 AM - 8 PM
Weekend: 10 AM - 6 PM

University Library Staff`,
        hint: 'This is a standard library notification with specific book information.',
        explanation: 'This is a legitimate library email. It comes from the official university library, contains specific book details, and provides multiple contact options.',
        redFlags: [],
        greenFlags: ['Official university domain', 'Specific book details', 'Multiple contact methods', 'No urgent action required', 'Informational content']
    },

    // Phishing Email - Fake Amazon
    {
        type: 'phishing',
        from: 'account-update@amazon-security.org',
        to: 'student@university.edu',
        subject: 'Your Amazon Account Has Been Locked',
        date: 'Today, 5:47 PM',
        body: `Dear Amazon Customer,

Your Amazon account has been temporarily locked due to suspicious activity detected on March 15, 2024.

Suspicious Activity Detected:
• Multiple failed login attempts
• Unusual purchasing pattern
• Account accessed from new location

Your account will be permanently suspended unless you verify your information within 24 hours.

UNLOCK YOUR ACCOUNT: http://amazon-account-verification.net/unlock

Please provide the following information to verify your identity:
- Full name and address
- Credit card information
- Social Security Number (for identity verification)

Amazon Customer Service
Note: This is an automated message. Please do not reply to this email.`,
        hint: 'Look at the sender domain and what information they\'re requesting.',
        explanation: 'This is a phishing email. Amazon\'s domain is amazon.com, not amazon-security.org. Amazon never asks for SSN or full credit card info via email.',
        redFlags: ['Fake domain (not amazon.com)', 'Requests sensitive information (SSN, credit card)', 'Threatens permanent suspension', 'Suspicious verification link'],
        greenFlags: []
    },

    // Legitimate Email - IT Department
    {
        type: 'legitimate',
        from: 'it-support@university.edu',
        to: 'student@university.edu',
        subject: 'Scheduled Network Maintenance - March 20th',
        date: 'Today, 12:15 PM',
        body: `Dear Campus Community,

The IT Department will perform scheduled network maintenance on Wednesday, March 20th from 2:00 AM to 6:00 AM.

During this time, you may experience:
• Intermittent internet connectivity
• Temporary unavailability of online services
• Slower network speeds

Services affected:
- Student portal
- Email systems
- Library databases
- Wi-Fi networks

We apologize for any inconvenience. Emergency IT support will be available at (555) 123-HELP.

For updates, visit: https://it.university.edu/maintenance

IT Support Team
University Technology Services
Help Desk: (555) 123-4357
Email: it-support@university.edu`,
        hint: 'This is an informational notice from the university IT department.',
        explanation: 'This is a legitimate IT maintenance notice. It comes from the official university IT department, provides specific details, and includes proper contact information.',
        redFlags: [],
        greenFlags: ['Official university domain', 'Specific maintenance details', 'Professional contact information', 'Informational purpose', 'No action required from users']
    },

    // Phishing Email - Fake Netflix
    {
        type: 'phishing',
        from: 'billing@netflix-support.net',
        to: 'student@university.edu',
        subject: 'Netflix Payment Failed - Update Billing Information',
        date: 'Today, 3:28 PM',
        body: `Hello Netflix Member,

We were unable to process your monthly payment for your Netflix subscription.

Your account will be suspended in 24 hours unless you update your payment information.

Account Details:
- Plan: Premium (4 screens, Ultra HD)
- Monthly fee: $15.99
- Last payment attempt: March 15, 2024

UPDATE PAYMENT METHOD: http://netflix-billing-update.com/payment

To avoid service interruption, please update your billing information immediately.

If you believe this is an error, contact our support team.

Netflix Billing Team
www.netflix.com`,
        hint: 'Check the sender domain and consider Netflix\'s actual billing practices.',
        explanation: 'This is a phishing email. Netflix\'s official domain is netflix.com, not netflix-support.net. The billing update link goes to a suspicious domain.',
        redFlags: ['Fake domain (not netflix.com)', 'Suspicious billing link', 'Creates urgency with suspension threat', 'Requests payment information update'],
        greenFlags: []
    }
];

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize game
function initializeGame() {
    // Shuffle emails and take first 10
    gameEmails = shuffleArray(emailDatabase).slice(0, 10);
    totalEmails = gameEmails.length;
    currentEmailIndex = 0;
    score = 0;
    correctAnswers = 0;
    userAnswers = [];
    
    updateUI();
}

// Update UI elements
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('current-email').textContent = currentEmailIndex + 1;
    document.getElementById('total-emails').textContent = totalEmails;
    
    // Update progress bar
    const progress = ((currentEmailIndex) / totalEmails) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // Update level
    const level = getLevelFromScore(score);
    document.getElementById('level').textContent = level;
}

// Get level based on score
function getLevelFromScore(score) {
    if (score >= 900) return 'Expert';
    if (score >= 700) return 'Advanced';
    if (score >= 500) return 'Intermediate';
    if (score >= 300) return 'Novice';
    return 'Beginner';
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start training
function startTraining() {
    initializeGame();
    showScreen('training-screen');
    loadCurrentEmail();
}

// Load current email
function loadCurrentEmail() {
    if (currentEmailIndex >= gameEmails.length) {
        showResults();
        return;
    }
    
    const email = gameEmails[currentEmailIndex];
    
    // Update email content
    document.getElementById('email-from').textContent = email.from;
    document.getElementById('email-to').textContent = email.to;
    document.getElementById('email-subject').textContent = email.subject;
    document.getElementById('email-date').textContent = email.date;
    document.getElementById('email-body').innerHTML = email.body.replace(/\n/g, '<br>');
    
    // Handle attachments if any
    const attachmentsContainer = document.getElementById('email-attachments');
    if (email.attachments && email.attachments.length > 0) {
        const attachmentsList = document.getElementById('attachments-list');
        attachmentsList.innerHTML = '';
        email.attachments.forEach(attachment => {
            const attachmentDiv = document.createElement('div');
            attachmentDiv.className = 'attachment-item';
            attachmentDiv.innerHTML = `<i class="fas fa-file"></i> ${attachment}`;
            attachmentsList.appendChild(attachmentDiv);
        });
        attachmentsContainer.style.display = 'block';
    } else {
        attachmentsContainer.style.display = 'none';
    }
    
    // Reset hint
    document.getElementById('hint-content').style.display = 'none';
    document.getElementById('hint-btn').style.display = 'inline-flex';
    
    updateUI();
}

// Show hint
function showHint() {
    const email = gameEmails[currentEmailIndex];
    const hintContent = document.getElementById('hint-content');
    hintContent.innerHTML = `<strong>Hint:</strong> ${email.hint}`;
    hintContent.style.display = 'block';
    document.getElementById('hint-btn').style.display = 'none';
}

// Make decision
function makeDecision(decision) {
    const email = gameEmails[currentEmailIndex];
    const isCorrect = decision === email.type;
    
    // Calculate points
    let points = 0;
    if (isCorrect) {
        points = 100;
        correctAnswers++;
        // Bonus points for not using hint
        if (document.getElementById('hint-content').style.display === 'none') {
            points += 50; // Bonus for not using hint
        }
    }
    
    score += points;
    
    // Store user answer
    userAnswers.push({
        email: email,
        userDecision: decision,
        correct: isCorrect,
        points: points
    });
    
    // Show feedback
    showFeedback(isCorrect, email, decision);
}

// Show feedback modal
function showFeedback(isCorrect, email, userDecision) {
    const modal = document.getElementById('feedback-modal');
    const icon = modal.querySelector('.feedback-icon');
    const title = modal.querySelector('.feedback-title');
    const message = modal.querySelector('.feedback-message');
    const explanation = modal.querySelector('.feedback-explanation');
    
    if (isCorrect) {
        icon.className = 'feedback-icon fas fa-check-circle';
        icon.style.color = '#48bb78';
        title.textContent = 'Correct!';
        title.style.color = '#48bb78';
        message.textContent = 'Great job! You correctly identified this email.';
    } else {
        icon.className = 'feedback-icon fas fa-times-circle';
        icon.style.color = '#f56565';
        title.textContent = 'Incorrect';
        title.style.color = '#f56565';
        message.textContent = `This email was actually ${email.type}.`;
    }
    
    // Build explanation
    let explanationHTML = `<strong>Explanation:</strong><br>${email.explanation}<br><br>`;
    
    if (email.redFlags.length > 0) {
        explanationHTML += '<strong>🚩 Red Flags:</strong><br>';
        email.redFlags.forEach(flag => {
            explanationHTML += `• ${flag}<br>`;
        });
        explanationHTML += '<br>';
    }
    
    if (email.greenFlags.length > 0) {
        explanationHTML += '<strong>✅ Green Flags:</strong><br>';
        email.greenFlags.forEach(flag => {
            explanationHTML += `• ${flag}<br>`;
        });
    }
    
    explanation.innerHTML = explanationHTML;
    
    modal.classList.add('active');
}

// Next email
function nextEmail() {
    document.getElementById('feedback-modal').classList.remove('active');
    currentEmailIndex++;
    loadCurrentEmail();
}

// Show results
function showResults() {
    const accuracy = Math.round((correctAnswers / totalEmails) * 100);
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = `${correctAnswers}/${totalEmails}`;
    document.getElementById('accuracy-percentage').textContent = `${accuracy}%`;
    
    // Show achievements
    const achievements = getAchievements(score, accuracy, correctAnswers);
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    achievements.forEach(achievement => {
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.innerHTML = `<i class="${achievement.icon}"></i> ${achievement.name}`;
        achievementsList.appendChild(badge);
    });
    
    showScreen('results-screen');
}

// Get achievements based on performance
function getAchievements(score, accuracy, correct) {
    const achievements = [];
    
    if (correct === totalEmails) {
        achievements.push({ name: 'Perfect Score!', icon: 'fas fa-trophy' });
    }
    
    if (accuracy >= 90) {
        achievements.push({ name: 'Sharp Eye', icon: 'fas fa-eye' });
    }
    
    if (accuracy >= 80) {
        achievements.push({ name: 'Security Conscious', icon: 'fas fa-shield-alt' });
    }
    
    if (score >= 800) {
        achievements.push({ name: 'Phishing Expert', icon: 'fas fa-graduation-cap' });
    }
    
    if (score >= 600) {
        achievements.push({ name: 'Cyber Defender', icon: 'fas fa-user-shield' });
    }
    
    // Check if user didn't use hints much
    let hintsUsed = 0;
    userAnswers.forEach(answer => {
        if (answer.points < 150) hintsUsed++; // Less than full points means hint was used
    });
    
    if (hintsUsed <= 2) {
        achievements.push({ name: 'Independent Learner', icon: 'fas fa-brain' });
    }
    
    if (achievements.length === 0) {
        achievements.push({ name: 'Getting Started', icon: 'fas fa-seedling' });
    }
    
    return achievements;
}

// Restart training
function restartTraining() {
    startTraining();
}

// Show tips
function showTips() {
    showScreen('tips-screen');
}

// Show welcome screen
function showWelcome() {
    showScreen('welcome-screen');
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    showScreen('welcome-screen');
});

// Close modal when clicking outside
document.getElementById('feedback-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        nextEmail();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const activeScreen = document.querySelector('.screen.active');
    
    if (activeScreen && activeScreen.id === 'training-screen') {
        if (e.key === '1' || e.key === 'l' || e.key === 'L') {
            makeDecision('legitimate');
        } else if (e.key === '2' || e.key === 'p' || e.key === 'P') {
            makeDecision('phishing');
        } else if (e.key === 'h' || e.key === 'H') {
            showHint();
        }
    }
    
    if (document.getElementById('feedback-modal').classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            nextEmail();
        }
    }
});