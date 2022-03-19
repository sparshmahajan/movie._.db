import React, { Fragment } from "react";
import CardHolder from "./CardHolder";

const Main = (props) => {
    return (
        <Fragment>
            <CardHolder title='trending movies' type='movie' />
            <CardHolder title='trending tv shows' type='tv' />
            <CardHolder title='latest movies' type='movie' />
            <CardHolder title='latest tv shows' type='tv' />
            <CardHolder title='popular movies' type='movie' />
            <CardHolder title='popular tv shows' type='tv' />
            <CardHolder title='top rated movies' type='movie' />
            <CardHolder title='top rated tv shows' type='tv' />
            <CardHolder title='upcoming movies' type='movie' />
            <CardHolder title='on the air tv shows' type='tv' searchData={props.searchData} />
        </Fragment>
    );
};

export default Main;