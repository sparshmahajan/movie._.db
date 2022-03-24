import classes from './WatchListButton.module.css';

const WatchListButton = (props) => {
    return (
        <div className={classes.center}>
            <button className={classes.watchlist_button} >{props.title}</button>
        </div>
    );
};

export default WatchListButton;