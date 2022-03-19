import React, { useState, useEffect } from 'react';
import Card from "./Card";
import axios from 'axios';
import Carousel from "react-elastic-carousel";
import classes from "./CardHolder.module.css";
import { useParams } from 'react-router-dom';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 350, itemsToShow: 2, itemsToScroll: 2 },
    { width: 550, itemsToShow: 3, itemsToScroll: 3 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 900, itemsToShow: 4, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
    { width: 1400, itemsToShow: 7, itemsToScroll: 7 },
    { width: 1600, itemsToShow: 9, itemsToScroll: 9 },
];

let search_word = 'trending_movie';
let url = "http://localhost:5000/tmdb/";

const CardHolder = (props) => {
    const params = useParams();

    const [data, setData] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        if (props.title === 'trending movies') {
            search_word = 'trending_movie';
        } else if (props.title === 'trending tv shows') {
            search_word = 'trending_tv';
        } else if (props.title === 'latest movies') {
            search_word = 'popular_movie';
        } else if (props.title === 'latest tv shows') {
            search_word = 'popular_tv';
        } else if (props.title === 'popular movies') {
            search_word = 'popular_movie';
        } else if (props.title === 'popular tv shows') {
            search_word = 'popular_tv';
        } else if (props.title === 'top rated movies') {
            search_word = 'top_rated_movie';
        } else if (props.title === 'top rated tv shows') {
            search_word = 'top_rated_tv';
        } else if (props.title === 'upcoming movies') {
            search_word = 'upcoming_movie';
        } else if (props.title === 'on the air tv shows') {
            search_word = 'on_the_air';
        } else {
            search_word = 'search/' + params.name;
            setIsSearch(true);
        }

        url = "http://localhost:5000/tmdb/" + search_word;

        const fetchData = async () => {
            console.log(url);
            const response = await axios.get(url);
            try {
                setData(response.data);
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };
        fetchData();
    }, [props.title, params.name]);

    return (
        <React.Fragment>
            <h1 className={classes.title}>{props.title} {isSearch && params.name} </h1>
            <Carousel breakPoints={breakPoints} >
                {data.map((item) =>
                    <Card key={item.id} item={item} type={props.type} />
                )}
            </Carousel>
        </React.Fragment>
    );
}

export default CardHolder;