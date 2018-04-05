import React, {
    Component
} from 'react';
import './styles/default.scss';
var FontAwesome = require('react-fontawesome');
var _ = require('lodash');

const LivesList = function(props) {
    const lives = _.range(1, props.lives + 1);
    const listLives = lives.map((life) =>
                                <li className="life"><i className="fa fa-heart"></i></li>
                               );
    return (
            <ul className="life-list">{listLives}</ul>
    );
};

const ScoreList = function(props) {
    return (
            <h2 className="score">{props.score}</h2>
    );
};

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className = "top-bar" >
                <ScoreList score={this.props.score} />
                <LivesList lives={this.props.lives} />
                </div>
        );
    }
}

export default TopBar
