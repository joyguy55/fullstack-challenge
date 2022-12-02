import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (
    params: AxiosRequestConfig,
    callBack: (result: any) => void
  ) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
      callBack(result.data);
    } catch (err) {
      // @ts-ignore
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
