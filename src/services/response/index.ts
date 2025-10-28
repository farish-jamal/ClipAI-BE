import { findUserById } from "../../repository/user";
import { systemPrompt } from "../../system_prompt";
import { generateScript } from "../../utils/generate_response";
import { generateVoiceover } from "../../utils/text_to_speech";

export const generateResponseService = async (userId: string, data: any): Promise<any> => {
   const user = await findUserById(userId);
   if (!user) {
      return {
         success: false,
         statusCode: 404,
         message: "User not found",
         data: null,
      };
   }
   const preferredLanguage = data.preferredLanguage
      ? data.preferredLanguage
      : user.preferredLanguage;
   const preferredStyle = data.preferredStyle ? data.preferredStyle : user.preferredStyle;
   const preferredVoice = data.preferredVoice ? data.preferredVoice : user.preferredVoice;
   const preferredCountry = data.preferredCountry ? data.preferredCountry : user.preferredCountry;
   const characterName = data.characterName ? data.characterName : user.characterName;
   const characterDevelopment = data.characterDevelopment;

   const system_prompt = systemPrompt(
      userId,
      preferredLanguage,
      preferredStyle,
      preferredVoice,
      preferredCountry,
      characterName,
      characterDevelopment,
      data.length ? data.length : 60
   );

   const user_prompt = `
    User Input: ${data.prompt}
    Duration: ${data.length} seconds
    Target Audience: ${data.targetAudience}
    Content Goal: ${data.contentGoal}
    Key Points to Include: ${Array.isArray(data.keyPoints) && data.keyPoints.length ? data.keyPoints.join(", ") : "None provided"}
    `;

   // Genererated script using system and user prompts with Gemini API
   const script = await generateScript(system_prompt, user_prompt);

   if (script.success === false) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to generate script",
         data: null,
      };
   }

   // // With the script, convert it to speech using Eleven Labs API
   // const voice_over = await generateVoiceover(
   //    script.data,
   //    user.preferredVoiceId,
   //    `${userId}_voiceover.mp3`
   // );

   // if (voice_over.success === false) {
   //    return {
   //       success: false,
   //       statusCode: 500,
   //       message: "Failed to generate voiceover",
   //       data: null,
   //    };
   // }
   
   return {
      success: true,
      statusCode: 200,
      message: "Script generated successfully",
      data: { script: script.data },
   };
};
