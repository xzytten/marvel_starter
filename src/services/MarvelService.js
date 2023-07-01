class MarvelServiсe {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=519c774650a433ab0449d5fbf75e1dfb'


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    
        return res.data.results.map(item => this._transformCharacter(item));
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);

        this.checkDescription(res.data.results[0]);

        return this._transformCharacter(res.data.results[0]);
    }

    checkDescription = (desc) => {
        if (desc.description === '') {
            desc.description = 'Dont have description'
        } else if (desc.description.length > 151) {
            desc.description = desc.description.slice(0, 150) + '...';
        }
    }


    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

}



export default MarvelServiсe;