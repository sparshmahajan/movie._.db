import { useNavigate } from "react-router-dom";
import classes from "./PageButton.module.css";


const PageButton = (props) => {
    const navigate = useNavigate();

    let search_word;

    if (props.title === 'trending movies') {
        search_word = 'trending_movies';
    } else if (props.title === 'trending tv shows') {
        search_word = 'trending_tv';
    } else if (props.title === 'popular movies') {
        search_word = 'popular_movies';
    } else if (props.title === 'popular tv shows') {
        search_word = 'popular_tv';
    } else if (props.title === 'top rated movies') {
        search_word = 'top_rated_movies';
    } else if (props.title === 'top rated tv shows') {
        search_word = 'top_rated_tv';
    } else if (props.title === 'upcoming movies') {
        search_word = 'upcoming_movies';
    } else if (props.title === 'on the air tv shows') {
        search_word = 'on_the_air';
    } else if (props.title === 'Similar Movies') {
        search_word = 'similar_movies/' + props.id;
    } else if (props.title === 'Similar Tv Shows') {
        search_word = 'similar_tv/' + props.id;
    } else if (props.title === 'Recommended Movies') {
        search_word = 'recommended_movies/' + props.id;
    } else if (props.title === 'Recommended Tv Shows') {
        search_word = 'recommended_tv/' + props.id;
    }

    const moveToPage = () => {
        navigate("/" + search_word);
    }

    return (
        <button
            className={classes.PageButton}
            onClick={moveToPage}
            style={{ backgroundColor: props.backgroundColor }}
        >
            {props.title}
        </button>
    );
};

export default PageButton;