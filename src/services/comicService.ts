import { Comic, ComicVibe } from "../types";

export const generateComic = async (code: string, vibe: ComicVibe): Promise<Comic> => {
  const res = await fetch('/api/generate-comic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, vibe }),
  });

  if (!res.ok) throw new Error('Failed to generate comic');
  return await res.json();
};
