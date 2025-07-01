import { useState, useEffect } from 'react';
import type { PromptResponseProps } from '../types/promptTypes';
import getPromptsResponses, { getTemperaturePromptResponses, shufflePromptsAndResponses, shuffleResponses } from '../hooks/promptAPI';
import { usePromptGame } from '../hooks/usePromptGame';
import { GameHeader } from './GameHeader';
import { GameGrid } from './GameGrid';
import './PromptGuesser.css';
import BasePromptView from './PromptView';
import { type GameType } from '../types/gameTypes';

interface GameViewProps {
  gameState: ReturnType<typeof usePromptGame>;
  onReset: () => void;
}

const GameTypeButtons: React.FC<{ setGameType: (gameType: GameType) => void }> = ({ setGameType }) => {
  return (
    <div className="game-type-buttons">
      <button className="game-type-btn" onClick={() => setGameType('prompt')}>Prompt</button>
      <button className="game-type-btn" onClick={() => setGameType('temperature')}>Temperature</button>
    </div>
  );
};

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
  const [pendingGameStart, setPendingGameStart] = useState(false);
  const [gameState, setGameState] = useState(usePromptGame(promptsAndResponses));
  const [gameType, setGameType] = useState<GameType>('prompt');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Initialize selectedPrompt with the first prompt
  useEffect(() => {
    if (promptsAndResponses.prompts.length > 0 && !selectedPrompt) {
      setSelectedPrompt(promptsAndResponses.prompts[0].prompt);
    }
  }, [promptsAndResponses.prompts, selectedPrompt]);

  // Show game after data has been updated
  useEffect(() => {
    if (pendingGameStart) {
      let shuffled = promptsAndResponses;
      if (gameType === 'temperature') {
        shuffled = {
          prompts: promptsAndResponses.prompts,
          responses: shuffleResponses(promptsAndResponses.responses)
        }
      } else {
        shuffled = shufflePromptsAndResponses(promptsAndResponses);
      }
      const newGameState = {
        shuffledData: shuffled,
        selectedPrompt: null,
        selectedResponse: null,
        matches: {},
        score: 0,
        gameComplete: false,
        incorrectMatches: { promptId: null, responseId: null },
        resetGame: gameState.resetGame,
        selectPrompt: gameState.selectPrompt,
        selectResponse: gameState.selectResponse,
        clearIncorrectMatch: gameState.clearIncorrectMatch
      };
      setGameState(newGameState);
      setShowGame(true);
      setPendingGameStart(false);
    }
  }, [pendingGameStart, promptsAndResponses, gameState, gameType]);

  const handleStartGame = () => {
    console.log('handleStartGame', gameType);
    if (gameType === 'temperature') {

      const prompt = promptsAndResponses.prompts.find((prompt) => prompt.prompt === selectedPrompt);
      if (prompt) {
        setPromptsAndResponses(getTemperaturePromptResponses(prompt.id));
      } else {
        setPromptsAndResponses(getTemperaturePromptResponses(promptsAndResponses.prompts[0].id));
      }
    }
    if (gameType === 'prompt') {
      setPromptsAndResponses(getPromptsResponses());
    }
    setPendingGameStart(true);
  };

  const handleReset = () => {
    setPromptsAndResponses(getPromptsResponses());
    setGameType('prompt');
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
        <GameTypeButtons setGameType={setGameType} />
      </div>

      {!showGame ? (
        <BasePromptView 
          prompts={promptsAndResponses.prompts} 
          onStartGame={handleStartGame} 
          gameType={gameType} 
          onSelectPrompt={setSelectedPrompt}
          selectedPrompt={selectedPrompt}
          customPrompt={customPrompt}
          onCustomPromptChange={setCustomPrompt}
        />
      ) : (
        <GameView gameState={gameState} onReset={handleReset} />
      )}
    </div>
  );
};

export default PromptGuesser;


