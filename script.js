// Phishing Email Training Simulation
class PhishingSimulator {
    constructor() {
        this.currentDifficulty = 'easy';
        this.currentEmailIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.totalEmails = 10;
        this.emails = [];
        this.currentEmail = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadEmailDatabase();
    }

    initializeElements() {
        // Game elements
        this.difficultySelector = document.getElementById('difficulty-selector');
        this.gameArea = document.getElementById('game-area');
        this.resultsModal = document.getElementById('results-modal');
        this.feedbackModal = document.getElementById('feedback-modal');
        
        // Stats elements
        this.scoreElement = document.getElementById('score');
        this.emailCountElement = document.getElementById('email-count');
        this.correctCountElement = document.getElementById('correct-count');
        this.wrongCountElement = document.getElementById('wrong-count');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        
        // Email elements
        this.senderElement = document.getElementById('sender');
        this.subjectElement = document.getElementById('subject');
        this.dateElement = document.getElementById('date');
        this.emailBodyElement = document.getElementById('email-body');
        
        // Buttons
        this.phishingBtn = document.getElementById('phishing-btn');
        this.legitimateBtn = document.getElementById('legitimate-btn');
        this.playAgainBtn = document.getElementById('play-again');
        this.changeDifficultyBtn = document.getElementById('change-difficulty');
        this.nextEmailBtn = document.getElementById('next-email');
        this.closeModalBtn = document.getElementById('close-modal');
        this.closeFeedbackBtn = document.getElementById('close-feedback');
    }

