import { useRouter } from 'next/router';

export const usePushRouter = () => {
  const router = useRouter();

  const pushRouter = (
    path: string,
    routerParams: {
      [searchParamName: string]: string | number | undefined;
    },
  ) => {
    const query = new URLSearchParams();

    for (const searchParamName in routerParams) {
      const param = routerParams[searchParamName];

      if (param) {
        query.set(searchParamName, String(param));
      }
    }

    router.push(
      path + (query.toString()?.length ? `?${query.toString()}` : ''),
    );
  };

  const pushRouterQuery = (searchParamName: string, param?: string) => {
    const query = new URLSearchParams(router.query as any);
    if (query.has(searchParamName)) {
      query.delete(searchParamName);
    }
    if (param) {
      query.set(searchParamName, param);
    }

    router.push(query.toString()?.length ? `?${query.toString()}` : '/');
  };

  const pushRouterQueryList = (routerParams: {
    [searchParamName: string]: string | number | undefined;
  }) => {
    const query = new URLSearchParams(router.query as any);

    for (const searchParamName in routerParams) {
      const param = routerParams[searchParamName];

      if (query.has(searchParamName)) {
        query.delete(searchParamName);
      }
      if (param) {
        query.set(searchParamName, String(param));
      }
    }

    console.log(query.toString());
    console.log(router);

    router.push(query.toString()?.length ? `?${query.toString()}` : '/');
  };

  return { pushRouterQuery, pushRouterQueryList, pushRouter };
};
