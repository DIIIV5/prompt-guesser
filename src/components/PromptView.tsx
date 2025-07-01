import type { PromptProps } from '../types/promptTypes';

interface PromptViewProps {
  prompts: PromptProps[];
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

export default PromptView;