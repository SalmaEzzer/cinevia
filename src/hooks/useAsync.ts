import { useCallback, useEffect, useState, type DependencyList } from "react";

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useAsync = <T>(
  task: () => Promise<T>,
  dependencies: DependencyList = []
) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  const run = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));

    try {
      const data = await task();
      setState({ data, error: null, loading: false });
    } catch (error) {
      setState({
        data: null,
        error: error instanceof Error ? error.message : "Something went wrong.",
        loading: false,
      });
    }
    // The caller owns this dependency list, mirroring useEffect's API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    void run();
  }, [run]);

  return { ...state, refetch: run };
};
