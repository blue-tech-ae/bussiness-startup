declare const process: { env: { [key: string]: string | undefined } };

export const environment = {
  production: false,
  OPENAI_API_KEY: process.env['OPENAI_API_KEY'] || ''
};
