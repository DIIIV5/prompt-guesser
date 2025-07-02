export interface PromptProps {
  id: string;
  prompt: string,
}

export interface ResponseProps {
  id: string;
  response: string,
  promptID: string;
}

export interface PromptResponseProps {
  prompts: PromptProps[];
  responses: ResponseProps[];
}

export interface TemperatureResponsesProps {
  promptID: string;
  responses: { id: string, temperature: number, response: string }[];
}

export interface InstructionResponsesProps {
  promptID: string;
  responses: { id: string, instructID: string, response: string }[];
}