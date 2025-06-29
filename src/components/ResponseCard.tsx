import React from 'react';
import type { ResponseProps } from '../types/promptTypes';
import { classNames } from '../utils/classNames';

interface ResponseCardProps {
  response: ResponseProps;
  isSelected: boolean;
  isMatched: boolean;
  isIncorrect: boolean;
  onClick: () => void;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({
  response,
  isSelected,
  isMatched,
  isIncorrect,
  onClick
}) => {
  const cardClasses = classNames('response-card', {
    selected: isSelected,
    matched: isMatched,
    incorrect: isIncorrect
  });

  return (
    <div className={cardClasses} onClick={onClick}>
      <p className="response-text">{response.prompt}</p>
      {isMatched && (
        <div className="match-indicator">✓ Matched</div>
      )}
    </div>
  );
}; 