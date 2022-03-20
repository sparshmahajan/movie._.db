import { Fragment } from "react";
import Navbar from "../Layout/Navbar";
import CardHolder from "../UI/CardHolder";

const CommonPage = (props) => {
    return (
        <Fragment>
            <Navbar />
            <CardHolder title={props.title} type={props.type} />
        </Fragment>
    );
}

export default CommonPage;

