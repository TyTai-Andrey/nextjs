import { useRouter } from 'next/router';

const useQuery = () => {
  return new URLSearchParams(useRouter().query as any);
};

export default useQuery;
