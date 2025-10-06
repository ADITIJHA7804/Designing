# 🛡️ Phishing Email Training Simulation

An interactive, gamified cybersecurity training tool designed to help students and professionals learn to identify phishing emails through hands-on practice.

## 🎯 Features

- **Three Difficulty Levels**: Easy, Medium, and Hard
- **Interactive Email Simulation**: Realistic email interfaces with actual phishing techniques
- **Educational Feedback**: Detailed explanations for each email
- **Scoring System**: Points based on difficulty level and accuracy
- **Progress Tracking**: Real-time stats and progress visualization
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, engaging interface with animations

## 🚀 Quick Start

### Option 1: Simple HTTP Server (Recommended)
```bash
# Navigate to the project directory
cd phishing-email-training-simulation

# Start a local server
python3 -m http.server 8000

# Open your browser and go to:
# http://localhost:8000
```

### Option 2: Using Node.js
```bash
# Install dependencies (if any)
npm install

# Start the development server
npm start

# Open your browser and go to:
# http://localhost:8000
```

### Option 3: Direct File Access
Simply open `index.html` in your web browser (some features may not work due to CORS restrictions).

## 🎮 How to Play

1. **Choose Difficulty**: Select Easy, Medium, or Hard level
2. **Read the Email**: Carefully examine the email content, sender, subject, and links
3. **Make Your Decision**: Click "This is Phishing" or "This is Legitimate"
4. **Learn from Feedback**: Read the detailed explanation for each email
5. **Track Progress**: Monitor your score and accuracy throughout the game
6. **Complete All 10 Emails**: Finish the round to see your final performance

## 📚 Educational Content

### Easy Level
- Basic phishing patterns
- Obvious typos and suspicious domains
- Urgent language and threats
- Simple social engineering techniques

### Medium Level
- More sophisticated domain spoofing
- Realistic company branding
- Subtle urgency tactics
- Professional-looking malicious content

### Hard Level
- Advanced social engineering
- Sophisticated domain manipulation
- Realistic scenarios with minor red flags
- Professional-grade phishing attempts

## 🏆 Scoring System

- **Easy**: 10 points per correct answer
- **Medium**: 15 points per correct answer  
- **Hard**: 20 points per correct answer

### Performance Ratings
- **90%+**: Outstanding! You're a phishing detection expert! 🏆
- **80-89%**: Excellent work! Strong cybersecurity awareness! 🎯
- **70-79%**: Good job! Getting better at spotting phishing! 👍
- **<70%**: Keep practicing! Review explanations to improve! 📚

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No external dependencies
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Inter font family for readability

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
phishing-email-training-simulation/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript game logic
├── package.json        # Project configuration
└── README.md          # This file
```

## 🎓 Educational Use

This simulation is perfect for:
- **Cybersecurity Courses**: Interactive learning component
- **Employee Training**: Security awareness programs
- **Workshops**: Hands-on phishing detection practice
- **Self-Study**: Individual cybersecurity skill development

### Classroom Integration
1. **Pre-Assessment**: Use before teaching phishing concepts
2. **Interactive Learning**: Practice during lessons
3. **Post-Assessment**: Evaluate learning progress
4. **Discussion Starter**: Use results for group discussions

## 🔧 Customization

### Adding New Emails
Edit the `emailDatabase` object in `script.js` to add new phishing scenarios:

```javascript
{
    isPhishing: true/false,
    sender: "sender@domain.com",
    subject: "Email Subject",
    date: "Date String",
    body: "HTML email content",
    explanation: "Educational explanation"
}
```

### Modifying Difficulty
Adjust the scoring system in the `getScoreForDifficulty()` method:

```javascript
getScoreForDifficulty() {
    const scores = { easy: 10, medium: 15, hard: 20 };
    return scores[this.currentDifficulty];
}
```

### Styling Changes
Modify `styles.css` to customize colors, fonts, and layout to match your brand or preferences.

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Add new phishing email examples
- Improve the UI/UX
- Add new features
- Fix bugs
- Improve educational content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure you're using a modern web browser
3. Try refreshing the page
4. Open an issue on GitHub

## 🎉 Acknowledgments

- Inspired by real-world phishing attacks and security training needs
- Designed with accessibility and user experience in mind
- Built for educational purposes to improve cybersecurity awareness

---

**Happy Learning! Stay Safe Online! 🛡️**