// Phishing Email Training Simulator
// Educational game to help students identify phishing emails

class PhishingEmailGame {
    constructor() {
        this.emails = this.generateEmails();
        this.currentEmailIndex = 0;
        this.score = 0;
        this.correct = 0;
        this.streak = 0;
        this.level = 1;
        this.gameState = 'playing'; // playing, feedback, gameOver

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadNextEmail();
        this.updateStats();
    }

    generateEmails() {
        return [
            // Phishing Emails
            {
                type: 'phishing',
                senderName: 'Bank of America Security',
                senderEmail: 'security@bankofamerica-alert.com',
                subject: 'URGENT: Your Account Has Been Compromised',
                timestamp: '2 minutes ago',
                size: '1.8 KB',
                body: `
                    <div class="urgent">
                        <strong>SECURITY ALERT:</strong> We have detected unusual activity on your Bank of America account.
                    </div>
                    <p>Dear Valued Customer,</p>
                    <p>Your account ending in ****4532 has been flagged for suspicious transactions. To prevent unauthorized access, you must verify your identity immediately.</p>
                    <p><strong>Click here to secure your account:</strong> <a href="#" class="suspicious">https://secure-bankofamerica.com/verify</a></p>
                    <p>If you do not verify within 24 hours, your account will be suspended.</p>
                    <p>Thank you for banking with us.<br>Bank of America Security Team</p>
                `,
                explanation: [
                    'The sender email domain is not official (bankofamerica-alert.com instead of bankofamerica.com)',
                    'Urgent language creates panic and pressure to act quickly',
                    'Suspicious URL that looks legitimate but may lead to phishing site',
                    'Generic greeting "Valued Customer" instead of using your actual name'
                ]
            },
            {
                type: 'phishing',
                senderName: 'Amazon Customer Service',
                senderEmail: 'amazon-support@amaz0n-help.com',
                subject: 'Your Recent Order Needs Attention',
                timestamp: '15 minutes ago',
                size: '2.1 KB',
                body: `
                    <p>Hello Amazon Customer,</p>
                    <p>We noticed an issue with your recent order #AMZ-456-789.</p>
                    <p>To ensure proper delivery, please update your payment information immediately.</p>
                    <p><strong>Update Payment Method:</strong> <a href="#" class="suspicious">https://amazon.com/update-payment</a></p>
                    <p>Failure to update may result in order cancellation.</p>
                    <p>Best regards,<br>Amazon Customer Service</p>
                `,
                explanation: [
                    'Fake domain with zero instead of "o" (amaz0n-help.com)',
                    'Generic greeting without using your actual name',
                    'Creates urgency about a non-existent order',
                    'Requests sensitive payment information via email'
                ]
            },
            {
                type: 'phishing',
                senderName: 'Microsoft Account Team',
                senderEmail: 'account-security@microsoft-support.net',
                subject: 'Verify Your Email Address Immediately',
                timestamp: '1 hour ago',
                size: '1.5 KB',
                body: `
                    <div class="urgent">
                        <strong>Account Verification Required</strong>
                    </div>
                    <p>Dear User,</p>
                    <p>Your Microsoft account has been selected for a security upgrade. Please verify your email address to continue using our services.</p>
                    <p><strong>Verify Now:</strong> <a href="#" class="suspicious">https://login.microsoft.com/verify-account</a></p>
                    <p>If not verified within 48 hours, your account may be limited.</p>
                    <p>Microsoft Account Security</p>
                `,
                explanation: [
                    'Unofficial domain (microsoft-support.net instead of microsoft.com)',
                    'Generic "User" greeting instead of personalized name',
                    'Microsoft doesn\'t send unsolicited verification requests',
                    'Threatens account limitation to create urgency'
                ]
            },
            {
                type: 'phishing',
                senderName: 'PayPal Resolution Center',
                senderEmail: 'resolution@paypal-security-alert.com',
                subject: 'Action Required: Account Limitation Notice',
                timestamp: '30 minutes ago',
                size: '2.7 KB',
                body: `
                    <p>Dear PayPal Member,</p>
                    <p>Our security system has detected unusual activity on your account. To protect your account and prevent fraud, we have temporarily limited access to sensitive features.</p>
                    <p>Please log in to resolve this issue immediately:</p>
                    <p><strong>Login to PayPal:</strong> <a href="#" class="suspicious">https://www.paypal.com/resolve-issue</a></p>
                    <p>If you do not resolve this within 24 hours, your account may be permanently suspended.</p>
                    <p>Thank you for using PayPal.<br>PayPal Security Team</p>
                `,
                explanation: [
                    'Fake domain (paypal-security-alert.com)',
                    'Threatens permanent suspension to create panic',
                    'Requests login through suspicious link',
                    'PayPal doesn\'t limit accounts without prior notice'
                ]
            },
            {
                type: 'phishing',
                senderName: 'Apple ID Support',
                senderEmail: 'apple-support@appleid-verification.com',
                subject: 'Apple ID Verification Required',
                timestamp: '45 minutes ago',
                size: '1.9 KB',
                body: `
                    <p>Hello Apple User,</p>
                    <p>Your Apple ID is about to expire. To continue using Apple services, you must verify your account information.</p>
                    <p><strong>Verify Your Apple ID:</strong> <a href="#" class="suspicious">https://appleid.apple.com/verify</a></p>
                    <p>If not verified, you may lose access to your purchased content and iCloud storage.</p>
                    <p>Apple Support Team</p>
                `,
                explanation: [
                    'Apple IDs don\'t expire',
                    'Generic greeting without personalized name',
                    'Unofficial domain (appleid-verification.com)',
                    'Threatens loss of purchased content to create urgency'
                ]
            },

            // Legitimate Emails
            {
                type: 'legitimate',
                senderName: 'Netflix',
                senderEmail: 'info@netflix.com',
                subject: 'Your Netflix Subscription',
                timestamp: '2 hours ago',
                size: '1.2 KB',
                body: `
                    <p>Hi John,</p>
                    <p>Thank you for being a Netflix member! Your subscription renews on March 15, 2024.</p>
                    <p>You can manage your subscription anytime in your Account settings.</p>
                    <p>If you have any questions, visit our Help Center.</p>
                    <p>Happy streaming!<br>The Netflix Team</p>
                `,
                explanation: [
                    'Official Netflix domain (netflix.com)',
                    'Personalized greeting with actual name',
                    'No urgent requests or threats',
                    'No suspicious links requesting action'
                ]
            },
            {
                type: 'legitimate',
                senderName: 'LinkedIn',
                senderEmail: 'notifications@linkedin.com',
                subject: 'Weekly digest: Connections and updates',
                timestamp: '6 hours ago',
                size: '3.2 KB',
                body: `
                    <p>Hi Sarah,</p>
                    <p>Here's your weekly digest of activity on LinkedIn:</p>
                    <p>• 3 new connection requests</p>
                    <p>• 12 profile views this week</p>
                    <p>• 5 messages in your inbox</p>
                    <p>Keep networking!<br>LinkedIn Team</p>
                `,
                explanation: [
                    'Official LinkedIn domain (linkedin.com)',
                    'Personalized greeting with actual name',
                    'Informational content without urgent requests',
                    'No suspicious links or threats'
                ]
            },
            {
                type: 'legitimate',
                senderName: 'GitHub',
                senderEmail: 'noreply@github.com',
                subject: 'Security alert for your account',
                timestamp: '1 day ago',
                size: '1.7 KB',
                body: `
                    <p>Hello Developer,</p>
                    <p>We noticed a new sign-in to your GitHub account from a new device. If this was you, no action is needed.</p>
                    <p>If this wasn't you, please review your recent activity and consider changing your password.</p>
                    <p>You can check your security settings here: <a href="https://github.com/settings/security">https://github.com/settings/security</a></p>
                    <p>Stay secure,<br>GitHub Security Team</p>
                `,
                explanation: [
                    'Official GitHub domain (github.com)',
                    'Informational tone without panic',
                    'Legitimate link to official GitHub settings',
                    'Offers security advice without threats'
                ]
            },
            {
                type: 'legitimate',
                senderName: 'Duolingo',
                senderEmail: 'no-reply@duolingo.com',
                subject: 'Your daily reminder to practice',
                timestamp: '3 hours ago',
                size: '1.1 KB',
                body: `
                    <p>Hey Alex!</p>
                    <p>Don't forget to complete your daily lesson! You're on a 7-day streak.</p>
                    <p>Maintaining streaks helps you learn faster. Keep it up!</p>
                    <p>Practice now: <a href="https://duolingo.com">https://duolingo.com</a></p>
                    <p>The Duolingo Team</p>
                `,
                explanation: [
                    'Official Duolingo domain (duolingo.com)',
                    'Personalized greeting and streak mention',
                    'Encouraging tone without urgency',
                    'Legitimate link to official website'
                ]
            },
            {
                type: 'legitimate',
                senderName: 'Spotify',
                senderEmail: 'news@spotify.com',
                subject: 'Discover Weekly: Your music update',
                timestamp: '1 day ago',
                size: '2.8 KB',
                body: `
                    <p>Hi Music Lover,</p>
                    <p>Your Discover Weekly playlist is ready! We've curated 30 new songs based on your listening history.</p>
                    <p>Listen now and discover your next favorite artist.</p>
                    <p><a href="https://spotify.com/discover">https://spotify.com/discover</a></p>
                    <p>Happy listening,<br>Spotify Team</p>
                `,
                explanation: [
                    'Official Spotify domain (spotify.com)',
                    'Informational newsletter format',
                    'No urgent requests or suspicious links',
                    'Focuses on enhancing user experience'
                ]
            }
        ];
    }

