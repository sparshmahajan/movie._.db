import React, { Fragment } from "react";
import Navbar from "../Layout/Navbar";
import PageButton from "./PageButton";
import classes from "./Main.module.css";

const Main = () => {
    return (
        <Fragment>
            <Navbar />
            <div className={classes.buttonHolder}>
                <PageButton title='trending tv shows' backgroundColor='#9690ad' />
                <PageButton title='trending movies' backgroundColor='rgb(255, 255, 155)' />
                <PageButton title='popular tv shows' backgroundColor='#6dd07d' />
                <PageButton title='popular movies' backgroundColor='#f46767' />
                <PageButton title='top rated tv shows' backgroundColor='#62b0b7' />
                <PageButton title='top rated movies' backgroundColor='rgba(248, 69, 159, 0.3)' />
                <PageButton title='upcoming movies' backgroundColor='#8bec65' />
                <PageButton title='on the air tv shows' backgroundColor='#f2c97d' />
            </div>
        </Fragment>
    );
};

export default Main;