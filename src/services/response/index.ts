import { findUserById } from "../../repository/user";
import { systemPrompt } from "../../system_prompt";
import { generateScript } from "../../utils/generate_response";

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
   const system_prompt = systemPrompt(
      userId,
      preferredLanguage,
      preferredStyle,
      preferredVoice,
      preferredCountry,
      data.length ? data.length : 60
   );

   const user_prompt = `
    User Input: ${data.prompt}
    Duration: ${data.length} seconds
    Target Audience: ${data.targetAudience}
    Content Goal: ${data.contentGoal}
    Key Points to Include: ${Array.isArray(data.keyPoints) && data.keyPoints.length ? data.keyPoints.join(", ") : "None provided"}
    `;

   const script = await generateScript(system_prompt, user_prompt);

   if (!script) {
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
      data: { script: script.data },
   };
};
