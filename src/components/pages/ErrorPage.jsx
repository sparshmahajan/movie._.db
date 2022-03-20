import classes from './ErrorPage.module.css';

const ErrorPage = () => {
    return (
        <div className={classes.error_page}>
            <h1>Error 404 PAGE NOT FOUND</h1>
            <img src={require('../../assets/images/poster_error.jpg')} alt="404" className={classes.error} />
        </div>
    );
}

export default ErrorPage;