import type { FC } from 'react';

type Props = {
  score: number;
  answeredCount: number;
  totalCount: number;
  streak: number;
};

export const ScoreBar: FC<Props> = ({ score, answeredCount, totalCount, streak }) => {
  const progressPercent = Math.round((answeredCount / Math.max(totalCount, 1)) * 100);

  return (
    <div className="scorebar">
      <div className="scorebar__left">
        <span className="scorebar__title">Phishing Lab</span>
        <span className="scorebar__progress" aria-label="progress">
          {answeredCount}/{totalCount} ({progressPercent}%)
        </span>
      </div>
      <div className="scorebar__right">
        <span className="scorebar__streak" title="Correct-in-a-row">🔥 {streak}</span>
        <span className="scorebar__score">Score: {score}</span>
      </div>
    </div>
  );
};

export default ScoreBar;
