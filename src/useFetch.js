import { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const abortCont = new AbortController();

    const fetchData = async () => {
      const res = await fetch(url, { signal: abortCont.signal })
      if (!res.ok) {
        throw Error("Could not fetch the data for that resource")
      }
      const data = await res.json()
      setData(data)
      setIsPending(false)
      setError(null)
    }

    fetchData().catch(err => {
      if (err.name !== "AbortError") {
        setError(err.message)
        setIsPending(false)
      }
    })
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error }
}

export default useFetch;