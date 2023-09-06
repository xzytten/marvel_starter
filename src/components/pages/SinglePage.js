import './singleComicPage.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

//.sa.as.asa
//a.sa.s.a
//sa.sa.sa
const SinglePage = ({ Component, TypeComponent }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, clearError, getComic, getCharacter, process, setProcess } = useMarvelService();

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
                    .then(() => setProcess('confirmed'))
                break;
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                break;        
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }


    // const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
        {setContent(process, Component, data)}
        </>
    )
}


export default SinglePage;