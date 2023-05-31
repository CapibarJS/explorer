import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import router from '../router';
import { capibarApi } from '@/plugins/api';

export function registerPlugins(app) {
  loadFonts().then();
  capibarApi(app).then();
  app.use(vuetify).use(router);
}
