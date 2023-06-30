import { Component } from 'react';
import Spinner from '../Spinmner/Spinner';
import MarvelServiсe from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    };

    marvelService = new MarvelServiсe();

    componentDidMount() {
        this.updateChar();

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

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //id 404
        // const id = 1011245;
        console.log(id)
        this.marvelService
            .getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null


        //Условний рендерінг
        // if (loading) {
        //     return <Spinner />
        // }



        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner" >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepagem, wiki } = char;

    return (
        <div className="randomchar__block">
            {thumbnail.includes('image_not_available') ?
                <img src={thumbnail} style={{ objectFit:'contain' }} alt="Random character" className="randomchar__img" />
                :
                <img src={thumbnail} alt="Random character" className="randomchar__img" />
            }
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepagem} className="button button__main" >
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;