import { Component } from 'react';
import './charList.scss';
import MarvelServiсe from '../../services/MarvelService';

class CharList extends Component {
    state = {
        char: []
    }
    marvelService = new MarvelServiсe();

    componentDidMount() {
        this.updateChars();
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
        })
        console.log(char)
    }

    updateChars = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharLoaded)
    }


    render() {
        const {char} = this.state
        return (
            <div className="char__list">
                <ul className="char__grid">
                     {/* <li className="char__item">
                    <img src={''} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>  */}
                {<Card characters={char}/>}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

const Card = ({ characters }) => {
    return (
      <>
        {characters.map((char) => {
          const { thumbnail, name } = char;
  
          return (
            <li className="char__item" key={char.id}>
              <img src={thumbnail} alt={name} />
              <div className="char__name">{name}</div>
            </li>
          );
        })}
      </>
    );
  };

export default CharList;