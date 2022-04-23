import React, {Component} from 'react';

import MusicSearch from "./components/Search/MusicSearch";
import MainUi from "./components/MainUI/MainUI";
import "./App.css"
import "./components/MainUI/MainUI.css"
import Musicdemo from "./components/Search/Musicdemo";
class App extends Component {

    render() {
        return (
            <div className={'AppBg'}>
                {/*<MusicSearch/>*/}
                    <MainUi/>
                {/*<Musicdemo/>*/}
            </div>
        );
    }
}

export default App;
