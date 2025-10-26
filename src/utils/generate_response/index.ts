import { GoogleGenAI } from "@google/genai";

export const generateScript = async (
   system_prompt: string,
   user_prompt: string,
   max_tokens: number = 1000
) => {
   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) {
      return {
         success: false,
         statusCode: 500,
         message: "Gemini API key is not configured",
         data: null,
      };
   }
   const ai = new GoogleGenAI({ apiKey });

   try {
      const combined_prompt = `${system_prompt}\n\n${user_prompt}`;
      const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: [{ text: combined_prompt }],
         maxOutputTokens: max_tokens,
      } as any);

      const outputText = response.text || "";

      if (!outputText) {
         return {
            success: false,
            statusCode: 500,
            message: "Failed to generate script",
            data: null,
         };
      }

      return {
         success: true,
         statusCode: 200,
         message: "Script generated successfully",
         data: outputText,
      };
   } catch (err: any) {
      console.error("Error calling Gemini API:", err);
      return {
         success: false,
         statusCode: 500,
         message: err.message || "Unknown error",
         data: null,
      };
   }
};
