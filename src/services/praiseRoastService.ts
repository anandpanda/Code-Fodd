export const generateTextResponse = async (code: string, mode: 'praise' | 'roast'): Promise<string> => {
  const res = await fetch('/api/praise-roast.ts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, mode }),
  });

  if (!res.ok) throw new Error('Failed to fetch response');

  const data = await res.json();
  return data.message;
};
