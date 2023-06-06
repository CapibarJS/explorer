import { ref } from 'vue';
import { getCookie } from '@/utils';

const meta = ref();

export const useMeta = () => {
  const setup = () => {
    meta.value = JSON.parse(getCookie('meta'));
  };

  return { setup, meta };
};
