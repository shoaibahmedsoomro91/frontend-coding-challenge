import {useState, useEffect} from 'react';


export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                // debugger;
                setResponse(json);
                setLoading(false);
            } catch (error) {
                // debugger;
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

    }, [url /* todo options, this can be added here by using useMemo */]); // eslint-disable-line react-hooks/exhaustive-deps

    return [ response, loading, error ];
};