import classes from './Card.module.css';

const Card = (props) => {

    const media_type = props.children[1].media_type;
    const title = media_type === "movie" ? props.children[1].title : props.children[1].name;
    const poster_path = props.children[1].poster_path;
    const vote_average = props.children[1].vote_average;
    const release_date = media_type === "movie" ? props.children[1].release_date : props.children[1].first_air_date;
    const language = props.children[1].original_language;


    return (
        <div className={classes.card}>
            <img src={"https://image.tmdb.org/t/p/original" + poster_path} alt="poster" className={classes.poster} />
            <ul className={classes.card_content}>
                <li id={classes.title}>{title}</li>
                <li>Language : {language}</li>
                <li>Release Date : {release_date}</li>
                <li> Ratings : {vote_average}</li>
                <li>Type : {media_type}</li>
            </ul>
        </div>);
};

export default Card;