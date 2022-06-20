import useSWR, { SWRConfiguration } from "swr";
import { IProductSize } from "../interfaces";

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProductSize[]>(`/api${url}`, fetcher, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
