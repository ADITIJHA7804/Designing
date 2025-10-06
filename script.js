// Game State
let gameState = {
    currentDifficulty: null,
    currentEmailIndex: 0,
    score: 0,
    level: 1,
    streak: 0,
    maxStreak: 0,
    totalEmails: 10,
    emails: [],
    usedHints: 0,
    correctAnswers: 0
};

// Email Database
const emailDatabase = {
    beginner: [
        {
            id: 1,
            isPhishing: true,
            sender: "Security Team",
            senderEmail: "security@amazom.com", // Notice the typo
            subject: "URGENT: Your account will be suspended!",
            time: "2 minutes ago",
            body: `
                <p>Dear Customer,</p>
                <p>We have detected suspicious activity on your account. Your Amazon account will be suspended in 24 hours unless you verify your information immediately.</p>
                <p><strong>Click here to verify your account:</strong> <a href="http://amazom-verification.com">http://amazom-verification.com</a></p>
                <p>If you don't act now, your account will be permanently closed.</p>
                <p>Best regards,<br>Amazon Security Team</p>
            `,
            explanation: [
                "The sender email has a typo: 'amazom.com' instead of 'amazon.com'",
                "Creates false urgency with 'URGENT' and '24 hours' deadline",
                "Uses threatening language about account suspension",
                "The verification link goes to a suspicious domain",
                "Legitimate companies don't ask for immediate verification via email links"
            ],
            hints: [
                "Check the sender's email address carefully",
                "Look for spelling mistakes in the domain name",
                "Notice the urgent and threatening tone"
            ]
        },
        {
            id: 2,
            isPhishing: false,
            sender: "Netflix",
            senderEmail: "info@netflix.com",
            subject: "Your monthly subscription is ready",
            time: "1 hour ago",
            body: `
                <p>Hi there,</p>
                <p>Your Netflix subscription will renew automatically on March 15th, 2024 for $15.99/month.</p>
                <p>You can manage your subscription or cancel anytime by logging into your account at netflix.com</p>
                <p>Thanks for being a Netflix member!</p>
                <p>The Netflix Team</p>
            `,
            explanation: [
                "Uses the official Netflix domain (netflix.com)",
                "Provides clear information about billing",
                "No urgent action required",
                "Professional and friendly tone",
                "Gives legitimate options to manage the account"
            ],
            hints: [
                "Check if the sender domain matches the company",
                "Look for professional, non-threatening language",
                "Notice there's no urgent call to action"
            ]
        },
        {
            id: 3,
            isPhishing: true,
            sender: "Apple Support",
            senderEmail: "support@apple-security.org",
            subject: "Your iCloud storage is full - Action Required",
            time: "30 minutes ago",
            body: `
                <p>Hello,</p>
                <p>Your iCloud storage is 100% full. You won't be able to receive new photos or documents.</p>
                <p>To continue using iCloud, please upgrade your storage plan now:</p>
                <p><a href="http://apple-upgrade-storage.com">Upgrade Storage Now</a></p>
                <p>This is your final warning before data loss occurs.</p>
                <p>Apple Support</p>
            `,
            explanation: [
                "Uses a suspicious domain 'apple-security.org' instead of 'apple.com'",
                "Creates false urgency with 'final warning' and 'data loss'",
                "The upgrade link goes to a non-Apple domain",
                "Legitimate Apple emails would come from 'apple.com' or 'icloud.com'",
                "Uses scare tactics to pressure immediate action"
            ],
            hints: [
                "Verify the sender's domain is official",
                "Check if the links go to the real company website",
                "Look for scare tactics and false urgency"
            ]
        },
        {
            id: 4,
            isPhishing: false,
            sender: "Google",
            senderEmail: "noreply@accounts.google.com",
            subject: "Security alert: New sign-in to your Google Account",
            time: "15 minutes ago",
            body: `
                <p>Hi there,</p>
                <p>We noticed a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything.</p>
                <p>If this wasn't you, please secure your account immediately:</p>
                <p><a href="https://myaccount.google.com/security">Secure your account</a></p>
                <p>Google Security Team</p>
            `,
            explanation: [
                "Uses the official Google domain (accounts.google.com)",
                "Provides helpful information without pressure",
                "Gives clear options for both scenarios",
                "Professional and informative tone",
                "The security link goes to the real Google domain"
            ],
            hints: [
                "Check the sender domain carefully",
                "Look for helpful, non-threatening language",
                "Verify that links go to official company domains"
            ]
        }
    ],
    intermediate: [
        {
            id: 5,
            isPhishing: true,
            sender: "Microsoft Office 365",
            senderEmail: "noreply@office365-microsoft.com",
            subject: "Document shared with you - Review Required",
            time: "45 minutes ago",
            body: `
                <p>Hello,</p>
                <p>John Smith has shared a document with you titled "Q4 Financial Report".</p>
                <p>Please review and provide your feedback by clicking the link below:</p>
                <p><a href="http://office365-document-share.com/view/abc123">View Document</a></p>
                <p>This document contains sensitive information and requires your immediate attention.</p>
                <p>Microsoft Office 365 Team</p>
            `,
            explanation: [
                "Uses a suspicious domain 'office365-microsoft.com' instead of 'microsoft.com'",
                "Creates false urgency with 'immediate attention'",
                "The document link goes to a non-Microsoft domain",
                "Legitimate Office 365 emails come from 'microsoft.com' or 'office.com'",
                "Uses social engineering by mentioning a specific person and document"
            ],
            hints: [
                "Check if the sender domain matches the company's official domain",
                "Look for suspicious links that don't match the company",
                "Notice the social engineering tactics"
            ]
        },
        {
            id: 6,
            isPhishing: false,
            sender: "PayPal",
            senderEmail: "service@paypal.com",
            subject: "Your payment of $29.99 has been processed",
            time: "1 hour ago",
            body: `
                <p>Hello,</p>
                <p>Your payment of $29.99 to Spotify Premium has been successfully processed.</p>
                <p>Transaction ID: PP-123456789</p>
                <p>You can view your transaction history at: <a href="https://www.paypal.com/myaccount">PayPal Account</a></p>
                <p>If you didn't make this payment, please contact us immediately.</p>
                <p>PayPal Security</p>
            `,
            explanation: [
                "Uses the official PayPal domain (paypal.com)",
                "Provides specific transaction details",
                "Gives clear instructions for verification",
                "Professional and informative tone",
                "Includes legitimate contact information"
            ],
            hints: [
                "Verify the sender domain is official",
                "Look for specific transaction details",
                "Check that links go to the real company website"
            ]
        },
        {
            id: 7,
            isPhishing: true,
            sender: "LinkedIn",
            senderEmail: "updates@linkedin-professional.net",
            subject: "You have 3 new connection requests",
            time: "2 hours ago",
            body: `
                <p>Hi,</p>
                <p>You have 3 new connection requests waiting for your approval.</p>
                <p>View your pending connections:</p>
                <p><a href="http://linkedin-connections.net/pending">View Requests</a></p>
                <p>Don't miss out on these professional networking opportunities!</p>
                <p>LinkedIn Team</p>
            `,
            explanation: [
                "Uses a suspicious domain 'linkedin-professional.net' instead of 'linkedin.com'",
                "The connection link goes to a non-LinkedIn domain",
                "Legitimate LinkedIn emails come from 'linkedin.com'",
                "Uses social pressure with 'Don't miss out'",
                "The domain structure is designed to look official but isn't"
            ],
            hints: [
                "Check the sender domain carefully",
                "Verify that links go to the official company website",
                "Look for domains that try to mimic the real company"
            ]
        },
        {
            id: 8,
            isPhishing: false,
            sender: "Spotify",
            senderEmail: "no-reply@spotify.com",
            subject: "Your weekly playlist is ready",
            time: "3 hours ago",
            body: `
                <p>Hey there,</p>
                <p>Your personalized weekly playlist "Discover Weekly" is ready with 30 new songs we think you'll love!</p>
                <p>Listen now: <a href="https://open.spotify.com/playlist/37i9dQZEVXcJZyENOWUFo">Discover Weekly</a></p>
                <p>Happy listening!</p>
                <p>The Spotify Team</p>
            `,
            explanation: [
                "Uses the official Spotify domain (spotify.com)",
                "Provides a legitimate Spotify link",
                "Friendly and casual tone appropriate for the brand",
                "No urgent action required",
                "Matches the user's expected communication from Spotify"
            ],
            hints: [
                "Check if the sender domain matches the company",
                "Look for legitimate links to the company's services",
                "Notice the appropriate tone for the brand"
            ]
        }
    ],
    expert: [
        {
            id: 9,
            isPhishing: true,
            sender: "IT Department",
            senderEmail: "it-support@company-internal.com",
            subject: "Password Policy Update - Action Required",
            time: "1 hour ago",
            body: `
                <p>Dear Employee,</p>
                <p>Due to recent security incidents, we're updating our password policy. All employees must update their passwords by end of business today.</p>
                <p>Please click the link below to update your password:</p>
                <p><a href="http://company-password-update.com/verify">Update Password</a></p>
                <p>Failure to comply will result in account suspension.</p>
                <p>IT Security Team</p>
            `,
            explanation: [
                "Uses a generic 'company-internal.com' domain that could be fake",
                "Creates false urgency with 'end of business today'",
                "Uses threatening language about account suspension",
                "The password update link goes to a suspicious domain",
                "Legitimate IT departments would use the company's official domain",
                "Uses authority and fear to pressure immediate action"
            ],
            hints: [
                "Verify the sender domain is your company's official domain",
                "Look for suspicious links that don't match your company",
                "Notice the threatening tone and false urgency"
            ]
        },
        {
            id: 10,
            isPhishing: false,
            sender: "GitHub",
            senderEmail: "noreply@github.com",
            subject: "Security alert: New SSH key added to your account",
            time: "30 minutes ago",
            body: `
                <p>Hi there,</p>
                <p>A new SSH key was added to your GitHub account on March 10, 2024 at 2:30 PM UTC.</p>
                <p>If you added this key, you can safely ignore this email.</p>
                <p>If you didn't add this key, please secure your account immediately:</p>
                <p><a href="https://github.com/settings/keys">Review SSH keys</a></p>
                <p>GitHub Security Team</p>
            `,
            explanation: [
                "Uses the official GitHub domain (github.com)",
                "Provides specific details about the security event",
                "Gives clear instructions for both scenarios",
                "Professional and helpful tone",
                "The security link goes to the real GitHub domain"
            ],
            hints: [
                "Check the sender domain is official",
                "Look for specific security event details",
                "Verify that security links go to the real company website"
            ]
        },
        {
            id: 11,
            isPhishing: true,
            sender: "Bank of America",
            senderEmail: "alerts@bankofamerica-security.com",
            subject: "Suspicious transaction detected on your account",
            time: "20 minutes ago",
            body: `
                <p>Dear Valued Customer,</p>
                <p>We detected a suspicious transaction of $1,250.00 on your account. This transaction appears to be unauthorized.</p>
                <p>To protect your account, please verify your identity immediately:</p>
                <p><a href="http://bankofamerica-verify-account.com">Verify Account</a></p>
                <p>If you don't verify within 30 minutes, your account will be frozen.</p>
                <p>Bank of America Security</p>
            `,
            explanation: [
                "Uses a suspicious domain 'bankofamerica-security.com' instead of 'bankofamerica.com'",
                "Creates extreme urgency with '30 minutes' deadline",
                "Uses threatening language about account freezing",
                "The verification link goes to a non-Bank of America domain",
                "Legitimate bank emails would come from the official bank domain",
                "Uses fear and urgency to pressure immediate action"
            ],
            hints: [
                "Check the sender domain carefully - banks use their official domain",
                "Look for suspicious links that don't match the bank's website",
                "Notice the extreme urgency and threatening language"
            ]
        },
        {
            id: 12,
            isPhishing: false,
            sender: "Dropbox",
            senderEmail: "no-reply@dropbox.com",
            subject: "Your file has been shared with you",
            time: "1 hour ago",
            body: `
                <p>Hi,</p>
                <p>Sarah Johnson shared a file with you: "Project Proposal Q1 2024.pdf"</p>
                <p>You can view and download the file here:</p>
                <p><a href="https://www.dropbox.com/s/abc123/project-proposal.pdf">View File</a></p>
                <p>This file will be available for 30 days.</p>
                <p>The Dropbox Team</p>
            `,
            explanation: [
                "Uses the official Dropbox domain (dropbox.com)",
                "Provides specific file sharing details",
                "Gives clear information about file availability",
                "Professional and helpful tone",
                "The file link goes to the real Dropbox domain"
            ],
            hints: [
                "Check the sender domain is official",
                "Look for legitimate file sharing links",
                "Notice the professional and helpful tone"
            ]
        }
    ]
};

