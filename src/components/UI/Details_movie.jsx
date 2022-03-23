import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Details_movie.module.css";
import { useParams, useLocation, Navigate } from "react-router-dom";
import CardHolder from "./CardHolder";


const Details_movie = () => {
    const params = useParams();
    const location = useLocation();

    const [details, setDetails] = useState([]);
    const genres = location.state;
    const search_id = params.id;


    useEffect(() => {
        const url = `http://localhost:5000/tmdb/search_movie/${search_id}`;

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

    }, [search_id]);

    return (
        <Fragment>
            <div className={classes.details}>
                <div className={classes.poster_container}>
                    <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} className={classes.poster} alt="poster" />
                </div>
                <div className={classes.details_container}>
                    <li className={classes.title}>{details.title}</li>
                    <li className={classes.genres}><strong>GENRES : </strong>{genres.join(", ")}</li>
                    <li className={classes.release_date}><strong>RELEASE DATE :</strong> {details.release_date}</li>
                    <li className={classes.language}><strong>LANGUAGE :</strong> {details.original_language}</li>
                    <li className={classes.ratings}><strong>RATINGS :</strong> {details.vote_average}</li>
                    <li className={classes.type}><strong>TYPE :</strong> Movie</li>
                    <li className={classes.status}><strong>STATUS :</strong> {details.status}</li>
                    <li className={classes.revenue}><strong>TAGLINE :</strong> {details.tagline}</li>
                    <li className={classes.runtime}><strong>RUNTIME :</strong> {details.runtime}</li>
                    <li className={classes.overview}><strong>OVERVIEW : </strong>{details.overview}</li>
                    <li className={classes.homepage}><strong>HOMEPAGE :</strong> <a href={details.homepage}>{details.homepage} </a> </li>
                </div>
            </div>
            <CardHolder title="Similar Movies" id={search_id} type="movie" />
            <CardHolder title="Recommended Movies" id={search_id} type="movie" />
        </Fragment>
    );
}

export default Details_movie;