import { useState, useCallback } from 'react';
import type { PromptResponseProps } from '../types/promptTypes';
import { shufflePromptsAndResponses } from './promptAPI';
import { type GameType } from '../types/gameTypes';

interface GameState {
  shuffledData: PromptResponseProps;
  gameType: GameType,
  selectedPrompt: string | null;
  selectedResponse: string | null;
  matches: Record<string, string>;
  score: number;
  gameComplete: boolean;
  incorrectMatches: { promptId: string | null; responseId: string | null };
}

export const usePromptGame = (promptsAndResponses: PromptResponseProps, gameType: GameType) => {
  const [gameState, setGameState] = useState<GameState>({
    shuffledData: promptsAndResponses,
    gameType: gameType,
    selectedPrompt: null,
    selectedResponse: null,
    matches: {},
    score: 0,
    gameComplete: false,
    incorrectMatches: { promptId: null, responseId: null }
  });

  const resetGame = useCallback(() => {
    const shuffled = shufflePromptsAndResponses(promptsAndResponses);
    setGameState({
      shuffledData: shuffled,
      gameType: 'prompt',
      selectedPrompt: null,
      selectedResponse: null,
      matches: {},
      score: 0,
      gameComplete: false,
      incorrectMatches: { promptId: null, responseId: null }
    });
  }, [promptsAndResponses]);

  const checkMatch = useCallback((promptId: string, responseId: string) => {
    const originalPrompt = promptsAndResponses.prompts.find(p => p.id === promptId);
    const selectedResponse = promptsAndResponses.responses.find(r => r.id === responseId);
    
    if (originalPrompt && selectedResponse && originalPrompt.id === selectedResponse.promptID) {
      // Correct match
      setGameState(prev => {
        const newScore = prev.score + 1;
        const newMatches = { ...prev.matches, [promptId]: responseId };
        const isComplete = newScore === promptsAndResponses.prompts.length;
        
        return {
          ...prev,
          matches: newMatches,
          score: newScore,
          gameComplete: isComplete,
          selectedPrompt: null,
          selectedResponse: null
        };
      });
    } else {
      // Incorrect match
      setGameState(prev => ({
        ...prev,
        incorrectMatches: { promptId, responseId },
        selectedPrompt: null,
        selectedResponse: null
      }));
    }
  }, [promptsAndResponses]);

  const selectPrompt = useCallback((promptId: string) => {
    if (gameState.gameComplete) return;
    
    setGameState(prev => ({
      ...prev,
      selectedPrompt: promptId
    }));

    if (gameState.selectedResponse) {
      checkMatch(promptId, gameState.selectedResponse);
    }
  }, [gameState.gameComplete, gameState.selectedResponse, checkMatch]);

  const selectResponse = useCallback((responseId: string) => {
    if (gameState.gameComplete) return;
    
    setGameState(prev => ({
      ...prev,
      selectedResponse: responseId
    }));

    if (gameState.selectedPrompt) {
      checkMatch(gameState.selectedPrompt, responseId);
    }
  }, [gameState.gameComplete, gameState.selectedPrompt, checkMatch]);

  const clearIncorrectMatch = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      incorrectMatches: { promptId: null, responseId: null }
    }));
  }, []);

  return {
    ...gameState,
    resetGame,
    selectPrompt,
    selectResponse,
    clearIncorrectMatch
  };
}; 