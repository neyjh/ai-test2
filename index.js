const OpenAI = require('openai');
const fs = require('fs');

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// 코드 리뷰 수행
async function reviewCode() {
  const codeSnippet = fs.readFileSync('path/to/code/file.js', 'utf-8');  // 검토할 코드 파일 읽기
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
      You are a code review expert. Review the following JavaScript code for performance, security, and best practices.
      Provide constructive feedback, highlighting potential improvements and optimizations.
      
      Code:
      ${codeSnippet}
    `,
    max_tokens: 200,
  });

  console.log("Code Review Feedback:");
  console.log(response.data.choices[0].text);  
}

reviewCode();