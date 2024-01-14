import { useRouter } from 'next/router';

type RouterParams = {
  [searchParamName: string]: string | number | undefined;
};
function checkRouterParams(
  routerParams?: RouterParams,
): routerParams is RouterParams {
  return routerParams !== undefined;
}

type PushRouter = (path: string, routerParams?: RouterParams) => void;
type PushRouterQuery = (searchParamName: string, param?: string) => void;
type PushRouterQueryList = (routerParams: RouterParams) => void;

export const usePushRouter = () => {
  const router = useRouter();
  const pushRouter: PushRouter = (path, routerParams) => {
    const query = new URLSearchParams();

    if (checkRouterParams(routerParams)) {
      for (const searchParamName in routerParams) {
        const param = routerParams[searchParamName];

        if (param) {
          query.set(searchParamName, String(param));
        }
      }
    }

    router.push(
      path + (query.toString()?.length ? `?${query.toString()}` : ''),
    );
  };
  const pushRouterQuery: PushRouterQuery = (searchParamName, param) => {
    const query = new URLSearchParams(router.query as any);
    if (query.has(searchParamName)) {
      query.delete(searchParamName);
    }
    if (typeof param === 'string') {
      query.set(searchParamName, param);
    }

    router.push(query.toString()?.length ? `?${query.toString()}` : '/');
  };
  const pushRouterQueryList: PushRouterQueryList = (routerParams) => {
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

    router.push(query.toString()?.length ? `?${query.toString()}` : '/');
  };

  return { pushRouterQuery, pushRouterQueryList, pushRouter };
};
