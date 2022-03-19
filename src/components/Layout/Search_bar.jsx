import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Search_bar.module.css'
import Search_icon from '../../assets/images/Search_icon.svg'
const Search_bar = () => {
    const inputRef = useRef();

    const navigate = useNavigate();
    const submitHandler = (event) => {
        event.preventDefault();
        navigate(`/search/${inputRef.current.value}`);
        inputRef.current.value = '';
    }

    return (
        <form className={classes.search} onSubmit={submitHandler}>
            <input type="text" placeholder="Search" className={classes.search_bar} ref={inputRef} />
            <button className={classes.search_button} type="submit" >
                <img src={Search_icon} alt="Search" className={classes.search_icon} />
            </button>
        </form>
    );
}

export default Search_bar;