import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // keys
    const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    const _baseOffset = 210;
    const _comicsOffset = 210;
    const _comicsApiKey = 'apikey=519c774650a433ab0449d5fbf75e1dfb';



    const getAllCharacters = async (offset = _baseOffset) => {
        console.log('3aharloh')
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }


    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?orderBy=-modified&limit=8&offset=${offset}&${_comicsApiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            description: comics.description,
            pageCount: comics.pageCount,
            title: comics.title,
            name: comics.name,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            language: comics.textObjects[0]?.language || "en-us",
        }
    }

    return {
        loading,
        error,
        clearError,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
        getCharacterByName
    };


}


export default useMarvelService;