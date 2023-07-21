import { CapibarModule } from '@capibar/client';
import { ref } from 'vue';
import { useMeta } from '@/composables/meta';

const app = ref();
const rpc = ref({});
const schemas = ref({});
const methods = ref(new Map());
const configs = ref({});

const currentClient = ref();

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const getUrl = (port, protocol = 'http', host = location.hostname) =>
  `${protocol}://${host}${port ? `:${port}` : ''}`;

export function useApi() {
  const { meta } = useMeta();
  const setup = async () => {
    if (app.value) return;
    currentClient.value = meta.value?.meta?.clients?.[0]?.name ?? 'http';
    const clients = (meta.value?.meta?.clients ?? []).map(({ name, port }) => [
      name,
      getUrl(port, name),
    ]);
    const application = new CapibarModule({
      clients: {
        ...Object.fromEntries(clients),
      },
      isExplorer: true,
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

  return {
    setup,
    execAsyncScript,
    rpc,
    schemas,
    methods,
    configs,
    currentClient,
  };
}