// DOM Elements
const elements = {
    welcomeScreen: document.getElementById('welcome-screen'),
    gameScreen: document.getElementById('game-screen'),
    resultsScreen: document.getElementById('results-screen'),
    finalResultsScreen: document.getElementById('final-results-screen'),
    
    // Welcome screen
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    startBtn: document.getElementById('start-game'),
    
    // Game screen
    score: document.getElementById('score'),
    level: document.getElementById('level'),
    streak: document.getElementById('streak'),
    progressFill: document.getElementById('progress-fill'),
    currentEmail: document.getElementById('current-email'),
    totalEmails: document.getElementById('total-emails'),
    senderAvatar: document.getElementById('sender-avatar'),
    senderName: document.getElementById('sender-name'),
    senderEmail: document.getElementById('sender-email'),
    emailTime: document.getElementById('email-time'),
    emailSubject: document.getElementById('email-subject'),
    emailBody: document.getElementById('email-body'),
    phishingBtn: document.getElementById('phishing-btn'),
    legitimateBtn: document.getElementById('legitimate-btn'),
    hintBtn: document.getElementById('hint-btn'),
    hintContent: document.getElementById('hint-content'),
    hintText: document.getElementById('hint-text'),
    
    // Results screen
    resultIcon: document.getElementById('result-icon'),
    resultTitle: document.getElementById('result-title'),
    resultMessage: document.getElementById('result-message'),
    explanation: document.getElementById('explanation'),
    explanationType: document.getElementById('explanation-type'),
    explanationList: document.getElementById('explanation-list'),
    baseScore: document.getElementById('base-score'),
    streakBonus: document.getElementById('streak-bonus'),
    hintPenalty: document.getElementById('hint-penalty'),
    totalScore: document.getElementById('total-score'),
    nextBtn: document.getElementById('next-btn'),
    
    // Final results screen
    finalScore: document.getElementById('final-score'),
    finalAccuracy: document.getElementById('final-accuracy'),
    maxStreak: document.getElementById('max-streak'),
    achievementList: document.getElementById('achievement-list'),
    restartBtn: document.getElementById('restart-btn'),
    newDifficultyBtn: document.getElementById('new-difficulty-btn')
};

