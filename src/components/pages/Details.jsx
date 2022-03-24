import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Details.module.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CardHolder from "../UI/CardHolder";
import WatchListButton from "../UI/WatchListButton";
import poster_error from "../../assets/images/poster_error.jpg";
import Navbar from "../Layout/Navbar";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


const Details = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.auth.isLoggedIn);

    const search_id = params.id;

    const [details, setDetails] = useState([]);
    const media_type = location.pathname.split("/")[1] === "details_movie" ? "movie" : "tv";


    useEffect(() => {
        const url = `http://localhost:5000/tmdb/search_${media_type}/${search_id}`;
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

    const addToWatchList = () => {
        if (loggedIn) {
            const body = {
                id: search_id,
                type: media_type
            };
            const url = `http://localhost:5000/user/add`;
            const addData = async () => {
                const token = Cookies.get("token");
                try {
                    const response = await axios.post(url, body, { headers: { "Authorization": `Bearer ${token}` } });
                    alert("Added to watchlist");
                } catch (error) {
                    console.log(error);
                }
            };
            addData();
        } else {
            alert("You need to be logged in to add to watchlist");
            navigate("/signin");
        }
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
                            <WatchListButton title='Add To WatchList' onClick={addToWatchList} />

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
                            {media_type === 'movie' && <li ><strong>RUNTIME : </strong> {details.runtime} minutes</li>}
                            {media_type === 'tv' && details.episode_run_time && <li ><strong>EPISODE RUNTIME : </strong> {details.episode_run_time.sort().join(" - ")} minutes</li>}
                            <li ><strong>OVERVIEW : </strong>{details.overview}</li>
                            {details.homepage && <li ><strong>HOMEPAGE : </strong> <a href={details.homepage}>{details.homepage} </a> </li>}
                        </div>
                    </div>
                    <CardHolder title={`Similar ${title}`} id={search_id} type={media_type} />
                    <CardHolder title={`Recommended ${title}`} id={search_id} type={media_type} />
                </Fragment>

            }
        </Fragment>
    );
}

export default Details;