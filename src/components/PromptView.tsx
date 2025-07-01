import { type PromptProps } from '../types/promptTypes';
import { type GameType } from '../types/gameTypes';

interface PromptViewProps {
  prompts: PromptProps[];
  onStartGame: () => void;
  onSelectPrompt: (prompt: string) => void;
  gameType: GameType;
  selectedPrompt: string;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

const PromptView: React.FC<{prompts: PromptProps[]}> = ({ prompts }) => {
  return (
    <div className="prompts-list">
      <h2 className="section-title">Available Prompts</h2>
      {prompts.map((prompt) => (
        <div key={prompt.id} className="prompt-item">
          <p className="prompt-text">{prompt.prompt}</p>
        </div>
      ))}
    </div>
  );
};

const TemperaturePromptView: React.FC<{ 
  prompts: PromptProps[], 
  onSelectPrompt: (prompt: string) => void,
  selectedPrompt: string,
  customPrompt: string,
  onCustomPromptChange: (prompt: string) => void
}> = ({ prompts, onSelectPrompt, selectedPrompt, customPrompt, onCustomPromptChange }) => {
  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
  };

  const handleCustomPrompt = (prompt: string) => {
    onCustomPromptChange(prompt);
  };

  return (
    <div className="prompt-type-dropdown">
      <h2 className="prompt-guesser-instructions">Choose a prompt or enter your own</h2>
      <select className="prompt-type-dropdown" value={selectedPrompt} onChange={(e) => handleSelectPrompt(e.target.value)}>
        {prompts.map((prompt) => (
          <option key={prompt.id} value={prompt.prompt}>{prompt.prompt}</option>
        ))}
      </select>
      <input 
        className="prompt-guesser-input" 
        type="text" 
        placeholder="Enter a custom prompt" 
        value={customPrompt} 
        onChange={(e) => handleCustomPrompt(e.target.value)} 
      />
    </div>
  );
};

const BasePromptView: React.FC<PromptViewProps> = ({ prompts, onStartGame, gameType, onSelectPrompt, selectedPrompt, customPrompt, onCustomPromptChange }) => {
  return (
    <div className="prompts-only-view">
      {gameType === 'prompt' ? (
        <PromptView prompts={prompts} />
      ) : (
        <TemperaturePromptView 
          prompts={prompts} 
          onSelectPrompt={onSelectPrompt}
          selectedPrompt={selectedPrompt}
          customPrompt={customPrompt}
          onCustomPromptChange={onCustomPromptChange}
        />
      )}
      <button className="send-prompts-btn" onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default BasePromptView;