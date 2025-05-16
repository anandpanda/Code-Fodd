export type ComicVibe =
  | "codeManga"
  | "catCuteness"
  | "retroSaga"
  | "memeMayhem"
  | "cyberFuture"
  | "startupLife"
  | "darkScholars";

export type GenerationMode = 'praise' | 'roast' | 'comic';

export type GenerationStatus = 'idle' | 'generating' | 'complete' | 'error';

export interface ComicPanel {
  imageUrl: string;
  caption: string;
  description?: string;
}

export interface Comic {
  id: string;
  vibe: ComicVibe;
  sourceCode: string;
  panels: ComicPanel[];
  createdAt: string;
}