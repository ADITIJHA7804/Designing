import type { FC } from 'react';
import type { Email } from '../types';

export type InboxItemState = 'unanswered' | 'correct' | 'incorrect';

type Props = {
  emails: Email[];
  selectedId: string | null;
  onSelect: (emailId: string) => void;
  itemStates: Record<string, InboxItemState>;
};

export const Inbox: FC<Props> = ({ emails, selectedId, onSelect, itemStates }) => {
  return (
    <div className="inbox">
      <div className="inbox__header">
        <span>Inbox</span>
      </div>
      <ul className="inbox__list">
        {emails.map((email) => {
          const state = itemStates[email.id] ?? 'unanswered';
          return (
            <li
              key={email.id}
              className={[
                'inbox__item',
                selectedId === email.id ? 'inbox__item--selected' : '',
                `inbox__item--${state}`,
              ].join(' ')}
              onClick={() => onSelect(email.id)}
            >
              <div className="inbox__row1">
                <span className="inbox__from">{email.fromName}</span>
                <span className="inbox__date">{new Date(email.date).toLocaleDateString()}</span>
              </div>
              <div className="inbox__row2">
                <span className="inbox__subject">{email.subject}</span>
              </div>
              <div className="inbox__row3">
                <span className="inbox__preview">{email.previewText}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;
