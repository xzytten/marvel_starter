import './singleComicPage.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinmner/Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

//.sa.as.asa
//a.sa.s.a
//sa.sa.sa
const SinglePage = ({ Component, TypeComponent }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, clearError, getComic, getCharacter } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id]);

    const updateComic = () => {
        clearError();
        // eslint-disable-next-line default-case
        switch (TypeComponent) {
            case 'char':
                
                getCharacter(id)
                    .then(onDataLoaded)
                break;
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                break;
        
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


export default SinglePage;