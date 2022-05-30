import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Details.module.css";
import { useParams, useLocation } from "react-router-dom";
import WatchListButton from "../UI/WatchListButton";
import poster_error from "../../assets/images/poster_error.jpg";
import Navbar from "../Layout/Navbar";
import PageButton from "../UI/PageButton";

const Details = () => {
    const params = useParams();
    const location = useLocation();

    const search_id = params.id;
    const media_type = location.pathname.split("/")[1] === "details_movie" ? "movie" : "tv";

    const [details, setDetails] = useState([]);


    useEffect(() => {
        const url = `https://moviedb-backend-1.herokuapp.com/api/search_${media_type}/${search_id}`;
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    }, [search_id, media_type]);

    const errorHandler = (e) => {
        e.target.src = poster_error;
    };


    let title = "";
    if (media_type === "movie") {
        title = "Movies";
    } else {
        title = "Tv Shows";
    }

    return (
        <Fragment>
            <Navbar />
            {
                details.length !== 0 &&
                <Fragment>
                    <div className={classes.details}>
                        <div className={classes.poster_container}>
                            <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} className={classes.poster} alt="poster" onErrorCapture={errorHandler} />
                        </div>
                        <div className={classes.details_container}>
                            <WatchListButton media_type={media_type} search_id={search_id} />
                            <li className={classes.title}>{details.title || details.name}</li>
                            {details.genres && <li ><strong>GENRES : </strong>{details.genres.map(genre => genre.name).join(", ")} </li>}
                            {media_type === 'movie' && <li ><strong>RELEASE DATE :</strong> {details.release_date}</li>}
                            {media_type === 'tv' && <li ><strong>FIRST AIR DATE :</strong> {details.first_air_date}</li>}
                            {media_type === 'tv' && <li ><strong>LATEST AIR DATE :</strong> {details.last_air_date}</li>}
                            {media_type === 'tv' && <li ><strong>TOTAL SEASONS : </strong> {details.number_of_seasons}</li>}
                            {media_type === 'tv' && <li ><strong>TOTAL EPISODES : </strong> {details.number_of_episodes}</li>}
                            <li ><strong>LANGUAGE : </strong> {details.original_language}</li>
                            {/* <li ><strong>TYPE : </strong>{media_type}</li> */}
                            <li ><strong>STATUS : </strong> {details.status}</li>
                            {details.tagline && <li ><strong>TAGLINE : </strong> {details.tagline}</li>}
                            {(media_type === 'movie' && details.runtime !== 0) && <li ><strong>RUNTIME : </strong> {details.runtime} minutes</li>}
                            {(media_type === 'tv' && details.episode_run_time !== 0) && <li ><strong>EPISODE RUNTIME : </strong> {details.episode_run_time.sort().join(" - ")} minutes</li>}
                            <li ><strong>OVERVIEW : </strong>{details.overview}</li>
                        </div>
                    </div>
                    <div className={classes.buttonHolder}>
                        <PageButton title={`Similar ${title}`} id={search_id} type={title} backgroundColor='#7593ea' />
                        <PageButton title={`Recommended ${title}`} id={search_id} type={title} backgroundColor='#94fef4' />
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Details;