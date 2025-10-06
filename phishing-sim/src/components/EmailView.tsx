import type { FC } from 'react';
import type { Email } from '../types';

type Props = {
  email: Email | null;
  onMark: (choice: 'phishing' | 'safe') => void;
  onHint: () => void;
  revealHeaders: boolean;
  toggleHeaders: () => void;
};

function AuthBadge({ label, status }: { label: string; status: string }) {
  return <span className={`authbadge authbadge--${status}`}>{label}: {status}</span>;
}

export const EmailView: FC<Props> = ({ email, onMark, onHint, revealHeaders, toggleHeaders }) => {
  if (!email) {
    return <div className="emailview emailview--empty">Select an email to begin</div>;
  }

  return (
    <div className="emailview">
      <div className="emailview__headerbar">
        <div className="emailview__meta">
          <div className="emailview__from">{email.fromName} &lt;{email.fromAddress}&gt;</div>
          <div className="emailview__subject">{email.subject}</div>
          <div className="emailview__date">{new Date(email.date).toLocaleString()}</div>
        </div>
        <div className="emailview__actions">
          <button className="btn btn--ghost" onClick={toggleHeaders}>
            {revealHeaders ? 'Hide headers' : 'Show headers'}
          </button>
          <button className="btn" onClick={() => onHint()}>Hint</button>
          <button className="btn btn--danger" onClick={() => onMark('phishing')}>Mark Phishing</button>
          <button className="btn btn--success" onClick={() => onMark('safe')}>Mark Safe</button>
        </div>
      </div>

      {revealHeaders && (
        <div className="emailview__headers">
          <div><strong>Message-ID</strong>: {email.header.messageId}</div>
          <div><strong>To</strong>: {email.header.toAddress}</div>
          {email.header.replyTo && <div><strong>Reply-To</strong>: {email.header.replyTo}</div>}
          {email.header.returnPath && <div><strong>Return-Path</strong>: {email.header.returnPath}</div>}
          <div><strong>Received</strong>: {email.header.receivedBy.join(' → ')}</div>
          <div className="emailview__auth">
            <AuthBadge label="SPF" status={email.header.spf} />
            <AuthBadge label="DKIM" status={email.header.dkim} />
            <AuthBadge label="DMARC" status={email.header.dmarc} />
          </div>
        </div>
      )}

      <div className="emailview__body">
        {email.body.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
        {email.links && email.links.length > 0 && (
          <div className="emailview__links">
            {email.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
                {link.displayUrl && <span className="emailview__displayurl"> ({link.displayUrl})</span>}
              </a>
            ))}
          </div>
        )}
        {email.attachments && email.attachments.length > 0 && (
          <div className="emailview__attachments">
            <strong>Attachments:</strong> {email.attachments.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailView;
