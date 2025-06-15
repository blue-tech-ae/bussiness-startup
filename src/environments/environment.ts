declare const process: { env: { [key: string]: string | undefined } } | undefined;

export const environment = {
  production: false,
  OPENAI_API_KEY: typeof process !== 'undefined' ? process.env['OPENAI_API_KEY'] ?? '' : ''
};
