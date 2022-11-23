import { Fragment, useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import axios from "axios";
import Card from "../UI/Card";
import classes from './WatchList.module.css';
import { useDispatch } from "react-redux";
import { updateWatchList } from "../store/AuthSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WatchList = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        const movie_data = JSON.parse(localStorage.getItem('movie'));
        movie_data.map((item) => {
            const url = "https://delightful-deer-peplum.cyclic.app/api/search_" + item.media_type + "/" + item.movie_id;
            const fetchData = async () => {
                try {
                    const response = await axios.get(url);
                    setData(data => [...data, { ...response.data, media_type: item.media_type, movie_id: item.movie_id }]);
                } catch (error) {
                    console.log(error);
                }
            };
            return fetchData();
        });
    }, []);

    const removeHandler = (event) => {
        const bodyData = JSON.parse(event.target.value);
        const body = {
            id: bodyData.id,
            type: bodyData.media_type
        };
        const url = `https://delightful-deer-peplum.cyclic.app/api/remove`;
        const Data = async () => {
            const token = localStorage.getItem("token");
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
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
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
    }

    return (
        <Fragment>
            <Navbar />
            <h1 className={classes.title} >My WatchList</h1>
            <div className={classes.card_holder}>
                {data.map((item) => {
                    return (
                        <div className={classes.oneElement} key={item.id}>
                            <Card item={item} type={item.media_type} />
                            <button value={JSON.stringify({ media_type: item.media_type, id: item.id })} onClick={removeHandler} className={classes.button} >Remove From WatchList</button>
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default WatchList;