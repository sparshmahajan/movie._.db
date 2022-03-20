import classes from './Card.module.css';

const Card = (props) => {
    const media_type = props.type || props.item.media_type;
    const title = media_type === "movie" ? props.item.title : props.item.name;
    let poster_path = props.item.poster_path;
    const vote_average = props.item.vote_average;
    const release_date = media_type === "movie" ? props.item.release_date : props.item.first_air_date;
    const language = props.item.original_language;


    return (
        <div className={classes.card}>
            <img src={"https://image.tmdb.org/t/p/original" + poster_path} className={classes.poster} />
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