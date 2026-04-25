import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const MODEL = import.meta.env.VITE_GEMINI_MODEL as string;
const BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL as string;

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export const sendToGemini = async (prompt: string): Promise<string> => {
  const url = `${BASE_URL}/models/${MODEL}:generateContent`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await axios.post<GeminiResponse>(url, payload, {
      params: { key: API_KEY },
      headers: { "Content-Type": "application/json" },
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
    );
  } catch (error: any) {
    console.error(error?.response?.data?.error?.message);
    return "Error occurred";
  }
};