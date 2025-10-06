(function() {
  'use strict';

  // --- Utility helpers ---
  function shuffleArray(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]);
    });
  }

  function wrapPhrases(text, phrases, cls) {
    if (!phrases || phrases.length === 0) return escapeHtml(text);
    let result = escapeHtml(text);
    phrases.forEach(p => {
      if (!p) return;
      const re = new RegExp(`(${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      result = result.replace(re, `<span class="${cls}">$1<\/span>`);
    });
    return result;
  }

  function preventAllLinkNavigation(container) {
    container.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      a.classList.add('disabled-link');
      a.setAttribute('title', 'Links disabled in training');
      a.setAttribute('rel', 'nofollow noopener noreferrer');
      a.setAttribute('href', '#');
    });
  }

  // --- Confetti ---
  const Confetti = (function() {
    let active = false;
    let canvas, ctx, pieces = [], lastTs = 0, rafId = null;

    function init() {
      canvas = document.getElementById('confetti-canvas');
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function randomColor() {
      const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#54a0ff'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function spawn(count) {
      const w = canvas.width, h = canvas.height;
      for (let i = 0; i < count; i++) {
        pieces.push({
          x: Math.random() * w,
          y: -10 - Math.random() * 20,
          size: 6 + Math.random() * 6,
          color: randomColor(),
          speedY: 1 + Math.random() * 3,
          speedX: -1 + Math.random() * 2,
          rot: Math.random() * Math.PI,
          rotSpeed: -0.2 + Math.random() * 0.4,
          ttl: 3 + Math.random() * 2
        });
      }
    }

    function update(dt) {
      const w = canvas.width, h = canvas.height;
      pieces = pieces.filter(p => p.ttl > 0 && p.y < h + 20);
      for (const p of pieces) {
        p.ttl -= dt;
        p.x += p.speedX * 60 * dt;
        p.y += p.speedY * 60 * dt;
        p.rot += p.rotSpeed * dt;
        p.speedX += Math.sin(p.y * 0.01) * 0.01;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      }
    }

    function loop(ts) {
      const dt = Math.min(0.033, (ts - lastTs) / 1000 || 0.016);
      lastTs = ts;
      update(dt);
      draw();
      if (active || pieces.length > 0) rafId = requestAnimationFrame(loop);
    }

    function start(durationMs = 3000) {
      if (!canvas) init();
      canvas.classList.remove('hidden');
      active = true;
      spawn(180);
      if (!rafId) rafId = requestAnimationFrame(loop);
      setTimeout(() => { active = false; setTimeout(stop, 2000); }, durationMs);
    }

    function stop() {
      if (!canvas) return;
      canvas.classList.add('hidden');
      pieces = [];
      lastTs = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    return { start, stop };
  })();

  // --- Dataset ---
  const EMAILS = [
    {
      id: 'apple-alert',
      senderName: 'Apple ID',
      senderEmail: 'no-reply@apple-security.com',
      subject: 'Your Apple ID was used to sign in',
      preview: 'We detected a sign-in from a new device. Verify now.',
      date: Date.now() - 1000 * 60 * 60 * 5,
      isPhish: true,
      bodyLines: [
        'Dear Customer,',
        'Your Apple ID was used to sign in on iPhone 15 Pro near Berlin.',
        'If this was not you, you must verify your account now to avoid suspension.',
        'Verify here: accounts.apple.com-security.verify-apple-auth.ru/login',
        'Thank you, Apple Support Team'
      ],
      flaggedPhrases: ['verify', 'suspension', 'accounts.apple.com-security', 'ru/', 'Apple Support Team'],
      redFlags: [
        'Urgent language pressuring immediate action ("verify" and "suspension").',
        'Link domain does not match Apple ("apple-auth.ru").',
        'Sender domain "apple-security.com" is not an official Apple domain.'
      ]
    },
    {
      id: 'amazon-order',
      senderName: 'Amazon',
      senderEmail: 'order-update@amazon.com',
      subject: 'Your order has shipped! 📦',
      preview: 'Track your order from Your Orders page.',
      date: Date.now() - 1000 * 60 * 60 * 10,
      isPhish: false,
      bodyLines: [
        'Hello John,',
        'Your order #112-3958383-138383 has shipped.',
        'Track it from Your Orders. This message was sent to your verified email.',
        'For your security, Amazon will never ask for your password via email.'
      ],
      goodPhrases: ['Your Orders', 'never ask for your password', 'amazon.com'],
      redFlags: []
    },
    {
      id: 'bank-verify',
      senderName: 'City National Bank',
      senderEmail: 'support@citynattbank.com',
      subject: 'Account on Hold – Verify Now',
      preview: 'We temporarily disabled your account due to unusual activity.',
      date: Date.now() - 1000 * 60 * 60 * 22,
      isPhish: true,
      bodyLines: [
        'Dear Account Holder,',
        'We detected unusual activity and placed a temporary hold on your account.',
        'To restore access, please confirm your SSN and debit card PIN immediately.',
        'Click to restore: http://citynattbank.com-verify-login.info',
      ],
      flaggedPhrases: ['SSN', 'PIN', 'verify', 'hold', 'login.info'],
      redFlags: [
        'Requests sensitive information (SSN, PIN) via email.',
        'Misspelled domain ("citynattbank" vs "citynationalbank").',
        'Suspicious link ending with ".info" and hyphenated lookalike.'
      ]
    },
    {
      id: 'hr-benefits',
      senderName: 'HR Team',
      senderEmail: 'benefits@company.com',
      subject: 'Open Enrollment Starts Monday',
      preview: 'Review your health plan options and make selections by the deadline.',
      date: Date.now() - 1000 * 60 * 60 * 36,
      isPhish: false,
      bodyLines: [
        'Hi all,',
        'Open Enrollment starts Monday. Details are on the HR portal.',
        'We do not collect personal data over email. Use SSO to sign in.'
      ],
      goodPhrases: ['HR portal', 'SSO', 'company.com'],
      redFlags: []
    },
    {
      id: 'password-expiry',
      senderName: 'IT Support',
      senderEmail: 'it-support@companny-it.com',
      subject: 'Password expires in 24 hours',
      preview: 'Avoid losing access. Update your password to keep your account active.',
      date: Date.now() - 1000 * 60 * 60 * 4,
      isPhish: true,
      bodyLines: [
        'Hello,',
        'Your password will expire in 24 hours. Failure to act will result in account lockout.',
        'Update now: http://companny-it.com/reset',
      ],
      flaggedPhrases: ['24 hours', 'lockout', 'companny-it.com'],
      redFlags: [
        'Misspelled sender domain ("companny-it.com").',
        'Threatening language to rush action.',
        'Unsecured http link.'
      ]
    },
    {
      id: 'drive-share',
      senderName: 'Priya from Marketing',
      senderEmail: 'priya@company.com',
      subject: 'Shared a folder: Q4 Assets',
      preview: 'You have been given access to Q4 Assets.',
      date: Date.now() - 1000 * 60 * 60 * 8,
      isPhish: false,
      bodyLines: [
        'Hi,',
        'I shared the Q4 Assets folder with your team.',
        'Access via Google Drive. Links open only after SSO.'
      ],
      goodPhrases: ['Google Drive', 'SSO'],
      redFlags: []
    },
    {
      id: 'giftcard',
      senderName: 'Rewards Team',
      senderEmail: 'rewards@promo-gifts.co',
      subject: 'Congratulations! You won a $500 Gift Card 🎁',
      preview: 'Claim within 12 hours to avoid forfeiture.',
      date: Date.now() - 1000 * 60 * 60 * 3,
      isPhish: true,
      bodyLines: [
        'Congratulations!',
        'You have been selected to receive a $500 gift card.',
        'Claim within 12 hours: http://promo-gifts.co/claim',
        'Just enter your password to verify.'
      ],
      flaggedPhrases: ['Congratulations', '12 hours', 'password', 'promo-gifts.co'],
      redFlags: [
        'Too-good-to-be-true reward with deadline.',
        'Requests your password in exchange for a prize.',
        'Unsecured link to unfamiliar domain.'
      ]
    },
    {
      id: 'it-mfa',
      senderName: 'IT Service Desk',
      senderEmail: 'servicedesk@company.com',
      subject: 'MFA rollout completed',
      preview: 'No action required unless your device is out of date.',
      date: Date.now() - 1000 * 60 * 60 * 15,
      isPhish: false,
      bodyLines: [
        'Hello team,',
        'MFA rollout is complete. No action needed.',
        'If you cannot sign in, open a ticket in the portal.'
      ],
      goodPhrases: ['No action needed', 'open a ticket'],
      redFlags: []
    },
    {
      id: 'linkedin',
      senderName: 'LinkedIn',
      senderEmail: 'messages-noreply@linkedin.com',
      subject: 'You have 3 new connection requests',
      preview: 'View and manage your invitations.',
      date: Date.now() - 1000 * 60 * 60 * 50,
      isPhish: false,
      bodyLines: [
        'You have 3 new invitations.',
        'To change email preferences, visit Settings & Privacy on LinkedIn.'
      ],
      goodPhrases: ['linkedin.com', 'Settings & Privacy'],
      redFlags: []
    },
    {
      id: 'crypto-airdrop',
      senderName: 'Web3 Foundation',
      senderEmail: 'airdrop@web3-foundatlon.org',
      subject: 'Airdrop: Claim 1.5 ETH now',
      preview: 'Wallet snapshot eligible users can claim within 2 hours.',
      date: Date.now() - 1000 * 60 * 60 * 1,
      isPhish: true,
      bodyLines: [
        'Dear user,',
        'Your wallet qualifies for a one-time airdrop.',
        'Claim now and enter your seed phrase to verify your ownership.'
      ],
      flaggedPhrases: ['seed phrase', 'airdrop', 'Claim now', '2 hours', 'foundatlon'],
      redFlags: [
        'Requests your seed phrase (never share).',
        'Homograph domain ("foundatlon" uses letter l instead of i).',
        'Artificial urgency.'
      ]
    },
    {
      id: 'docusign',
      senderName: 'DocuSign',
      senderEmail: 'dse_na2@docusign.net',
      subject: 'Please sign: NDA - ACME Corp',
      preview: 'Document is ready for your signature.',
      date: Date.now() - 1000 * 60 * 60 * 28,
      isPhish: false,
      bodyLines: [
        'ACME Corp has sent you a document to review and sign.',
        'This email was sent from an automated system; links require login.'
      ],
      goodPhrases: ['docusign.net', 'automated system'],
      redFlags: []
    },
    {
      id: 'invoice-zip',
      senderName: 'Accounts Payable',
      senderEmail: 'ap@contoso-invoices.com',
      subject: 'Invoice 87213 attached',
      preview: 'Please see the attached invoice and remit payment.',
      date: Date.now() - 1000 * 60 * 60 * 12,
      isPhish: true,
      bodyLines: [
        'Hello,',
        'Attached invoice 87213 in ZIP format. Enable macros to view.',
        'Download here: http://contoso-invoices.com/invoice87213.zip'
      ],
      flaggedPhrases: ['ZIP', 'Enable macros', '.zip', 'http://'],
      redFlags: [
        'Mentions enabling macros (common malware vector).',
        'Links to a .zip download over http.',
        'Unknown sender domain.'
      ]
    },
    {
      id: 'security-training',
      senderName: 'Security Training',
      senderEmail: 'training@company.com',
      subject: 'Reminder: Phishing training this Friday',
      preview: 'Join the 30-minute session and earn a badge.',
      date: Date.now() - 1000 * 60 * 60 * 6,
      isPhish: false,
      bodyLines: [
        'Hi team,',
        'Join our 30-minute session on phishing red flags.',
        'No links needed; just add to your calendar.'
      ],
      goodPhrases: ['No links needed'],
      redFlags: []
    }
  ];

  // --- State ---
  const state = {
    emails: [],
    filteredEmailIds: null,
    selectedIndex: 0,
    score: 0,
    attemptedById: new Map(),
    hintsRevealedById: new Map(),
  };

  // --- Elements ---
  const inboxEl = document.getElementById('inbox');
  const searchEl = document.getElementById('search');
  const scoreEl = document.getElementById('score-display');
  const progressEl = document.getElementById('progress-display');
  const fromAvatarEl = document.getElementById('from-avatar');
  const fromNameEl = document.getElementById('from-name');
  const fromEmailEl = document.getElementById('from-email');
  const emailDateEl = document.getElementById('email-date');
  const emailSubjectEl = document.getElementById('email-subject');
  const emailBodyEl = document.getElementById('email-body');
  const feedbackEl = document.getElementById('feedback');
  const cluesEl = document.getElementById('clues');
  const summaryEl = document.getElementById('summary');

  const btnPhish = document.getElementById('btn-phish');
  const btnSafe = document.getElementById('btn-safe');
  const btnHint = document.getElementById('btn-hint');
  const btnExplain = document.getElementById('btn-explain');
  const btnRestart = document.getElementById('btn-restart');
  const btnTheme = document.getElementById('btn-theme');

  // --- Theme toggle ---
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if (prefersLight) document.documentElement.classList.add('light');
  btnTheme.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
  });

  // Simple light theme overrides
  const lightStyle = document.createElement('style');
  lightStyle.textContent = `
    .light { --bg: #f5f7fb; --panel: #ffffff; --panel-2: #f7f9fc; --text: #0f1726; --muted: #5a6b7d; --border: #e5eaf1; }
    .light body { background: #eef3fb; }
    .light .inbox-item:hover { background: rgba(0,0,0,0.04); }
    .light .inbox-item.active { background: rgba(79, 140, 255, 0.14); }
    .light .email-body .highlight { color: #0f1726; }
  `;
  document.head.appendChild(lightStyle);

  // --- Initialization ---
  function init() {
    state.emails = shuffleArray(EMAILS).map((e, i) => ({ ...e, _idx: i }));
    state.selectedIndex = 0;
    state.score = 0;
    state.attemptedById.clear();
    state.hintsRevealedById.clear();

    renderInbox();
    selectEmail(0);
    updateScore();
    updateProgress();
    feedbackEl.innerHTML = '';
    cluesEl.innerHTML = '';
    summaryEl.classList.add('hidden');
    Confetti.stop();
  }

  // --- Rendering ---
  function renderInbox() {
    const filter = (searchEl.value || '').trim().toLowerCase();
    const emails = state.emails;
    inboxEl.innerHTML = '';
    let visibleCount = 0;

    emails.forEach((email, idx) => {
      const matches = !filter || [email.senderName, email.senderEmail, email.subject].some(s => s.toLowerCase().includes(filter));
      if (!matches) return;
      visibleCount++;

      const li = el('li', 'inbox-item');
      li.dataset.index = String(idx);
      if (idx === state.selectedIndex) li.classList.add('active');

      const avatar = el('div', 'avatar');
      avatar.textContent = getAvatarEmoji(email);

      const main = el('div');
      const top = el('div', 'top');
      const subject = el('div', 'subject', email.subject);
      const from = el('div', 'from', `${email.senderName} <${email.senderEmail}>`);
      const preview = el('div', 'preview', email.preview);
      top.appendChild(subject);
      top.appendChild(from);
      main.appendChild(top);
      main.appendChild(preview);

      const right = el('div', 'date');
      right.textContent = formatDate(email.date);

      // Add small badge if already attempted
      const badge = el('span', 'badge');
      const attempted = state.attemptedById.get(email.id);
      if (attempted !== undefined) {
        badge.textContent = attempted ? 'Phish' : 'Safe';
        badge.classList.add(attempted ? 'phish' : 'safe');
        right.appendChild(el('div', '')); // spacer
        right.appendChild(badge);
      }

      li.appendChild(avatar);
      li.appendChild(main);
      li.appendChild(right);

      li.addEventListener('click', () => selectEmail(idx));
      inboxEl.appendChild(li);
    });

    // Update filtered ids
    state.filteredEmailIds = null;
    if (filter) {
      state.filteredEmailIds = Array.from(inboxEl.querySelectorAll('.inbox-item')).map(item => state.emails[Number(item.dataset.index)].id);
    }

    // Update progress count (based on total, not filter)
    updateProgress();
  }

  function selectEmail(index) {
    if (index < 0 || index >= state.emails.length) return;
    state.selectedIndex = index;

    // Set active styling
    inboxEl.querySelectorAll('.inbox-item').forEach(item => item.classList.remove('active'));
    const activeItem = inboxEl.querySelector(`.inbox-item[data-index="${index}"]`);
    if (activeItem) activeItem.classList.add('active');

    const email = state.emails[index];

    fromAvatarEl.textContent = getAvatarEmoji(email);
    fromNameEl.textContent = email.senderName;
    fromEmailEl.textContent = `<${email.senderEmail}>`;
    emailDateEl.textContent = formatDate(email.date);
    emailSubjectEl.textContent = email.subject;

    renderBody(email);
    renderClues(email, false);
    renderFeedback('');

    updateActionButtons();
  }

  function renderBody(email) {
    const highlightPhrases = email.flaggedPhrases || [];
    const goodPhrases = email.goodPhrases || [];

    const body = email.bodyLines.map(line => {
      // First highlight flagged phrases, then good phrases (avoid double wrapping by doing good second on escaped text)
      let html = wrapPhrases(line, highlightPhrases, 'highlight');
      // Apply good phrases highlight on the already-escaped html; keep it simple by doing a second pass
      goodPhrases.forEach(p => {
        const re = new RegExp(`(${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        html = html.replace(re, `<span class="goodlight">$1<\/span>`);
      });
      return `<p>${html}</p>`;
    }).join('');

    emailBodyEl.innerHTML = body;

    // Convert any URL-like text into disabled links for realism
    convertUrlsToDisabledLinks(emailBodyEl);
    preventAllLinkNavigation(emailBodyEl);
  }

  function convertUrlsToDisabledLinks(container) {
    const urlRe = /(?:(https?:\/\/)?([\w.-]+)\.[a-z]{2,}(?:\/[\w\-.\/?%&=+#]*)?)/ig;
    container.querySelectorAll('p').forEach(p => {
      p.innerHTML = p.innerHTML.replace(urlRe, (m) => {
        if (m.startsWith('<')) return m; // skip if already HTML
        let href = m.startsWith('http') ? m : `https://${m}`;
        const text = m;
        return `<a href="${href}" tabindex="-1">${escapeHtml(text)}</a>`;
      });
    });
  }

  function renderClues(email, revealAll) {
    const countRevealed = state.hintsRevealedById.get(email.id) || 0;
    const toShow = revealAll ? (email.redFlags || []) : (email.redFlags || []).slice(0, countRevealed);

    cluesEl.innerHTML = '';
    toShow.forEach((msg, i) => {
      const div = el('div', 'clue');
      const tag = el('span', 'tag', `Clue ${i+1}`);
      const text = el('span', '', msg);
      div.appendChild(tag); div.appendChild(text);
      cluesEl.appendChild(div);
    });
  }

  function renderFeedback(html) {
    feedbackEl.innerHTML = html || '';
  }

  function updateActionButtons() {
    const email = state.emails[state.selectedIndex];
    const attempted = state.attemptedById.get(email.id);
    const done = attempted !== undefined;

    btnPhish.disabled = done;
    btnSafe.disabled = done;

    btnHint.disabled = done || (email.redFlags || []).length === 0;
    btnExplain.disabled = false;
  }

  function updateScore() {
    scoreEl.textContent = `Score: ${state.score}`;
  }

  function updateProgress() {
    const attemptedCount = state.attemptedById.size;
    const total = state.emails.length;
    progressEl.textContent = `${attemptedCount} / ${total}`;
  }

  function allAttempted() {
    return state.attemptedById.size === state.emails.length;
  }

  function getAvatarEmoji(email) {
    if (email.isPhish) return '🕳️';
    const map = ['📧', '💼', '🏢', '📦', '🗂️', '🛡️', '📝'];
    return map[email.senderName.length % map.length];
  }

  // --- Actions ---
  function classifyCurrent(isPhishChoice) {
    const email = state.emails[state.selectedIndex];
    if (state.attemptedById.has(email.id)) return; // already answered

    const correct = email.isPhish === isPhishChoice;
    if (correct) state.score += 1;
    state.attemptedById.set(email.id, isPhishChoice);

    renderFeedback(`<span class="${correct ? 'correct' : 'incorrect'}">${correct ? 'Correct!' : 'Not quite.'}</span> ${explainSentence(email, correct)}`);
    updateScore();
    updateProgress();
    updateActionButtons();
    renderInbox();

    if (allAttempted()) {
      setTimeout(showSummary, 500);
    }
  }

  function explainSentence(email, wasCorrect) {
    if (email.isPhish) {
      const reason = email.redFlags[0] || 'Contains common phishing indicators.';
      return `This was phishing. ${reason}`;
    } else {
      const good = (email.goodPhrases && email.goodPhrases[0]) || 'Contains no obvious red flags.';
      return `This was safe. ${good}`;
    }
  }

  function revealNextHint() {
    const email = state.emails[state.selectedIndex];
    const current = state.hintsRevealedById.get(email.id) || 0;
    const total = (email.redFlags || []).length;
    if (current >= total) return;
    state.hintsRevealedById.set(email.id, current + 1);
    renderClues(email, false);
  }

  function explainAll() {
    const email = state.emails[state.selectedIndex];
    renderClues(email, true);
  }

  function nextUnattempted() {
    const nextIdx = state.emails.findIndex((e, i) => !state.attemptedById.has(e.id) && i !== state.selectedIndex);
    if (nextIdx >= 0) selectEmail(nextIdx);
  }

  function showSummary() {
    const total = state.emails.length;
    const correct = state.score;
    const scorePct = Math.round((correct / total) * 100);

    const missed = state.emails.filter(e => {
      const attempted = state.attemptedById.get(e.id);
      return attempted !== undefined && attempted !== e.isPhish;
    });

    const card = el('div', 'summary-card');
    const title = el('h3', '', `Round complete: ${correct}/${total} correct (${scorePct}%)`);
    const subtitle = el('p', 'muted', scorePct >= 80 ? 'Great job! 🎉 You earned a Phish Finder badge.' : 'Nice effort! Review the missed emails below.');

    const grid = el('div', 'grid');
    if (missed.length === 0) {
      const allGood = el('div', 'miss', 'You classified all emails correctly!');
      grid.appendChild(allGood);
    } else {
      missed.forEach(e => {
        const div = el('div', 'miss');
        const h = el('div', 'subject', `${e.subject}`);
        const meta = el('div', 'muted', `${e.senderName} <${e.senderEmail}>`);
        const why = el('div', '', e.isPhish ? `Phish because: ${e.redFlags[0]}` : `Safe because: ${(e.goodPhrases && e.goodPhrases[0]) || 'no obvious red flags'}`);
        div.appendChild(h); div.appendChild(meta); div.appendChild(why);
        grid.appendChild(div);
      });
    }

    const actions = el('div', 'actions');
    const again = el('button', 'primary', 'Play again');
    again.addEventListener('click', () => { summaryEl.classList.add('hidden'); init(); });
    actions.appendChild(again);

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(grid);
    card.appendChild(el('div', '', ' '));
    card.appendChild(actions);

    summaryEl.innerHTML = '';
    summaryEl.appendChild(card);
    summaryEl.classList.remove('hidden');

    if (scorePct >= 80) Confetti.start(2500);
  }

  // --- Event wiring ---
  btnPhish.addEventListener('click', () => { classifyCurrent(true); nextUnattempted(); });
  btnSafe.addEventListener('click', () => { classifyCurrent(false); nextUnattempted(); });
  btnHint.addEventListener('click', revealNextHint);
  btnExplain.addEventListener('click', explainAll);
  btnRestart.addEventListener('click', init);
  searchEl.addEventListener('input', renderInbox);

  // Start
  init();
})();
