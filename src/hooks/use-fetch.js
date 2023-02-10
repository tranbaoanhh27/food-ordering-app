import { useCallback, useState } from "react";

const useFetch = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const doFetch = useCallback(async (url, config = null) => {
        setIsFetching(true);
        let data = null;
        try {
            const response = await fetch(url, config);
            data = await response.json();
        } catch (error) {
            setError(error);
        }
        setIsFetching(false);
        return data;
    }, []);

    return [doFetch, isFetching, error];
};

export default useFetch;
