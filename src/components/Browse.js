import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies ";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {

  const showGptsearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header/>
      {
        showGptsearch ? <GptSearchPage/> : <> <MainContainer/>  <SecondaryContainer/> </> 
      }
      
      {/*
        MainContainer
          - VideoBackground
          - VideoTitle
        
        Secondary Container
          - MovieList * n
            - Cards * n
      */}
    </div>
  )
}

export default Browse;
