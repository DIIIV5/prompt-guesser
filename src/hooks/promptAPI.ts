import type { PromptProps, ResponseProps, PromptResponseProps } from "../types/promptTypes";

const defaultPrompts: PromptProps[] = [
  {
    id: "1",
    prompt: "Write a short story about a robot learning to paint"
  },
  {
    id: "2",
    prompt: "Create a poem about the changing seasons"
  },
  {
    id: "3",
    prompt: "Describe a futuristic city where everyone can fly"
  },
  {
    id: "4",
    prompt: "Write a dialogue between a cat and a dog discussing their day"
  },
  {
    id: "5",
    prompt: "Create a recipe for a magical dessert that changes color"
  }
]


const defaultResponses: ResponseProps[] =
[
  {
    id: "1",
    prompt: "A metallic hand carefully dips a brush into vibrant paint...",
    promptID: "1"
  },
  {
    id: "2", 
    prompt: "Golden leaves dance in autumn's breeze...",
    promptID: "2"
  },
  {
    id: "3",
    prompt: "Skyscrapers pierce the clouds as citizens soar between buildings...",
    promptID: "3"
  },
  {
    id: "4",
    prompt: "The cat stretches lazily and says, 'I spent the day napping in the sun...'",
    promptID: "4"
  },
  {
    id: "5",
    prompt: "Mix stardust with rainbow sugar and moonlight essence...",
    promptID: "5"
  }
]


const getPromptsResponses = () => {
  return {
    prompts: defaultPrompts,
    responses: defaultResponses
  }
}

const shufflePrompts = (prompts: PromptProps[]) => {
  const shuffledPrompts = [...prompts].sort(() => Math.random() - 0.5);
  return shuffledPrompts;
}

const shuffleResponses = (responses: ResponseProps[]) => {
  const shuffledResponses = [...responses].sort(() => Math.random() - 0.5);
  return shuffledResponses;
}

export const shufflePromptsAndResponses = (promptsAndResponses: PromptResponseProps) => {
  return {
    prompts: shufflePrompts(promptsAndResponses.prompts),
    responses: shuffleResponses(promptsAndResponses.responses)
  }
}

export default getPromptsResponses;

