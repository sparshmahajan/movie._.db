import React from "react";
import Card from "./Card";
import classes from "./CardHolder.module.css";

const CardHolder = (props) => {
    return (
        <React.Fragment>
            <h1 className={classes.title}>Trending {props.children} </h1>
            <div className={classes.card_holder}>
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
            </div>
        </React.Fragment>
    );
}

export default CardHolder;