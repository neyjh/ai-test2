const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 코드 리뷰 수행
async function reviewCode() {
  const codeSnippet = fs.readFileSync(__filename, 'utf-8');
  
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `
        You are a code review expert. Review the following JavaScript code for performance, security, and best practices.
        Provide constructive feedback, highlighting potential improvements and optimizations.
        
        Code:
        ${codeSnippet}
      `,
      max_tokens: 200,
    });

    console.log("코드 리뷰 피드백:");
    console.log(response.choices[0].text);
  } catch (error) {
    console.error("OpenAI API 호출 중 오류 발생:", error);
  }
}

reviewCode();