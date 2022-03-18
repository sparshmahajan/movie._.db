import classes from './Search_bar.module.css'
import Search_icon from '../../assets/images/Search_icon.svg'

const Search_bar = () => {
    return (
        <div className={classes.search}>
            <input type="text" placeholder="Search" className={classes.search_bar} />
            <button className={classes.search_button}>
                <img src={Search_icon} alt="Search" className={classes.search_icon} />
            </button>
        </div>
    );
}

export default Search_bar;