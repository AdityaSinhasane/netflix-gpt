import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useNowPlyingMovies = () =>{
    //Fetch Data from TMDB API and update the store
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () =>{
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",API_OPTIONS); 
        const json = await data.json();
        //console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(()=>{
        !nowPlayingMovies && getNowPlayingMovies();
    },[]);
};

export default useNowPlyingMovies;