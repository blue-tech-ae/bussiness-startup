declare const process: { env: { [key: string]: string | undefined } } | undefined;

export const environment = {
  production: false,
  OPENAI_API_KEY: ''
};

if (typeof process !== 'undefined' && process.env['OPENAI_API_KEY']) {
  environment.OPENAI_API_KEY = process.env['OPENAI_API_KEY'];
} else if (typeof globalThis !== 'undefined' && (globalThis as any)['OPENAI_API_KEY']) {
  environment.OPENAI_API_KEY = (globalThis as any)['OPENAI_API_KEY'];
}
