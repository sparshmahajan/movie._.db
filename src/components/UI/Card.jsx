import { genre_movie, genre_tv } from '../../constants/genre';
import { useNavigate } from 'react-router-dom';
import poster_error from '../../assets/images/poster_error.jpg';
import classes from './Card.module.css';

const Card = (props) => {
    const media_type = props.type || props.item.media_type;
    const title = props.item.title || props.item.name;
    const poster_path = props.item.poster_path;
    const release_date = props.item.release_date || props.item.first_air_date;
    const language = props.item.original_language;
    const id = props.item.id;


    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/details_${media_type}/${id}`);
    };

    const errorHandler = (e) => {
        e.target.src = poster_error;
    };

    return (
        <div className={classes.card} onClick={clickHandler}>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt='' onErrorCapture={errorHandler} className={classes.poster} />
            <ul className={classes.card_content}>
                <li id={classes.title}>{title}</li>
                <li>Language : {language}</li>
                {props.item.genre_ids && <li>Genres : {props.item.genre_ids.map((id) => {
                    if (media_type === "movie") {
                        return genre_movie[id];
                    } else {
                        return genre_tv[id];
                    }

                }).join(", ")} </li>}
                {media_type === 'movie' && <li >Release Date : {release_date}</li>}
                {media_type === 'tv' && <li >First Air Date : {release_date}</li>}
                <li>Type : {media_type}</li>
            </ul>
        </div>);
};

export default Card;