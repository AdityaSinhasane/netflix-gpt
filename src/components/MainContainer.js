import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {

    const movies = useSelector(store =>store.movies?.nowPlayingMovies);
    if(!movies) return;

    const mainMovie = movies[0];
    // Add check if mainMovie is undefined
    if (!mainMovie) return null;

    const { original_title, overview, id } = mainMovie;

    return (
      <div>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
      </div>
    );
}

export default MainContainer;


