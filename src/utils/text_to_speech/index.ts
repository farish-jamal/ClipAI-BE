import fs from "fs";
import path from "path";

export const generateVoiceover = async (
   scriptText: string | null,
   voiceId: string = "pNInz6obpgDQGcFmaJgB",
   outputFileName: string = "voiceover.mp3"
): Promise<any> => {
   try {
      const apiKey = process.env.ELEVENLABS_API_KEY;

      const audiosDir = path.join(process.cwd(), "src", "audios");

      if (!fs.existsSync(audiosDir)) {
         fs.mkdirSync(audiosDir, { recursive: true });
      }

      const outputPath = path.join(audiosDir, outputFileName);

      if (!apiKey) {
         return {
            success: false,
            statusCode: 500,
            message: "Eleven Labs API key is not configured",
            data: null,
         };
      }

      console.log("Sending request to Eleven Labs API...");

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey!,
         },
         body: JSON.stringify({
            text: scriptText,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
               stability: 0.4,
               similarity_boost: 0.8,
            },
         }),
      });

      console.log("Received response from Eleven Labs API:", response);

      if (!response.ok) {
         return {
            success: false,
            statusCode: 500,
            message: `Failed to generate voiceover: ${response.statusText}`,
            data: null,
         };
      }

      console.log("✅ Voiceover generated successfully.");

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      return {
         success: true,
         statusCode: 200,
         message: "Voiceover generated successfully",
         data: outputPath,
      };
   } catch (error: any) {
      console.error("❌ Error generating voiceover:", error.message);
      throw error;
   }
};
