import {
  Controller,
  Get,
} from '@/shared/infrastructure/http/plugins/decorators';

@Controller('/health')
export class HealthController {
  @Get()
  async index() {
    return { status: 'ok' };
  }
}
