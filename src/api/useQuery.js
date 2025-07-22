// src/api/useQuery.js
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";

/** Queries the API and returns the data, loading status, error message, and the query function itself. */
export default function useQuery(resource, tag) {
  // Added "and the query function itself" to JSDoc
  const { request, provideTag } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = async () => {
    // This is the function we want to return
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource);
      setData(result);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tag) provideTag(tag, query);
    query();
  }, []);

  return { data, loading, error, query }; // <--- ADD 'query' here
}
