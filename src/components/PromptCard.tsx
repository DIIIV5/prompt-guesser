import React from 'react';
import type { PromptProps } from '../types/promptTypes';
import { classNames } from '../utils/classNames';

interface PromptCardProps {
  prompt: PromptProps;
  isSelected: boolean;
  isMatched: boolean;
  isIncorrect: boolean;
  onClick: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  isSelected,
  isMatched,
  isIncorrect,
  onClick
}) => {
  const cardClasses = classNames('prompt-card', {
    selected: isSelected,
    matched: isMatched,
    incorrect: isIncorrect
  });

  return (
    <div className={cardClasses} onClick={onClick}>
      <p className="prompt-text">{prompt.prompt}</p>
      {isMatched && (
        <div className="match-indicator">✓ Matched</div>
      )}
    </div>
  );
}; 