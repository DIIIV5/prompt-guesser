import React from 'react';
import type { PromptProps, ResponseProps } from '../types/promptTypes';
import { PromptCard } from './PromptCard';
import { ResponseCard } from './ResponseCard';

interface GameGridProps {
  prompts: PromptProps[];
  responses: ResponseProps[];
  selectedPrompt: string | null;
  selectedResponse: string | null;
  matches: Record<string, string>;
  incorrectMatches: { promptId: string | null; responseId: string | null };
  onPromptSelect: (promptId: string) => void;
  onResponseSelect: (responseId: string) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  prompts,
  responses,
  selectedPrompt,
  selectedResponse,
  matches,
  incorrectMatches,
  onPromptSelect,
  onResponseSelect
}) => {
  return (
    <div className="game-grid">
      <div className="prompts-column">
        <h2 className="column-title">Prompts</h2>
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            isSelected={selectedPrompt === prompt.id}
            isMatched={!!matches[prompt.id]}
            isIncorrect={incorrectMatches.promptId === prompt.id}
            onClick={() => onPromptSelect(prompt.id)}
          />
        ))}
      </div>

      <div className="responses-column">
        <h2 className="column-title">Responses</h2>
        {responses.map((response) => (
          <ResponseCard
            key={response.id}
            response={response}
            isSelected={selectedResponse === response.id}
            isMatched={Object.values(matches).includes(response.id)}
            isIncorrect={incorrectMatches.responseId === response.id}
            onClick={() => onResponseSelect(response.id)}
          />
        ))}
      </div>
    </div>
  );
}; 