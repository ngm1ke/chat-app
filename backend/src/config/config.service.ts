import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  public getDbUrl(): string {
    return this.config.getOrThrow('DATABASE_URL');
  }
}
