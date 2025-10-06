export type VerificationStatus = 'pass' | 'fail' | 'softfail' | 'neutral' | 'none';

export type EmailHeader = {
  messageId: string;
  toAddress: string;
  replyTo?: string;
  returnPath?: string;
  receivedBy: string[];
  spf: VerificationStatus;
  dkim: Exclude<VerificationStatus, 'softfail' | 'neutral'>;
  dmarc: Exclude<VerificationStatus, 'softfail' | 'neutral'>;
};

export type EmailLink = {
  label: string;
  url: string;
  displayUrl?: string;
};

export type Email = {
  id: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  date: string; // ISO string
  previewText: string;
  body: string[]; // paragraphs
  links?: EmailLink[];
  attachments?: string[];
  header: EmailHeader;
  isPhishing: boolean;
  cues: string[]; // teaching cues for hints/summary
  difficulty: 'easy' | 'medium' | 'hard';
};

export type UserChoice = 'phishing' | 'safe';

export type EmailResult = {
  emailId: string;
  userChoice: UserChoice | null;
  correct: boolean | null;
  hintsUsed: number;
  elapsedMs: number;
};
