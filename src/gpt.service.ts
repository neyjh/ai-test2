import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chatWithGPT(message: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',  // GPT-3.5에서 GPT-4로 변경
      messages: [{ role: 'user', content: message }],
    });

    return response.choices[0].message?.content || '응답이 없습니다';
  }

  async startConversation(): Promise<string> {
    return '저는 GPT-4 버전입니다. 메시지를 입력해주세요.';
  }
}
