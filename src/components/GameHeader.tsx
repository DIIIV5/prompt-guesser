import React from 'react';

interface GameHeaderProps {
  score: number;
  totalPrompts: number;
  gameComplete: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, totalPrompts, gameComplete }) => {
  return (
    <div className="game-header">
      <div className="score-display">
        <span className="score-text">Matches: </span>
        <span className="score-number">{score}</span>
        <span className="score-text"> / {totalPrompts}</span>
      </div>
      {gameComplete && (
        <div className="game-complete">
          <h2 className="complete-title">🎉 Game Complete! 🎉</h2>
          <p className="complete-text">All prompts matched successfully!</p>
        </div>
      )}
    </div>
  );
}; 