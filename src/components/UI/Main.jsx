import React, { Fragment } from "react";
import Navbar from "../Layout/Navbar";
import CardHolder from "./CardHolder";

const Main = () => {
    return (
        <Fragment>
            <Navbar />
            <CardHolder title='trending movies' type='movie' />
            <CardHolder title='trending tv shows' type='tv' />
            <CardHolder title='latest movies' type='movie' />
            <CardHolder title='latest tv shows' type='tv' />
            <CardHolder title='popular movies' type='movie' />
            <CardHolder title='popular tv shows' type='tv' />
            <CardHolder title='top rated movies' type='movie' />
            <CardHolder title='top rated tv shows' type='tv' />
            <CardHolder title='upcoming movies' type='movie' />
            <CardHolder title='on the air tv shows' type='tv' />
        </Fragment>
    );
};

export default Main;