    bindEvents() {
        document.getElementById('btn-phishing').addEventListener('click', () => this.checkAnswer('phishing'));
        document.getElementById('btn-legitimate').addEventListener('click', () => this.checkAnswer('legitimate'));
        document.getElementById('btn-unsure').addEventListener('click', () => this.checkAnswer('unsure'));
        document.getElementById('btn-next').addEventListener('click', () => this.loadNextEmail());
    }

    loadNextEmail() {
        if (this.currentEmailIndex >= this.emails.length) {
            this.showGameComplete();
            return;
        }

        const email = this.emails[this.currentEmailIndex];
        this.displayEmail(email);
        this.gameState = 'playing';

        // Hide feedback container
        document.getElementById('feedback-container').style.display = 'none';

        // Update progress
        this.updateProgress();
    }

    displayEmail(email) {
        document.getElementById('sender-name').textContent = email.senderName;
        document.getElementById('sender-email').textContent = email.senderEmail;
        document.getElementById('email-subject').textContent = email.subject;
        document.getElementById('timestamp').textContent = email.timestamp;
        document.getElementById('email-size').textContent = email.size;
        document.getElementById('email-body').innerHTML = email.body;
    }

    checkAnswer(userAnswer) {
        if (this.gameState !== 'playing') return;

        const currentEmail = this.emails[this.currentEmailIndex];
        const isCorrect = (userAnswer === currentEmail.type) ||
                         (userAnswer === 'unsure' && currentEmail.type === 'phishing'); // Give partial credit for being unsure about phishing

        this.showFeedback(isCorrect, currentEmail, userAnswer);
        this.updateScore(isCorrect, userAnswer);
        this.updateStats();
    }

