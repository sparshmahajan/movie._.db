import React, { useState, useEffect } from 'react';
import Card from "./Card";
import axios from 'axios';
import Carousel from "react-elastic-carousel";
import classes from "./CardHolder.module.css";

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

let search_word = 'movie';

const CardHolder = (props) => {

    if (props.children === 'MOVIES') {
        search_word = 'movie';
    } else {
        search_word = 'tv';
    }

    const url = "http://localhost:5000/tmdb/trending_" + search_word;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            try {
                setData(response.data);
            } catch (error) {
                console.log(error);
                setData([]);
            }
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <h1 className={classes.title}>Trending {props.children} </h1>
            <Carousel breakPoints={breakPoints} >
                {data.map((item) =>
                    <Card key={item.id}> {item} </Card>
                )}
            </Carousel>
        </React.Fragment>
    );
}

export default CardHolder;