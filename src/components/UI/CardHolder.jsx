import React, { useState, useEffect, Fragment } from 'react';
import Card from "./Card";
import axios from 'axios';
import classes from "./CardHolder.module.css";
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


let search_word = 'trending_movie';
let url = "https://delightful-deer-peplum.cyclic.app/api/";

const CardHolder = (props) => {

    const params = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);


    useEffect(() => {
        if (props.title === 'trending movies') {
            search_word = 'trending_movie';
        } else if (props.title === 'trending tv shows') {
            search_word = 'trending_tv';
        } else if (props.title === 'latest movies') {
            search_word = 'latest_movie';
        } else if (props.title === 'latest tv shows') {
            search_word = 'latest_tv';
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
        } else if (props.title === 'Similar Movies') {
            search_word = 'similar_movies/' + params.id;
        } else if (props.title === 'Similar Tv Shows') {
            search_word = 'similar_tv/' + params.id;
        } else if (props.title === 'Recommended Movies') {
            search_word = 'recommended_movies/' + params.id;
        } else if (props.title === 'Recommended Tv Shows') {
            search_word = 'recommended_tv/' + params.id;
        } else {
            search_word = 'search/' + params.name;
            setIsSearch(true);
        }

        url = "https://delightful-deer-peplum.cyclic.app/api/" + search_word;

        const fetchData = async () => {
            const response = await axios.get(url);
            try {
                setData(response.data);
            } catch (error) {
                console.log(error);
                setData([]);
            }
            setLoading(false);
        };
        fetchData();

    }, [props.title, params.name, params.id]);

    const FullCarousel = (
        <Fragment>
            <h1 className={classes.title}>{props.title} {isSearch && " " + params.name} </h1>
            <div className={classes.card_holder}>
                {data.map((item) => {
                    return (
                        <Card key={item.id} item={item} type={props.type} />
                    )
                })}
            </div>
        </Fragment>
    );

    return (
        <Fragment>
            {loading && <LoadingSpinner />}
            {data.length !== 0 && !loading && FullCarousel}

        </Fragment>
    );
}

export default CardHolder;