import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult} from "../utils/gptSlice";

const GptSearchBar = () => {

  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie)  => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);

    const json = await data.json();
    
    return json.results;
  };


  const handleGptSearchClick = async () =>{
    console.log(searchText.current.value);  

    //Make an API call to GPT API and get Movies Results

    const GptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma seperated like the example result given ahead.Example Result :Gadar, Sholey, Don, Golmaal, Koi Mil Gaya";

    const GptResults = await client.chat.completions.create({
      messages: [{ role: 'user', content:GptQuery}],
      model: 'gpt-3.5-turbo',
    });

    if (!GptResults.choices) {
      console.error("Error: No GPT results found.");
      return;
    }
    

    console.log(GptResults.choices?.[0]?.message?.content);

    const gptMovies = GptResults.choices?.[0]?.message?.content.split(",");

    //For each Movie I will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[Promise,Promise,Promise,Promoise,Promise]


    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults); 

    dispatch(addGptMovieResult({movieName:gptMovies, movieResults:tmdbResults}));
    
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
};

export default GptSearchBar;

