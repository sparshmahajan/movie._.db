import poster from '../../assets/images/poster.jpg';
import classes from './Card.module.css';

const Card = () => {
    return (
        <div className={classes.card}>
            <img src={poster} alt="poster" className={classes.poster} />
            <ul className={classes.card_content}>
                <li id={classes.title}>Attack On Titan</li>
                <li>Year : 2016</li>
                <li>Genre : Action, Drama, Fantasy</li>
                <li>Director : Hayao Miyazaki</li>
                <li> Ratings : 10</li>
            </ul>
        </div>);
};

export default Card;