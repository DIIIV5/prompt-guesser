export interface PromptProps {
  id: string;
  prompt: string,
}

export interface ResponseProps {
  id: string;
  prompt: string,
  promptID: string;
}

export interface PromptResponseProps {
  prompts: PromptProps[];
  responses: ResponseProps[];
}