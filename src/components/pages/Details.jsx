import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Details.module.css";
import { useParams, useLocation } from "react-router-dom";
import CardHolder from "../UI/CardHolder";
import WatchListButton from "../UI/WatchListButton";
import poster_error from "../../assets/images/poster_error.jpg";
import Navbar from "../Layout/Navbar";
import Cookies from "js-cookie";
import { updateWatchList } from "../store/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
    const params = useParams();
    const location = useLocation();
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const movie = useSelector(state => state.auth.user_data);

    const dispatch = useDispatch();

    const search_id = params.id;
    const media_type = location.pathname.split("/")[1] === "details_movie" ? "movie" : "tv";

    let initialStateOfWatchList = false;

    for (let index = 0; index < movie.length; index++) {
        if (movie[index].movie_id === search_id && movie[index].media_type === media_type) {
            initialStateOfWatchList = true;
        }
    }

    const [isAdded, setIsAdded] = useState(initialStateOfWatchList);
    const [details, setDetails] = useState([]);


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


    }, [search_id, media_type, movie]);

    const errorHandler = (e) => {
        e.target.src = poster_error;
    };


    let title = "";
    if (media_type === "movie") {
        title = "Movies";
    } else {
        title = "Tv Shows";
    }

    const WatchListHandler = (event) => {
        if (loggedIn) {
            let query_word = "";
            if (event.target.innerText === "Add To WatchList") {
                query_word = "add";
                setIsAdded(true);
            } else {
                query_word = "remove";
                setIsAdded(false);
            }
            const body = {
                id: search_id,
                type: media_type
            };
            const url = `http://localhost:5000/user/${query_word}`;
            const Data = async () => {
                const token = Cookies.get("token");
                try {
                    const response = await axios.post(url, body, { headers: { "Authorization": `Bearer ${token}` } });
                    dispatch(updateWatchList(response.data.movie));
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                } catch (error) {
                    console.log(error);
                    toast.error("Error while sending data", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true
                    });
                }
            };
            Data();
        } else {
            toast.info("You need to be logged in to add to watchlist", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                            {!isAdded && <WatchListButton title='Add To WatchList' onClick={WatchListHandler} />}
                            {isAdded && <WatchListButton title='Remove From WatchList' onClick={WatchListHandler} />}
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
            <ToastContainer />
        </Fragment>
    );
}

export default Details;