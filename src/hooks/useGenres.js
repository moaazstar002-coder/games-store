 import axios from "axios";
 import { useEffect, useState } from "react";

 export const useGenres = () =>{
 const [genres, setGenres] = useState([]);
 const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function genresFetch() {
            try {
                const res = await axios.get("https://api.rawg.io/api/genres", {
                    params: {
                        key: "2c014c5b22214e628eecac2b366c6441",
                    },
                });
                setGenres(res.data.results);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        genresFetch();
    }, []); 
        
    return { genres, loading };
 }