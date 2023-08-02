import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const { getAllComics } = useMarvelService();

    const onRequest = () => {
        getAllComics()
            .then(onComicsListLoaded);

    }


    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
    }

    useEffect(() => {
        onRequest();

    }, [])



    const renderContent = (arr) => {

        const content = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
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
    return (
        <div className="comics__list">
            {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;