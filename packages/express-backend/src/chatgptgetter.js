import OpenAI from "openai";
import dotenv from "dotenv";

// Get API key from chatgpt and put in .env.local named OPENAI_API_KEY=[KEY]
const result = dotenv.config({ path: ".env.local" });
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("Environment file loaded successfully.");
}
const openai = new OpenAI();

class openAI {
  static defaultSystem = `You are a movie reviewer 
    and you are going to give a review for the movie given. If you 
    don’t know the movie just give a review to the best of your knowledge.
    If it's not out then continue `;
  async sendPrompt(string, system = openAI.defaultSystem) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: string },
      ],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0];
  }
}

function main() {
  const ai = new openAI();
  ai.sendPrompt("What do you think of the five nights at freddys movie?")
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
}
main();
