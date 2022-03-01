import { useState, useEffect } from 'react';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Config {
  axiosInstance: AxiosInstance;
  requestConfig?: AxiosRequestConfig;
}

export function useAxios<T>() {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (configObj: Config) => {
    const { axiosInstance, requestConfig = {} } = configObj;

    setLoading(true);
    const crl = new AbortController();
    setController(controller);

    try {
      const res = await axiosInstance.request<T>({
        ...(requestConfig || {}),
        signal: crl.signal,
      });
      setResponse(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, [controller]);

  return { response, error, loading, axiosFetch };
}
