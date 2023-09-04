import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import './singleCharacter.scss'

const SingleCharacter = ({data}) => {
    
    const { title, description, thumbnail, name } = data;
    
    return (
        <div className="single-comic">
              <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/comics" href="#" className="single-comic__back">Back to all</Link>
        </div>
    )
};

export default SingleCharacter;

