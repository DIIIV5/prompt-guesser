import { useState, useEffect } from 'react';
import type { PromptResponseProps } from '../types/promptTypes';
import getPromptsResponses, { getTemperaturePromptResponses } from '../hooks/promptAPI';
import { usePromptGame } from '../hooks/usePromptGame';
import { GameHeader } from './GameHeader';
import { GameGrid } from './GameGrid';
import './PromptGuesser.css';
import PromptView from './PromptView';

interface GameViewProps {
  gameState: ReturnType<typeof usePromptGame>;
  onReset: () => void;
}

type GameType = 'prompt' | 'temperature';

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
  const [promptsAndResponses, setPromptsAndResponses] = useState<PromptResponseProps>(getPromptsResponses());
  const [showGame, setShowGame] = useState(false);
  const gameState = usePromptGame(promptsAndResponses);
  const [gameType, setGameType] = useState<GameType>('prompt');

  const handleStartGame = () => {
    if (gameType === 'temperature') {
      setPromptsAndResponses(getTemperaturePromptResponses(promptsAndResponses.prompts[0].id));
    }
    if (gameType === 'prompt') {
      setPromptsAndResponses(getPromptsResponses());
    }
    gameState.resetGame();
    setShowGame(true);
  };

  const handleReset = () => {
    setShowGame(false);
  };

  return (
    <div className="prompt-guesser-container">
      <div className="prompt-guesser-header">
        {gameType === 'prompt' && (
          <>
            <h1 className="prompt-guesser-title">Prompt Guesser</h1>
            <p className="prompt-guesser-subtitle">Match AI Prompts with Their Responses</p>
          </>
        )}
        {gameType === 'temperature' && (
          <>
            <h1 className="prompt-guesser-title">Temperature Guesser</h1>
            <p className="prompt-guesser-subtitle">Match AI Temperatures with Their Responses</p>
          </>
        )}
        <div className="game-type-buttons">
          <button className="game-type-btn" onClick={() => setGameType('prompt')}>Prompt</button>
          <button className="game-type-btn" onClick={() => setGameType('temperature')}>Temperature</button>
        </div>
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


