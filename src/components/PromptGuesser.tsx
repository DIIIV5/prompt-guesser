import { useState } from 'react';
import type { PromptResponseProps, PromptProps, ResponseProps } from '../types/promptTypes';
import getPromptsResponses, { shufflePromptsAndResponses } from '../hooks/promptAPI';
import './PromptGuesser.css';

interface PromptViewProps {
  prompts: PromptProps[],
  handleSendPrompts: () => void;
}

interface PromptGameProps extends PromptViewProps {
  responses: ResponseProps[],
  gameComplete: boolean, 
  selectedPrompt: string | null;
  selectedResponse: string | null;
  matches: Record<string, string>;
  score: number,
  incorrectMatches: { promptId: string | null, responseId: string | null }
  setGameComplete: React.Dispatch<React.SetStateAction<boolean>>;
  handlePromptSelect: (promptId: string) => void;
  handleResponseSelect: (responseId: string) => void;
  checkMatch: (promptId: string, responseId: string) => void;
} 

const PromptGameView: React.FC<PromptGameProps> = (promptGameProps) => {
  return (
    <div className="matching-game">
      <div className="game-header">
        <div className="score-display">
          <span className="score-text">Matches: </span>
          <span className="score-number">{promptGameProps.score}</span>
          <span className="score-text"> / {promptGameProps.prompts.length}</span>
        </div>
        {promptGameProps.gameComplete && (
          <div className="game-complete">
            <h2 className="complete-title">🎉 Game Complete! 🎉</h2>
            <p className="complete-text">All prompts matched successfully!</p>
          </div>
        )}
      </div>

      <div className="game-grid">
        <div className="prompts-column">
          <h2 className="column-title">Prompts</h2>
          {promptGameProps.prompts.map((prompt) => (
            <div 
              key={prompt.id} 
              className={`prompt-card ${promptGameProps.selectedPrompt === prompt.id ? 'selected' : ''} ${
                promptGameProps.matches[prompt.id] ? 'matched' : ''
              } ${promptGameProps.incorrectMatches.promptId === prompt.id ? 'incorrect' : ''}`}
              onClick={() => promptGameProps.handlePromptSelect(prompt.id)}
            >
              <p className="prompt-text">{prompt.prompt}</p>
              {promptGameProps.matches[prompt.id] && (
                <div className="match-indicator">✓ Matched</div>
              )}
            </div>
          ))}
        </div>

        <div className="responses-column">
          <h2 className="column-title">Responses</h2>
          {promptGameProps.responses.map((response) => (
            <div 
              key={response.id} 
              className={`response-card ${promptGameProps.selectedResponse === response.id ? 'selected' : ''} ${
                Object.values(promptGameProps.matches).includes(response.id) ? 'matched' : ''
              } ${promptGameProps.incorrectMatches.responseId === response.id ? 'incorrect' : ''}`}
              onClick={() => promptGameProps.handleResponseSelect(response.id)}
            >
              <p className="response-text">{response.prompt}</p>
              {Object.values(promptGameProps.matches).includes(response.id) && (
                <div className="match-indicator">✓ Matched</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="game-controls">
        <button 
          className="reset-btn"
          onClick={promptGameProps.handleSendPrompts}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

const PromptView: React.FC<PromptViewProps> = ({prompts, handleSendPrompts}: PromptViewProps) => {
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
      <button 
        className="send-prompts-btn"
        onClick={handleSendPrompts}
      >
        Send Prompts
      </button>
    </div>
  );
}

const PromptGuesser: React.FC = () => {
  const [promptsAndResponses] = useState<PromptResponseProps>(getPromptsResponses());
  const [shuffledData, setShuffledData] = useState<PromptResponseProps>({ prompts: [], responses: [] });
  const [showResponses, setShowResponses] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [incorrectMatches, setIncorrectMatches] = useState<{promptId: string | null, responseId: string | null}>({ promptId: null, responseId: null });

  const handleSendPrompts = () => {
    const shuffled = shufflePromptsAndResponses(promptsAndResponses);
    setShuffledData(shuffled);
    setShowResponses(true);
    setSelectedPrompt(null);
    setSelectedResponse(null);
    setMatches({});
    setScore(0);
    setGameComplete(false);
  };

  const handlePromptSelect = (promptId: string) => {
    if (gameComplete) return;
    setSelectedPrompt(promptId);
    if (selectedResponse) {
      checkMatch(promptId, selectedResponse);
    }
  };

  const handleResponseSelect = (responseId: string) => {
    if (gameComplete) return;
    setSelectedResponse(responseId);
    if (selectedPrompt) {
      checkMatch(selectedPrompt, responseId);
    }
  };

  const checkMatch = (promptId: string, responseId: string) => {
    const originalPrompt = promptsAndResponses.prompts.find(p => p.id === promptId);
    const selectedResponse = promptsAndResponses.responses.find(r => r.id === responseId);
    
    if (originalPrompt && selectedResponse && originalPrompt.id === selectedResponse.promptID) {
      // Correct match
      setMatches(prev => ({ ...prev, [promptId]: responseId }));
      setScore(prev => prev + 1);
      setTimeout(() => {
        setSelectedPrompt(null);
        setSelectedResponse(null);
      }, 500);

      // Check if game is complete
      if (score + 1 === promptsAndResponses.prompts.length) {
        setGameComplete(true);
      }
    } else {
      // Incorrect match - flash red briefly
      setIncorrectMatches({ promptId, responseId });
      setTimeout(() => {
        setSelectedPrompt(null);
        setSelectedResponse(null);
      }, 500);
    }
  };

  return (
    <div className="prompt-guesser-container">
      <div className="prompt-guesser-header">
        <h1 className="prompt-guesser-title">Prompt Matcher</h1>
        <p className="prompt-guesser-subtitle">Match AI Prompts with Their Responses</p>
      </div>

      {!showResponses ? (<PromptView prompts={promptsAndResponses.prompts} handleSendPrompts={handleSendPrompts} />
      ) : (
        <PromptGameView
          prompts={shuffledData.prompts}
          responses={shuffledData.responses}
          gameComplete={gameComplete}
          selectedPrompt={selectedPrompt}
          selectedResponse={selectedResponse}
          matches={matches}
          score={score}
          incorrectMatches={incorrectMatches}
          setGameComplete={setGameComplete}
          handlePromptSelect={handlePromptSelect}
          handleResponseSelect={handleResponseSelect}
          handleSendPrompts={handleSendPrompts}
          checkMatch={checkMatch}
        />
      )}
    </div>
  );
};

export default PromptGuesser;


