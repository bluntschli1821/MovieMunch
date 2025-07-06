import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFunction();

      setData(response);
    } catch (err) {
      //@ts-ignore
      setError(err instanceof Error ? err : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(
    () => {
      if (autoFetch) {
        fetchData();
      }
    },
    //@ts-ignore
    []
  );

  return { data, error, loading, reset, refetch: fetchData };
};
