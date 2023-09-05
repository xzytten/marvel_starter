import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage, ComicsPage, Page404, SingleCharacter, SingleComic } from '../pages';
import SinglePage from '../pages/SinglePage';
import AppHeader from "../appHeader/AppHeader";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/"
                            element={<MainPage />} />
                        <Route path="/comics"
                            element={<ComicsPage />} />
                        <Route path='/comics/:id'
                            element={<SinglePage Component={SingleComic} TypeComponent="comic"/>} />
                            <Route path='/characters/:id'
                            element={<SinglePage Component={SingleCharacter} TypeComponent="char"/>} />
                        <Route path="*"
                            element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;