// Initialize the game
function init() {
    setupEventListeners();
    updateUI();
}

// Set up event listeners
function setupEventListeners() {
    // Difficulty selection
    elements.difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.level));
    });
    
    // Start game
    elements.startBtn.addEventListener('click', startGame);
    
    // Game actions
    elements.phishingBtn.addEventListener('click', () => makeGuess(true));
    elements.legitimateBtn.addEventListener('click', () => makeGuess(false));
    elements.hintBtn.addEventListener('click', showHint);
    
    // Navigation
    elements.nextBtn.addEventListener('click', nextEmail);
    elements.restartBtn.addEventListener('click', restartGame);
    elements.newDifficultyBtn.addEventListener('click', () => showScreen('welcome'));
}

// Select difficulty level
function selectDifficulty(level) {
    gameState.currentDifficulty = level;
    
    // Update UI
    elements.difficultyBtns.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.level === level) {
            btn.classList.add('selected');
        }
    });
    
    elements.startBtn.disabled = false;
}

// Start the game
function startGame() {
    if (!gameState.currentDifficulty) return;
    
    // Reset game state
    gameState.currentEmailIndex = 0;
    gameState.score = 0;
    gameState.level = 1;
    gameState.streak = 0;
    gameState.maxStreak = 0;
    gameState.usedHints = 0;
    gameState.correctAnswers = 0;
    
    // Load emails for selected difficulty
    gameState.emails = [...emailDatabase[gameState.currentDifficulty]];
    gameState.totalEmails = gameState.emails.length;
    
    // Shuffle emails
    shuffleArray(gameState.emails);
    
    // Update UI
    updateUI();
    loadCurrentEmail();
    showScreen('game');
}