    showFeedback(isCorrect, email, userAnswer) {
        this.gameState = 'feedback';

        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackMessage = document.getElementById('feedback-message');
        const emailType = document.getElementById('email-type');
        const explanationPoints = document.getElementById('explanation-points');

        if (isCorrect) {
            feedbackTitle.textContent = '🎉 Excellent Work!';
            feedbackMessage.textContent = 'You correctly identified this email!';
            emailType.textContent = email.type === 'phishing' ? 'phishing' : 'legitimate';

            // Add correct animation
            feedbackContainer.classList.add('correct-animation');
            setTimeout(() => feedbackContainer.classList.remove('correct-animation'), 600);
        } else {
            if (userAnswer === 'unsure') {
                feedbackTitle.textContent = '🤔 Good Caution!';
                feedbackMessage.textContent = 'Being unsure about suspicious emails is actually a good security practice!';
            } else {
                feedbackTitle.textContent = '❌ Learning Opportunity!';
                feedbackMessage.textContent = 'Don\'t worry, cybersecurity awareness improves with practice!';
            }
            emailType.textContent = email.type === 'phishing' ? 'phishing' : 'legitimate';
        }

        // Update explanation
        explanationPoints.innerHTML = email.explanation.map(point => `<li>${point}</li>`).join('');

        feedbackContainer.style.display = 'block';

        // Scroll to feedback
        feedbackContainer.scrollIntoView({ behavior: 'smooth' });
    }

    updateScore(isCorrect, userAnswer) {
        if (isCorrect) {
            this.correct++;
            this.streak++;

            if (userAnswer === 'unsure' && this.emails[this.currentEmailIndex].type === 'phishing') {
                this.score += 5; // Partial credit for being cautious
            } else {
                this.score += 10; // Full credit for correct answer
            }
        } else {
            this.streak = 0;
            if (userAnswer !== 'unsure') {
                this.score = Math.max(0, this.score - 3); // Small penalty for wrong answer
            }
        }

        // Level progression
        if (this.correct > 0 && this.correct % 3 === 0) {
            this.level = Math.floor(this.correct / 3) + 1;
        }

        this.currentEmailIndex++;
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('correct').textContent = this.correct;
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('level').textContent = this.level;
    }

    updateProgress() {
        const progress = (this.currentEmailIndex / this.emails.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `Email ${this.currentEmailIndex} of ${this.emails.length}`;
    }

    showGameComplete() {
        this.gameState = 'gameOver';

        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackMessage = document.getElementById('feedback-message');
        const explanation = document.getElementById('explanation');
        const nextBtn = document.getElementById('btn-next');

        feedbackTitle.textContent = '🎊 Congratulations!';
        feedbackMessage.textContent = `You've completed the training! You correctly identified ${this.correct} out of ${this.emails.length} emails and earned ${this.score} points!`;

        explanation.innerHTML = `
            <h4>🏆 Final Score Breakdown:</h4>
            <ul>
                <li>Correct Answers: ${this.correct}/${this.emails.length}</li>
                <li>Final Score: ${this.score} points</li>
                <li>Longest Streak: ${this.streak}</li>
                <li>Final Level: ${this.level}</li>
            </ul>
            <p><strong>Great job on improving your cybersecurity awareness!</strong></p>
        `;

        nextBtn.textContent = 'Play Again';
        nextBtn.addEventListener('click', () => this.restartGame());

        feedbackContainer.style.display = 'block';
    }

    restartGame() {
        this.currentEmailIndex = 0;
        this.score = 0;
        this.correct = 0;
        this.streak = 0;
        this.level = 1;
        this.updateStats();
        this.loadNextEmail();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhishingEmailGame();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (phishingGame.gameState !== 'playing') return;

    switch(e.key) {
        case '1':
            document.getElementById('btn-phishing').click();
            break;
        case '2':
            document.getElementById('btn-legitimate').click();
            break;
        case '3':
            document.getElementById('btn-unsure').click();
            break;
    }
});