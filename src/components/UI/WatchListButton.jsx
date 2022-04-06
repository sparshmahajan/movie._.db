import { useState } from "react";
import { updateWatchList } from "../store/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './WatchListButton.module.css';


const WatchListButton = (props) => {

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const movie = useSelector(state => state.auth.user_data);


    let initialStateOfWatchList = false;

    for (let index = 0; index < movie.length; index++) {
        if (movie[index].movie_id === props.search_id && movie[index].media_type === props.media_type) {
            initialStateOfWatchList = true;
        }
    }

    const [isAdded, setIsAdded] = useState(initialStateOfWatchList);

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
                id: props.search_id,
                type: props.media_type
            };
            const url = `https://moviedb-backend-1.herokuapp.com/api/${query_word}`;
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
                        autoClose: 2000,
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div className={classes.center}>
            {!isAdded && !props.title && <button className={classes.watchlist_button} onClick={WatchListHandler} >Add To WatchList</button>}
            {isAdded && !props.title && <button className={classes.watchlist_button} onClick={WatchListHandler} >Remove From WatchList</button>}
            <ToastContainer />
        </div>
    );
};

export default WatchListButton;