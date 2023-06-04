import { CapibarModule } from '@capibar/client';
import { ref } from 'vue';

const app = ref();
const rpc = ref({});
const schemas = ref({});
const methods = ref(new Map());
const configs = ref({});

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export function useApi() {
  const setup = async () => {
    if (app.value) return;
    const application = new CapibarModule({
      clients: {
        http: 'http://127.0.0.1:3001',
      },
    });
    await application.build();

    app.value = application;
    rpc.value = application?.clients ?? rpc.value;
    const keyTransport = Object.keys(application?.rpc).shift();
    const records = application?.rpc?.[keyTransport];
    if (records) {
      schemas.value = records.schemas ?? schemas.value;
      methods.value = records?.structureMap ?? methods.value;
      configs.value = records.config ?? configs.value;
    }
    window.rpc = rpc.value;
  };

  const execAsyncScript = async (script, payload = {}) => {
    const func = new AsyncFunction('rpc', ...Object.keys(payload), script);
    return func.apply(null, [rpc.value, ...Object.values(payload)]);
  };

  return { setup, execAsyncScript, rpc, schemas, methods, configs };
}
