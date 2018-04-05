import React, {
    Component
} from 'react';
import './styles/default.scss';

import Header from '../header/header.js';
import ViewPane from '../view-pane/view-pane.js';
import DiceTray from '../dice-tray/dice-tray.js';
import TopBar from '../top-bar/top-bar.js';

class Game extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
                <div className = "game" >
                <Header />
                <div className = "game-board">
                  <ViewPane />
                  <TopBar lives={3} score={55} />
                  <DiceTray />
                </div>
                </div>
        );
    }
}

export default Game;
