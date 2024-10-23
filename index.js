require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAPI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {role: "system", content: ""},
        {role: "user", content: "연결을 성공했다면 TF 멤버들에게 짧은 인사말을 해주세요."}
      ],
      max_tokens: 1000,
    });
    console.log(`GPT : ${response.choices[0].message.content}`);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}

testAPI();
