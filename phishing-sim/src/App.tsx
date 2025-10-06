import { useMemo, useState } from 'react';
import './App.css';
import { EMAILS } from './data/emails';
import type { Email, EmailResult, UserChoice } from './types';
import { shuffleArray } from './utils/shuffle';
import ScoreBar from './components/ScoreBar';
import Inbox from './components/Inbox';
import EmailView from './components/EmailView';
import HintPanel from './components/HintPanel';

type RoundState = {
  orderedEmails: Email[];
  selectedId: string | null;
  results: Record<string, EmailResult>;
  revealHeaders: boolean;
  score: number;
  streak: number;
};

const INITIAL_HINTS_USED = 0;

function createInitialResults(emails: Email[]): Record<string, EmailResult> {
  const entries: [string, EmailResult][] = emails.map((e) => [e.id, {
    emailId: e.id,
    userChoice: null,
    correct: null,
    hintsUsed: INITIAL_HINTS_USED,
    elapsedMs: 0,
  }]);
  return Object.fromEntries(entries);
}

function App() {
  const [seed, setSeed] = useState<number>(Math.floor(Math.random() * 100000));
  const orderedEmails = useMemo(() => shuffleArray(EMAILS, seed), [seed]);
  const [state, setState] = useState<RoundState>({
    orderedEmails,
    selectedId: orderedEmails[0]?.id ?? null,
    results: createInitialResults(orderedEmails),
    revealHeaders: false,
    score: 0,
    streak: 0,
  });

  const answeredCount = useMemo(
    () => Object.values(state.results).filter((r) => r.userChoice !== null).length,
    [state.results],
  );

  function selectEmail(emailId: string) {
    setState((prev) => ({ ...prev, selectedId: emailId }));
  }

  function mark(choice: UserChoice) {
    setState((prev) => {
      const selected = prev.selectedId ? prev.orderedEmails.find((e) => e.id === prev.selectedId) : null;
      if (!selected) return prev;
      const already = prev.results[selected.id];
      if (already.userChoice !== null) return prev; // prevent double answer

      const isCorrect = (choice === 'phishing') === selected.isPhishing;
      const basePoints = isCorrect ? 100 : 0;
      const hintPenalty = already.hintsUsed * 20;
      const points = Math.max(0, basePoints - hintPenalty);
      const nextScore = prev.score + points;
      const nextStreak = isCorrect ? prev.streak + 1 : 0;

      const nextResults: Record<string, EmailResult> = {
        ...prev.results,
        [selected.id]: {
          ...already,
          userChoice: choice,
          correct: isCorrect,
          elapsedMs: 0,
        },
      };

      // Auto-advance to next unanswered email
      const unanswered = prev.orderedEmails.find((e) => nextResults[e.id].userChoice === null);

      return {
        ...prev,
        results: nextResults,
        score: nextScore,
        streak: nextStreak,
        selectedId: unanswered ? unanswered.id : prev.selectedId,
      };
    });
  }

  function revealHint() {
    setState((prev) => {
      const selected = prev.selectedId ? prev.orderedEmails.find((e) => e.id === prev.selectedId) : null;
      if (!selected) return prev;
      const r = prev.results[selected.id];
      if (r.userChoice !== null) return prev; // no hints after answer
      const next = { ...prev.results };
      next[selected.id] = { ...r, hintsUsed: Math.min((selected.cues?.length ?? 0), r.hintsUsed + 1) };
      return { ...prev, results: next };
    });
  }

  function toggleHeaders() {
    setState((prev) => ({ ...prev, revealHeaders: !prev.revealHeaders }));
  }

  function restartRound() {
    const nextSeed = Math.floor(Math.random() * 100000);
    const nextEmails = shuffleArray(EMAILS, nextSeed);
    setSeed(nextSeed);
    setState({
      orderedEmails: nextEmails,
      selectedId: nextEmails[0]?.id ?? null,
      results: createInitialResults(nextEmails),
      revealHeaders: false,
      score: 0,
      streak: 0,
    });
  }

  const selectedEmail = state.selectedId ? state.orderedEmails.find((e) => e.id === state.selectedId) ?? null : null;

  const itemStates = useMemo(() => {
    const map: Record<string, 'unanswered' | 'correct' | 'incorrect'> = {};
    for (const e of state.orderedEmails) {
      const r = state.results[e.id];
      if (!r || r.userChoice === null) map[e.id] = 'unanswered';
      else map[e.id] = r.correct ? 'correct' : 'incorrect';
    }
    return map;
  }, [state.orderedEmails, state.results]);

  const totalCount = state.orderedEmails.length;
  const finished = answeredCount === totalCount && totalCount > 0;

  return (
    <div className="app">
      <ScoreBar score={state.score} answeredCount={answeredCount} totalCount={totalCount} streak={state.streak} />

      <div className="layout">
        <Inbox emails={state.orderedEmails} selectedId={state.selectedId} onSelect={selectEmail} itemStates={itemStates} />
        <div className="content">
          <EmailView
            email={selectedEmail ?? null}
            onMark={mark}
            onHint={revealHint}
            revealHeaders={state.revealHeaders}
            toggleHeaders={toggleHeaders}
          />
          {selectedEmail && (
            <HintPanel hints={selectedEmail.cues} used={state.results[selectedEmail.id]?.hintsUsed ?? 0} />
          )}

          {finished && (
            <div className="summary">
              <div className="summary__title">Round complete!</div>
              <div className="summary__score">Final score: {state.score}</div>
              <div className="summary__list">
                {state.orderedEmails.map((e) => {
                  const r = state.results[e.id];
                  return (
                    <div key={e.id} className={`summary__item ${r.correct ? 'summary__item--correct' : 'summary__item--incorrect'}`}>
                      <div className="summary__item__subject">{e.subject}</div>
                      <div className="summary__item__answer">You marked: {r.userChoice}</div>
                      <div className="summary__item__truth">Truth: {e.isPhishing ? 'phishing' : 'safe'}</div>
                      {e.cues && e.cues.length > 0 && (
                        <ul className="summary__cues">
                          {e.cues.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="btn btn--primary" onClick={restartRound}>Play again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
