import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  public getDbUrl(): string {
    // TODO: add validation
    return this.config.getOrThrow('DATABASE_URL');
  }
}
