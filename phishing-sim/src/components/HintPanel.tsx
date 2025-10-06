import type { FC } from 'react';

export const HintPanel: FC<{ hints: string[]; used: number }> = ({ hints, used }) => {
  if (hints.length === 0 || used === 0) return null;
  return (
    <div className="hintpanel">
      <div className="hintpanel__title">Hints revealed</div>
      <ul>
        {hints.slice(0, used).map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
};

export default HintPanel;