    bindEvents() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentDifficulty = e.currentTarget.dataset.level;
                this.startGame();
            });
        });

        // Action buttons
        this.phishingBtn.addEventListener('click', () => this.makeGuess(true));
        this.legitimateBtn.addEventListener('click', () => this.makeGuess(false));

        // Modal buttons
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.changeDifficultyBtn.addEventListener('click', () => this.showDifficultySelector());
        this.nextEmailBtn.addEventListener('click', () => this.nextEmail());
        this.closeModalBtn.addEventListener('click', () => this.closeModal(this.resultsModal));
        this.closeFeedbackBtn.addEventListener('click', () => this.closeModal(this.feedbackModal));

        // Close modals on outside click
        window.addEventListener('click', (e) => {
            if (e.target === this.resultsModal) this.closeModal(this.resultsModal);
            if (e.target === this.feedbackModal) this.closeModal(this.feedbackModal);
        });
    }

    loadEmailDatabase() {
        this.emailDatabase = {
            easy: [
                {
                    isPhishing: true,
                    sender: "noreply@amaz0n.com",
                    subject: "URGENT: Your account will be closed!",
                    date: "Today, 2:30 PM",
                    body: `
                        <p>Dear Customer,</p>
                        <p>We have detected suspicious activity on your account. Your account will be permanently closed in 24 hours unless you verify your information immediately.</p>
                        <p><strong>Click here to verify your account:</strong> <a href="http://fake-amazon-verification.com" style="color: #0066cc;">Verify Now</a></p>
                        <p>This is your last chance to keep your account active.</p>
                        <p>Amazon Security Team</p>
                    `,
                    explanation: "This is a phishing email because: 1) The sender uses 'amaz0n.com' instead of 'amazon.com' (typo squatting), 2) Creates urgency with 'URGENT' and '24 hours', 3) Uses a suspicious link that doesn't match Amazon's domain, 4) Threatens account closure to pressure action."
                },
                {
                    isPhishing: false,
                    sender: "noreply@amazon.com",
                    subject: "Your order #123-4567890 has shipped",
                    date: "Today, 1:15 PM",
                    body: `
                        <p>Hello John,</p>
                        <p>Great news! Your order has shipped and is on its way to you.</p>
                        <p><strong>Order Details:</strong></p>
                        <ul>
                            <li>Order #: 123-4567890</li>
                            <li>Items: Wireless Headphones</li>
                            <li>Expected Delivery: Tomorrow by 8 PM</li>
                        </ul>
                        <p>Track your package: <a href="https://amazon.com/track/123-4567890" style="color: #0066cc;">Track Package</a></p>
                        <p>Thank you for shopping with Amazon!</p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the correct Amazon domain, 2) Provides specific order details, 3) Uses a proper tracking link to Amazon's official site, 4) Professional tone without urgency or threats, 5) No requests for personal information."
                },
                {
                    isPhishing: true,
                    sender: "security@paypal-security.com",
                    subject: "Account Suspension Notice",
                    date: "Today, 3:45 PM",
                    body: `
                        <p>Dear PayPal User,</p>
                        <p>Your PayPal account has been suspended due to suspicious transactions. To restore access, please provide your login credentials immediately.</p>
                        <p>Click the link below to verify your account:</p>
                        <p><a href="http://paypal-verification.net" style="color: #0066cc;">Verify Account</a></p>
                        <p>Failure to respond within 48 hours will result in permanent account closure.</p>
                        <p>PayPal Security</p>
                    `,
                    explanation: "This is a phishing email because: 1) Uses 'paypal-security.com' instead of 'paypal.com', 2) Asks for login credentials (legitimate companies never ask for passwords), 3) Uses a suspicious verification link, 4) Creates false urgency with threats, 5) Generic greeting instead of using your name."
                },
                {
                    isPhishing: false,
                    sender: "notifications@github.com",
                    subject: "New commit to repository 'my-project'",
                    date: "Today, 4:20 PM",
                    body: `
                        <p>Hi there,</p>
                        <p>There was a new commit to the repository <strong>my-project</strong>.</p>
                        <p><strong>Commit:</strong> Fix login bug in authentication module</p>
                        <p><strong>Author:</strong> john.doe@company.com</p>
                        <p><strong>Branch:</strong> main</p>
                        <p>View the commit: <a href="https://github.com/username/my-project/commit/abc123" style="color: #0066cc;">View on GitHub</a></p>
                        <p>You're receiving this because you're watching this repository.</p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the official GitHub domain, 2) Provides specific technical details about the commit, 3) Links to the official GitHub website, 4) Professional and informative tone, 5) No requests for personal information or urgent action."
                },
                {
                    isPhishing: true,
                    sender: "support@microsft.com",
                    subject: "Windows Update Required - Action Needed",
                    date: "Today, 5:10 PM",
                    body: `
                        <p>Important Security Update</p>
                        <p>Your Windows system needs an urgent security update. Click the link below to download and install the update immediately.</p>
                        <p><a href="http://windows-update-security.com/download" style="color: #0066cc;">Download Update</a></p>
                        <p>This update fixes critical security vulnerabilities. Do not delay!</p>
                        <p>Microsoft Security Team</p>
                    `,
                    explanation: "This is a phishing email because: 1) Uses 'microsft.com' instead of 'microsoft.com' (typo), 2) Asks you to download from an unofficial site, 3) Creates false urgency, 4) Microsoft never sends updates via email links, 5) Suspicious download link that's not from Microsoft's official domain."
                }
            ],
            medium: [
                {
                    isPhishing: true,
                    sender: "billing@netflix-support.org",
                    subject: "Payment Failed - Update Required",
                    date: "Today, 6:30 PM",
                    body: `
                        <p>Dear Netflix Member,</p>
                        <p>We were unable to process your payment for your Netflix subscription. Your account will be suspended if payment is not updated within 24 hours.</p>
                        <p>To continue enjoying Netflix, please update your payment information:</p>
                        <p><a href="https://netflix-billing-update.com/secure" style="color: #e50914;">Update Payment Method</a></p>
                        <p>If you have any questions, please contact our support team.</p>
                        <p>Netflix Billing Department</p>
                    `,
                    explanation: "This is a phishing email because: 1) Uses 'netflix-support.org' instead of 'netflix.com', 2) Creates urgency with 24-hour deadline, 3) Uses a suspicious link that doesn't match Netflix's domain, 4) Asks for payment information via email link, 5) Legitimate companies would suspend service first, not threaten suspension."
                },
                {
                    isPhishing: false,
                    sender: "no-reply@spotify.com",
                    subject: "Your Premium subscription is now active",
                    date: "Today, 7:15 PM",
                    body: `
                        <p>Welcome to Spotify Premium!</p>
                        <p>Your Premium subscription is now active. You can start enjoying ad-free music, offline listening, and more.</p>
                        <p><strong>What's next?</strong></p>
                        <ul>
                            <li>Download the Spotify app</li>
                            <li>Create your first playlist</li>
                            <li>Discover new music with personalized recommendations</li>
                        </ul>
                        <p>Get started: <a href="https://spotify.com/download" style="color: #1db954;">Download Spotify</a></p>
                        <p>Questions? Visit our <a href="https://support.spotify.com" style="color: #1db954;">Help Center</a></p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the official Spotify domain, 2) Confirms a recent action (subscription activation), 3) Provides helpful next steps, 4) Links to official Spotify websites, 5) Professional and welcoming tone without urgency."
                },
                {
                    isPhishing: true,
                    sender: "security@apple-id.com",
                    subject: "Unusual Sign-in Activity Detected",
                    date: "Today, 8:45 PM",
                    body: `
                        <p>Apple ID Security Alert</p>
                        <p>We detected a sign-in to your Apple ID from a new device in Moscow, Russia. If this wasn't you, secure your account immediately.</p>
                        <p>Device: iPhone 12 Pro<br>
                        Location: Moscow, Russia<br>
                        Time: Today, 8:45 PM</p>
                        <p><a href="https://apple-id-security-verification.com/secure" style="color: #007aff;">Secure Your Account</a></p>
                        <p>If you don't recognize this activity, your account may be compromised.</p>
                    `,
                    explanation: "This is a phishing email because: 1) Uses 'apple-id.com' instead of 'apple.com', 2) Creates fear with 'compromised account' language, 3) Uses a suspicious verification link, 4) Apple would send this from 'appleid@apple.com', 5) The link doesn't match Apple's official domain structure."
                },
                {
                    isPhishing: false,
                    sender: "team@slack.com",
                    subject: "You've been added to #project-alpha",
                    date: "Today, 9:20 PM",
                    body: `
                        <p>Hi Sarah,</p>
                        <p>You've been added to the <strong>#project-alpha</strong> channel by John Smith.</p>
                        <p>This channel is for discussing the new mobile app project. Feel free to introduce yourself and share any ideas!</p>
                        <p>Join the conversation: <a href="https://company.slack.com/channels/project-alpha" style="color: #4a154b;">Open in Slack</a></p>
                        <p>Happy collaborating!</p>
                        <p>The Slack Team</p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the official Slack domain, 2) Provides specific context about the channel addition, 3) Links to the actual Slack workspace, 4) Professional and helpful tone, 5) No requests for personal information or urgent action."
                },
                {
                    isPhishing: true,
                    sender: "noreply@linkedin-security.net",
                    subject: "Profile Verification Required",
                    date: "Today, 10:15 PM",
                    body: `
                        <p>LinkedIn Security Notice</p>
                        <p>Your LinkedIn profile requires verification to maintain account security. Unverified accounts will be restricted from messaging and networking features.</p>
                        <p>Complete verification in 3 easy steps:</p>
                        <ol>
                            <li>Click the verification link below</li>
                            <li>Enter your LinkedIn password</li>
                            <li>Confirm your email address</li>
                        </ol>
                        <p><a href="https://linkedin-verification-security.com/verify" style="color: #0077b5;">Verify Profile Now</a></p>
                        <p>LinkedIn Security Team</p>
                    `,
                    explanation: "This is a phishing email because: 1) Uses 'linkedin-security.net' instead of 'linkedin.com', 2) Asks for your password (legitimate companies never ask for passwords), 3) Uses a suspicious verification link, 4) Creates false urgency about restrictions, 5) LinkedIn doesn't require profile verification via email links."
                }
            ],
            hard: [
                {
                    isPhishing: true,
                    sender: "noreply@microsoft.com",
                    subject: "Action Required: Secure Your Microsoft Account",
                    date: "Today, 11:30 AM",
                    body: `
                        <p>Dear Microsoft Customer,</p>
                        <p>We've noticed some unusual activity on your Microsoft account. To help protect your account, we need you to verify your identity.</p>
                        <p><strong>Recent Activity:</strong></p>
                        <ul>
                            <li>Sign-in from new device: iPhone 13 Pro</li>
                            <li>Location: San Francisco, CA</li>
                            <li>Time: Today, 11:25 AM</li>
                        </ul>
                        <p>If this was you, no action is needed. If not, please secure your account immediately.</p>
                        <p><a href="https://account-microsoft-security.com/verify" style="color: #0078d4;">Secure Your Account</a></p>
                        <p>Microsoft Account Team</p>
                    `,
                    explanation: "This is a sophisticated phishing email because: 1) Uses the correct Microsoft domain, 2) Provides realistic activity details, 3) BUT uses 'account-microsoft-security.com' instead of 'account.microsoft.com', 4) Creates concern without being overly urgent, 5) The link structure is slightly off - legitimate Microsoft links would be 'account.microsoft.com' not 'account-microsoft-security.com'."
                },
                {
                    isPhishing: false,
                    sender: "security@google.com",
                    subject: "New sign-in to your Google Account",
                    date: "Today, 2:45 PM",
                    body: `
                        <p>Hi there,</p>
                        <p>We noticed a new sign-in to your Google Account on a device we don't recognize. Here are the details:</p>
                        <p><strong>When:</strong> Today, 2:45 PM<br>
                        <strong>Where:</strong> San Francisco, CA, USA<br>
                        <strong>Device:</strong> Chrome on Windows</p>
                        <p>If this was you, you can ignore this email. If you don't recognize this activity, please secure your account.</p>
                        <p><a href="https://myaccount.google.com/security" style="color: #1a73e8;">Review Activity</a></p>
                        <p>Google Security Team</p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the official Google domain, 2) Provides specific, realistic activity details, 3) Links to the official Google account security page, 4) Gives you the option to ignore if it was you, 5) Professional tone without pressure or urgency."
                },
                {
                    isPhishing: true,
                    sender: "billing@dropbox.com",
                    subject: "Invoice #DB-2024-001234 - Payment Confirmation",
                    date: "Today, 4:20 PM",
                    body: `
                        <p>Dear Dropbox Customer,</p>
                        <p>Thank you for your recent payment. Your invoice has been processed successfully.</p>
                        <p><strong>Invoice Details:</strong></p>
                        <ul>
                            <li>Invoice #: DB-2024-001234</li>
                            <li>Amount: $99.00</li>
                            <li>Plan: Dropbox Professional</li>
                            <li>Next billing date: March 15, 2024</li>
                        </ul>
                        <p>Download your receipt: <a href="https://dropbox-billing-receipts.com/invoice/DB-2024-001234" style="color: #0061ff;">Download Receipt</a></p>
                        <p>Questions about this invoice? Contact our billing team.</p>
                        <p>Dropbox Billing Team</p>
                    `,
                    explanation: "This is a sophisticated phishing email because: 1) Uses the correct Dropbox domain, 2) Provides realistic invoice details, 3) BUT uses 'dropbox-billing-receipts.com' instead of 'dropbox.com', 4) The link structure is slightly off - legitimate Dropbox links would be 'dropbox.com' not 'dropbox-billing-receipts.com', 5) Creates trust with realistic billing information but leads to a malicious site."
                },
                {
                    isPhishing: false,
                    sender: "notifications@twitter.com",
                    subject: "You have a new follower on Twitter",
                    date: "Today, 6:15 PM",
                    body: `
                        <p>Hi @username,</p>
                        <p>You have a new follower on Twitter!</p>
                        <p><strong>@tech_enthusiast</strong> started following you.</p>
                        <p>See their profile: <a href="https://twitter.com/tech_enthusiast" style="color: #1da1f2;">View Profile</a></p>
                        <p>You can turn off these notifications in your <a href="https://twitter.com/settings/notifications" style="color: #1da1f2;">notification settings</a>.</p>
                        <p>Happy tweeting!</p>
                    `,
                    explanation: "This is a legitimate email because: 1) Uses the official Twitter domain, 2) Provides specific follower information, 3) Links to official Twitter profiles and settings, 4) Gives you control over notifications, 5) Professional and friendly tone without any requests for personal information."
                },
                {
                    isPhishing: true,
                    sender: "support@adobe.com",
                    subject: "Adobe Creative Cloud - Subscription Renewal",
                    date: "Today, 8:30 PM",
                    body: `
                        <p>Dear Adobe Customer,</p>
                        <p>Your Adobe Creative Cloud subscription is set to renew automatically on March 15, 2024. Your payment method on file will be charged $52.99.</p>
                        <p><strong>Subscription Details:</strong></p>
                        <ul>
                            <li>Plan: Creative Cloud Photography</li>
                            <li>Next billing: March 15, 2024</li>
                            <li>Amount: $52.99</li>
                        </ul>
                        <p>To update your payment method or cancel, please visit your account: <a href="https://adobe-account-management.com/billing" style="color: #ff0000;">Manage Subscription</a></p>
                        <p>Adobe Customer Support</p>
                    `,
                    explanation: "This is a sophisticated phishing email because: 1) Uses the correct Adobe domain, 2) Provides realistic subscription details, 3) BUT uses 'adobe-account-management.com' instead of 'account.adobe.com', 4) The link structure is slightly off - legitimate Adobe links would be 'account.adobe.com' not 'adobe-account-management.com', 5) Creates urgency about payment method updates but leads to a malicious site."
                }
            ]
        };
    }

    startGame() {
        this.resetStats();
        this.difficultySelector.style.display = 'none';
        this.gameArea.style.display = 'block';
        
        // Shuffle emails for this difficulty
        this.emails = [...this.emailDatabase[this.currentDifficulty]];
        this.shuffleArray(this.emails);
        
        this.currentEmailIndex = 0;
        this.showCurrentEmail();
    }

    resetStats() {
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.currentEmailIndex = 0;
        this.updateStats();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    showCurrentEmail() {
        if (this.currentEmailIndex >= this.emails.length) {
            this.showResults();
            return;
        }

        this.currentEmail = this.emails[this.currentEmailIndex];
        
        // Update email display
        this.senderElement.textContent = `From: ${this.currentEmail.sender}`;
        this.subjectElement.textContent = `Subject: ${this.currentEmail.subject}`;
        this.dateElement.textContent = `Date: ${this.currentEmail.date}`;
        this.emailBodyElement.innerHTML = this.currentEmail.body;
        
        // Update progress
        this.updateProgress();
        
        // Enable buttons
        this.phishingBtn.disabled = false;
        this.legitimateBtn.disabled = false;
    }

    makeGuess(isPhishing) {
        // Disable buttons to prevent double-clicking
        this.phishingBtn.disabled = true;
        this.legitimateBtn.disabled = true;

        const isCorrect = (isPhishing === this.currentEmail.isPhishing);
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score += this.getScoreForDifficulty();
        } else {
            this.wrongAnswers++;
        }

        this.updateStats();
        this.showFeedback(isCorrect);
    }

    getScoreForDifficulty() {
        const scores = { easy: 10, medium: 15, hard: 20 };
        return scores[this.currentDifficulty];
    }

    showFeedback(isCorrect) {
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackMessage = document.getElementById('feedback-message');
        const explanation = document.getElementById('explanation');
        const feedbackTitle = document.getElementById('feedback-title');

        if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            feedbackMessage.textContent = 'Correct! Great job identifying this email.';
            feedbackTitle.textContent = 'Correct Answer';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            feedbackMessage.textContent = 'Incorrect. Let\'s learn from this mistake.';
            feedbackTitle.textContent = 'Incorrect Answer';
        }

        explanation.innerHTML = `
            <h4>Explanation:</h4>
            <p>${this.currentEmail.explanation}</p>
        `;

        this.feedbackModal.style.display = 'block';
    }

    nextEmail() {
        this.closeModal(this.feedbackModal);
        this.currentEmailIndex++;
        this.showCurrentEmail();
    }

    updateStats() {
        this.scoreElement.textContent = this.score;
        this.emailCountElement.textContent = `${this.currentEmailIndex + 1}/${this.totalEmails}`;
        this.correctCountElement.textContent = this.correctAnswers;
        this.wrongCountElement.textContent = this.wrongAnswers;
    }

    updateProgress() {
        const progress = ((this.currentEmailIndex + 1) / this.totalEmails) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}% Complete`;
    }

    showResults() {
        const accuracy = Math.round((this.correctAnswers / this.totalEmails) * 100);
        const finalScore = document.getElementById('final-score');
        const finalAccuracy = document.getElementById('final-accuracy');
        const performanceMessage = document.getElementById('performance-message');

        finalScore.textContent = this.score;
        finalAccuracy.textContent = `${accuracy}%`;

        // Performance message based on accuracy
        let message, className;
        if (accuracy >= 90) {
            message = "Outstanding! You're a phishing detection expert! 🏆";
            className = "performance-excellent";
        } else if (accuracy >= 80) {
            message = "Excellent work! You have strong cybersecurity awareness! 🎯";
            className = "performance-good";
        } else if (accuracy >= 70) {
            message = "Good job! You're getting better at spotting phishing emails! 👍";
            className = "performance-fair";
        } else {
            message = "Keep practicing! Review the explanations to improve your skills! 📚";
            className = "performance-poor";
        }

        performanceMessage.textContent = message;
        performanceMessage.className = `performance-message ${className}`;

        this.resultsModal.style.display = 'block';
    }

    resetGame() {
        this.closeModal(this.resultsModal);
        this.resetStats();
        this.currentEmailIndex = 0;
        this.showCurrentEmail();
    }

    showDifficultySelector() {
        this.closeModal(this.resultsModal);
        this.difficultySelector.style.display = 'block';
        this.gameArea.style.display = 'none';
    }

    closeModal(modal) {
        modal.style.display = 'none';
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhishingSimulator();
});

// Add some fun animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animations to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});