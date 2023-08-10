import {useEffect, useState} from "react";
import {RAPID_API_KEY} from '@env'
import axios from "axios";

const useFetch = (endPoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endPoint}`,
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query}
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response?.data.data);
        } catch (error) {
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }

    const refetch = async () => {
        await fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;