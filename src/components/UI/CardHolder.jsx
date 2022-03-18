import React from "react";
import Card from "./Card";
import Carousel from "react-elastic-carousel";
import classes from "./CardHolder.module.css";


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1200, itemsToShow: 6, itemsToScroll: 6 },
    { width: 1400, itemsToShow: 7, itemsToScroll: 7 },
];

const CardHolder = (props) => {

    return (
        <React.Fragment>
            <h1 className={classes.title}>Trending {props.children} </h1>
            <Carousel breakPoints={breakPoints} >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Carousel>
        </React.Fragment>
    );
}

export default CardHolder;