// Load current email
function loadCurrentEmail() {
    const email = gameState.emails[gameState.currentEmailIndex];
    
    // Update email display
    elements.senderAvatar.textContent = email.sender.charAt(0).toUpperCase();
    elements.senderName.textContent = email.sender;
    elements.senderEmail.textContent = email.senderEmail;
    elements.emailTime.textContent = email.time;
    elements.emailSubject.textContent = email.subject;
    elements.emailBody.innerHTML = email.body;
    
    // Update progress
    const progress = ((gameState.currentEmailIndex + 1) / gameState.totalEmails) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.currentEmail.textContent = gameState.currentEmailIndex + 1;
    elements.totalEmails.textContent = gameState.totalEmails;
    
    // Reset hint
    elements.hintContent.style.display = 'none';
    elements.hintBtn.disabled = false;
    elements.hintBtn.textContent = 'Get Hint (-10 points)';
}

// Make a guess
function makeGuess(isPhishing) {
    const email = gameState.emails[gameState.currentEmailIndex];
    const isCorrect = email.isPhishing === isPhishing;
    
    // Calculate score
    let baseScore = 10;
    let streakBonus = Math.floor(gameState.streak / 3) * 5;
    let hintPenalty = gameState.usedHints * 10;
    let totalScore = baseScore + streakBonus - hintPenalty;
    
    if (!isCorrect) {
        totalScore = 0;
        gameState.streak = 0;
    } else {
        gameState.score += totalScore;
        gameState.streak++;
        gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
        gameState.correctAnswers++;
    }
    
    // Update level based on score
    gameState.level = Math.floor(gameState.score / 100) + 1;
    
    // Show results
    showResults(email, isCorrect, baseScore, streakBonus, hintPenalty, totalScore);
}

