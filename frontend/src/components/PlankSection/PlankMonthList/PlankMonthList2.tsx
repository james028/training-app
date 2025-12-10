import {
  useState,
  useDeferredValue,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// @ts-ignore
function useInfiniteScrollObserver({
  // @ts-ignore
  isFetching,
  // @ts-ignore
  hasNextPage,
  // @ts-ignore
  onLoadMore,
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  debounce = 0,
  disabled = false,
}) {
  const observerRef = useRef(null);
  const debounceTimeout = useRef(null);

  const lastElementRef = useCallback(
    (node: any) => {
      if (disabled || isFetching) return;

      // rozłącz poprzedni observer
      // @ts-ignore
      if (observerRef.current) observerRef.current.disconnect();
      // @ts-ignore
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry.isIntersecting) return;
          if (!hasNextPage) return;

          // debounce
          if (debounce > 0) {
            // @ts-ignore
            clearTimeout(debounceTimeout.current);
            // @ts-ignore
            debounceTimeout.current = setTimeout(() => {
              onLoadMore();
            }, debounce);
          } else {
            onLoadMore();
          }
        },
        {
          threshold,
          root,
          rootMargin,
        },
      );

      if (node) {
        // @ts-ignore
        observerRef.current.observe(node);
      }
    },
    [
      isFetching,
      hasNextPage,
      threshold,
      root,
      rootMargin,
      debounce,
      disabled,
      onLoadMore,
    ],
  );

  return { lastElementRef };
}

// Fetch z API
// @ts-ignore
async function fetchProducts({ pageParam = 1, queryKey }) {
  const [_key, { search, limit, sort }] = queryKey;
  if (!search) return { products: [], total: 0 };
  let url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${(pageParam - 1) * limit}`;
  if (sort === "asc") url += "&sort=price";
  if (sort === "desc") url += "&sort=-price";
  const res = await fetch(url);
  const data = await res.json();
  return {
    ...data,
    nextPage: pageParam + 1,
    hasMore: data.total > pageParam * limit,
  };
}

// Debounce hook
function useDebounce(value: any, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function OptimizedSearch() {
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("asc");

  const deferredInput = useDeferredValue(input);
  const searchTerm = useDebounce(deferredInput, 400);

  const observerRef = useRef();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["products", { search: searchTerm, limit: 10, sort }],
      fetchProducts,
      {
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.nextPage : undefined,
        enabled: !!searchTerm,
        staleTime: 1000 * 60,
      },
    );

  const handleChange = (e: any) => setInput(e.target.value);
  const handleSortChange = (e: any) => setSort(e.target.value);

  // const lastElementRef = useCallback(
  //   (node: any) => {
  //     if (isFetchingNextPage) return;
  //     // @ts-ignore
  //     if (observerRef.current) observerRef.current.disconnect();
  //     // @ts-ignore
  //     observerRef.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) {
  //       // @ts-ignore
  //       observerRef.current.observe(node);
  //     }
  //   },
  //   [isFetchingNextPage, fetchNextPage, hasNextPage],
  // );
  const { lastElementRef } = useInfiniteScrollObserver({
    isFetching: isFetchingNextPage,
    hasNextPage,
    onLoadMore: fetchNextPage,
    threshold: 0.2, // odpala gdy 20% elementu wpadnie w viewport
    rootMargin: "200px", // odpala wcześniej — 200px przed końcem
    debounce: 150, // opóźnienie żeby nie spamować API
    disabled: false, // możesz dynamicznie wyłączać
  });

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <input
        value={input}
        onChange={handleChange}
        placeholder="Szukaj produktów..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />

      <select
        value={sort}
        onChange={handleSortChange}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      >
        <option value="asc">Cena rosnąco</option>
        <option value="desc">Cena malejąco</option>
      </select>

      {(isLoading || isFetchingNextPage) && (
        <div style={{ color: "orange", marginBottom: "1rem" }}>
          Ładowanie wyników...
        </div>
      )}

      <ul>
        {data?.pages.map((page, pageIndex) =>
          page.products.map((p: any, i: number) => {
            const isLast =
              pageIndex === data.pages.length - 1 &&
              i === page.products.length - 1;
            return (
              <li key={p.id} ref={isLast ? lastElementRef : null}>
                {p.title} - ${p.price}
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
