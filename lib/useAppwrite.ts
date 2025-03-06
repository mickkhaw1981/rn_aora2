import { useState, useEffect } from 'react'

const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);
 
  const refetch = () => {
    fetchData()
 }
  return { data, refetch, isLoading };
}

export default useAppwrite;