// Show results
function showResults(email, isCorrect, baseScore, streakBonus, hintPenalty, totalScore) {
    // Update result display
    elements.resultIcon.className = `result-icon ${isCorrect ? 'correct' : 'incorrect'}`;
    elements.resultIcon.innerHTML = `<i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>`;
    elements.resultTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    elements.resultMessage.textContent = isCorrect ? 
        'Great job! You identified this email correctly.' : 
        'Not quite right. Let\'s learn from this mistake.';
    
    // Update explanation
    elements.explanationType.textContent = email.isPhishing ? 'phishing' : 'legitimate';
    elements.explanationList.innerHTML = '';
    email.explanation.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        elements.explanationList.appendChild(li);
    });
    
    // Update score breakdown
    elements.baseScore.textContent = `+${baseScore}`;
    elements.streakBonus.textContent = `+${streakBonus}`;
    elements.hintPenalty.textContent = `-${hintPenalty}`;
    elements.totalScore.textContent = `+${totalScore}`;
    
    // Show results screen
    showScreen('results');
}

// Show hint
function showHint() {
    const email = gameState.emails[gameState.currentEmailIndex];
    const hintIndex = Math.floor(Math.random() * email.hints.length);
    
    elements.hintText.textContent = email.hints[hintIndex];
    elements.hintContent.style.display = 'block';
    elements.hintBtn.disabled = true;
    elements.hintBtn.textContent = 'Hint Used';
    
    gameState.usedHints++;
}

// Next email
function nextEmail() {
    gameState.currentEmailIndex++;
    gameState.usedHints = 0;
    
    if (gameState.currentEmailIndex >= gameState.totalEmails) {
        showFinalResults();
    } else {
        loadCurrentEmail();
        showScreen('game');
    }
}

// Show final results
function showFinalResults() {
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalEmails) * 100);
    
    elements.finalScore.textContent = gameState.score;
    elements.finalAccuracy.textContent = `${accuracy}%`;
    elements.maxStreak.textContent = gameState.maxStreak;
    
    // Generate achievements
    const achievements = generateAchievements();
    elements.achievementList.innerHTML = '';
    achievements.forEach(achievement => {
        const div = document.createElement('div');
        div.className = 'achievement';
        div.innerHTML = `<i class="fas fa-${achievement.icon}"></i> ${achievement.text}`;
        elements.achievementList.appendChild(div);
    });
    
    showScreen('final-results');
}

// Generate achievements
function generateAchievements() {
    const achievements = [];
    
    if (gameState.maxStreak >= 5) {
        achievements.push({ icon: 'fire', text: 'Hot Streak!' });
    }
    
    if (gameState.score >= 100) {
        achievements.push({ icon: 'star', text: 'High Scorer!' });
    }
    
    if (gameState.correctAnswers === gameState.totalEmails) {
        achievements.push({ icon: 'trophy', text: 'Perfect Score!' });
    }
    
    if (gameState.usedHints === 0) {
        achievements.push({ icon: 'brain', text: 'No Hints Needed!' });
    }
    
    if (gameState.maxStreak >= 3) {
        achievements.push({ icon: 'bolt', text: 'On Fire!' });
    }
    
    return achievements;
}

// Restart game
function restartGame() {
    startGame();
}

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(`${screenName}-screen`).classList.add('active');
}

// Update UI
function updateUI() {
    elements.score.textContent = gameState.score;
    elements.level.textContent = gameState.level;
    elements.streak.textContent = gameState.streak;
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);