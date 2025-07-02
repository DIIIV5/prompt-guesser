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
  gameData: PromptResponseProps;
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

const GameView: React.FC<GameViewProps> = ({ gameData, onReset }) => {
  const gameState = usePromptGame(gameData);
  
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
  const [gameKey, setGameKey] = useState(0);
  const [gameData, setGameData] = useState<PromptResponseProps>({ prompts: [], responses: [] });
  const [gameType, setGameType] = useState<GameType>('prompt');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Initialize selectedPrompt with the first prompt
  useEffect(() => {
    if (promptsAndResponses.prompts.length > 0 && !selectedPrompt) {
      setSelectedPrompt(promptsAndResponses.prompts[0].prompt);
    }
  }, [promptsAndResponses.prompts, selectedPrompt]);



  const handleStartGame = () => {
    console.log('handleStartGame', gameType);
    
    let gameData: PromptResponseProps;
    
    if (gameType === 'temperature') {
      const prompt = promptsAndResponses.prompts.find((prompt) => prompt.prompt === selectedPrompt);
      if (prompt) {
        const tempData = getTemperaturePromptResponses(prompt.id);
        gameData = {
          prompts: tempData.prompts,
          responses: shuffleResponses(tempData.responses)
        };
        setPromptsAndResponses(tempData);
      } else {
        const tempData = getTemperaturePromptResponses(promptsAndResponses.prompts[0].id);
        gameData = {
          prompts: tempData.prompts,
          responses: shuffleResponses(tempData.responses)
        };
        setPromptsAndResponses(tempData);
      }
    } else {
      const newData = getPromptsResponses();
      gameData = shufflePromptsAndResponses(newData);
      setPromptsAndResponses(newData);
    }
    
    setGameData(gameData);
    setGameKey(prev => prev + 1);
    setShowGame(true);
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
        <GameView 
          key={gameKey}
          gameData={gameData} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default PromptGuesser;


