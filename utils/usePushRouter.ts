import { useRouter } from 'next/router';

export const usePushRouter = () => {
  const router = useRouter();

  const pushRouter = (searchParamName: string, param?: string) => {
    const query = new URLSearchParams(router.query as any);
    if (query.has(searchParamName)) {
      query.delete(searchParamName);
    }
    if (param) {
      query.set(searchParamName, param);
    }

    router.push(query.toString()?.length ? `?${query.toString()}` : '/');
  };

  return { pushRouter };
};
