import { Component } from 'react';
import './charList.scss';
import MarvelServiсe from '../../services/MarvelService';
import Spinner from '../Spinmner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


class CharList extends Component {

  state = {
    char: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelServiсe();

  componentDidMount() {
    this.updateChars();
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

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError)
  }


  render() {
    const { char, loading, error } = this.state

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <Card characters={char} onCharSelected={this.props.onCharSelected} /> : null

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }

}

const Card = ({ characters, onCharSelected }) => {
  return (
    <>
      {characters.map((char) => {
        const { thumbnail, name, id } = char;

        return (
          <li
            className="char__item"
            key={id} onClick={() => onCharSelected(id)}>
            {
              thumbnail.includes('image_not_available') ?
                <img src={thumbnail} alt={name} style={{ objectFit: 'contain' }} />
                :
                <img src={thumbnail} alt={name} />
            }
            <div className="char__name">{name}</div>
          </li>
        );
      })}
    </>
  );
};

export default CharList;