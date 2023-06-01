import { CapibarModule } from '@capibar/client';

export async function capibarApi(app) {
  const application = new CapibarModule({
    clients: {
      http: 'http://127.0.0.1:3001',
    },
  });
  await application.build();
  app.provide('api', application);
  app.config.globalProperties.$api = application;
}
