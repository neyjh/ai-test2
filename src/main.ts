import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as readline from 'readline';
import { GptService } from './gpt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);
  console.log('server is running on port 3003');
  

  const gpt = app.get(GptService);
  
  console.log(await gpt.startConversation());

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      process.exit(0);
    }
    const response = await gpt.chatWithGPT(input);
    console.log('GPT-4:', response);
  });
}
bootstrap();