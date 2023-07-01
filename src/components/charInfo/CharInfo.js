import { Component } from 'react';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelServiсe from '../../services/MarvelService';
import Spinner from '../Spinmner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelServiсe();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();

        this.marvelService
            .getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        //Умовний рендерінг
        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>        <div className="char__basics">
            {
                thumbnail.includes('image_not_available') ?
                    <img src={thumbnail} alt={name} style={{ objectFit: 'contain' }} />
                    :
                    <img src={thumbnail} alt={name} />
            }
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
            <div className="char__descr">
                {description}
            </div>
            {
                comics.length > 0 ?
                    <div>
                        <div className="char__comics">Comics:</div>
                        <ul className="char__comics-list">

                            {
                                comics.slice(0, 8).map((item, i) => {
                                    return (
                                        <li key={i} className="char__comics-item">
                                            {item.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    : <div className="char__comics">Don`t have comics</div>
            }


        </>

    )
}

export default CharInfo;