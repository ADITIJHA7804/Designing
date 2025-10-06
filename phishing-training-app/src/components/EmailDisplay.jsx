import { useState } from 'react'
import './EmailDisplay.css'

const EmailDisplay = ({ email, onDecision }) => {
  const [showRawEmail, setShowRawEmail] = useState(false)

  if (!email) return null

  return (
    <div className="email-display">
      <div className="email-header">
        <div className="email-toolbar">
          <button
            className={`raw-toggle ${showRawEmail ? 'active' : ''}`}
            onClick={() => setShowRawEmail(!showRawEmail)}
          >
            {showRawEmail ? '📧 Normal View' : '🔍 Show Raw Email'}
          </button>
        </div>
      </div>

      <div className="email-content">
        {!showRawEmail ? (
          <div className="rendered-email">
            <div className="email-meta">
              <div className="sender-info">
                <strong>From:</strong> {email.senderName} &lt;{email.sender}&gt;
              </div>
              <div className="subject">
                <strong>Subject:</strong> {email.subject}
              </div>
            </div>

            <div className="email-body">
              <div dangerouslySetInnerHTML={{ __html: email.content }} />
            </div>
          </div>
        ) : (
          <div className="raw-email">
            <div className="raw-header">
              <h3>Raw Email Headers</h3>
              <p className="raw-warning">⚠️ This is how emails appear to technical systems</p>
            </div>

            <div className="raw-content">
              <div className="raw-field">
                <strong>Return-Path:</strong> &lt;{email.sender}&gt;
              </div>
              <div className="raw-field">
                <strong>Received:</strong> from {email.sender.split('@')[1]} by mail.student.edu with SMTP
              </div>
              <div className="raw-field">
                <strong>From:</strong> {email.senderName} &lt;{email.sender}&gt;
              </div>
              <div className="raw-field">
                <strong>To:</strong> student@student.edu
              </div>
              <div className="raw-field">
                <strong>Subject:</strong> {email.subject}
              </div>
              <div className="raw-field">
                <strong>Date:</strong> {new Date().toLocaleString()}
              </div>
              <div className="raw-field">
                <strong>Message-ID:</strong> &lt;{Math.random().toString(36).substr(2, 9)}@{email.sender.split('@')[1]}&gt;
              </div>

              <hr />

              <div className="raw-body">
                <h4>Email Content:</h4>
                <div className="raw-html">
                  {email.content.replace(/<[^>]*>/g, '')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="decision-buttons">
        <h3>Is this email phishing?</h3>
        <div className="button-group">
          <button
            className="decision-btn phishing-btn"
            onClick={() => onDecision(true)}
          >
            🚨 Phishing
          </button>
          <button
            className="decision-btn legitimate-btn"
            onClick={() => onDecision(false)}
          >
            ✅ Legitimate
          </button>
        </div>
      </div>

      <div className="email-tips">
        <p><strong>🔍 Look for:</strong></p>
        <ul>
          <li>Suspicious sender email addresses</li>
          <li>Urgent language or threats</li>
          <li>Unexpected requests for personal information</li>
          <li>Poor grammar or formatting issues</li>
          <li>Suspicious links or attachments</li>
        </ul>
      </div>
    </div>
  )
}

export default EmailDisplay