import { defineConfig } from 'orval';

export default defineConfig({
  todo: {
    input: './open-api/openapi.yaml',
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
    },
  },
});
