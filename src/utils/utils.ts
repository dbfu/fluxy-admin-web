export function getParamsBySearchParams<T = any>(query: URLSearchParams) {
  const params = [...query.keys()].reduce<Record<string, any>>(
    (prev, cur: string) => {
      if (cur) {
        prev[cur] = query.get(cur);
      }
      return prev;
    },
    {}
  );
  return params as T;
}
