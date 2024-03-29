import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinmner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newComicsLoaging) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newComicsLoaging ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process')
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const { loading, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, newComicsLoading);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }


    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false)
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    const renderContent = (arr) => {

        const content = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {content}
            </ul>
        )
    }

    const content = renderContent(comicsList);
    const spinner = loading && !newComicsLoading ? <Spinner /> : null;
    return (
        <div className="comics__list">
           {setContent(process,() => renderContent(comicsList), newComicsLoading )}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;