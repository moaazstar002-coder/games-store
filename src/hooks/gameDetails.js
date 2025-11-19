import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export function useGameDetails() {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function fetchGameDetails() {
            try {
                const res =await axios.get(`https://api.rawg.io/api/games/${id}`, {

                    params: { key: '2c014c5b22214e628eecac2b366c6441' }
                });
                setDetails(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchGameDetails();
    }, [id]);
    return { details, loading };

}
