import { useState, useEffect } from 'react';
import type { PromptResponseProps } from '../types/promptTypes';
import getPromptsResponses from '../hooks/promptAPI';
import { usePromptGame } from '../hooks/usePromptGame';
import { GameHeader } from './GameHeader';
import { GameGrid } from './GameGrid';
import './PromptGuesser.css';

interface PromptViewProps {
  prompts: PromptResponseProps['prompts'];
  onStartGame: () => void;
}

const PromptView: React.FC<PromptViewProps> = ({ prompts, onStartGame }) => {
  return (
    <div className="prompts-only-view">
      <div className="prompts-list">
        <h2 className="section-title">Available Prompts</h2>
        {prompts.map((prompt) => (
          <div key={prompt.id} className="prompt-item">
            <p className="prompt-text">{prompt.prompt}</p>
          </div>
        ))}
      </div>
      <button className="send-prompts-btn" onClick={onStartGame}>
        Send Prompts
      </button>
    </div>
  );
};

interface GameViewProps {
  gameState: ReturnType<typeof usePromptGame>;
  onReset: () => void;
}

const GameView: React.FC<GameViewProps> = ({ gameState, onReset }) => {
  // Clear incorrect match indicator after animation
  useEffect(() => {
    if (gameState.incorrectMatches.promptId || gameState.incorrectMatches.responseId) {
      const timer = setTimeout(() => {
        gameState.clearIncorrectMatch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  return (
    <div className="matching-game">
      <GameHeader
        score={gameState.score}
        totalPrompts={gameState.shuffledData.prompts.length}
        gameComplete={gameState.gameComplete}
      />

      <GameGrid
        prompts={gameState.shuffledData.prompts}
        responses={gameState.shuffledData.responses}
        selectedPrompt={gameState.selectedPrompt}
        selectedResponse={gameState.selectedResponse}
        matches={gameState.matches}
        incorrectMatches={gameState.incorrectMatches}
        onPromptSelect={gameState.selectPrompt}
        onResponseSelect={gameState.selectResponse}
      />

      <div className="game-controls">
        <button className="reset-btn" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

const PromptGuesser: React.FC = () => {
  const [promptsAndResponses] = useState<PromptResponseProps>(getPromptsResponses());
  const [showGame, setShowGame] = useState(false);
  const gameState = usePromptGame(promptsAndResponses);

  const handleStartGame = () => {
    gameState.resetGame();
    setShowGame(true);
  };

  const handleReset = () => {
    setShowGame(false);
  };

  return (
    <div className="prompt-guesser-container">
      <div className="prompt-guesser-header">
        <h1 className="prompt-guesser-title">Prompt Matcher</h1>
        <p className="prompt-guesser-subtitle">Match AI Prompts with Their Responses</p>
      </div>

      {!showGame ? (
        <PromptView prompts={promptsAndResponses.prompts} onStartGame={handleStartGame} />
      ) : (
        <GameView gameState={gameState} onReset={handleReset} />
      )}
    </div>
  );
};

export default PromptGuesser;


