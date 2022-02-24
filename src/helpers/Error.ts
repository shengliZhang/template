export class ExtendError extends Error {
  code: any = null;
  constructor(config: any) {
    super(config);
    this.name = 'ExtendError';
    this.code = config.code;
    this.message = config.message;
  }
}
