import React, {
    Component
} from 'react';
import './styles/default.scss';
import { Button } from 'reactstrap';
var _ = require('lodash');

const icons=[
    "thumbs-down",
    "thumbs-up",
    "eye",
    "certificate",
    "snapchat-ghost",
    "fire",
    "bug",
    "bullseye",
    "flask",
    "key",  // for treasures
    "bandcamp", // for treasures
    "birthday-cake", // for treasures
];

const Die = function(props) {
    const className = "fa fa-" + icons[props.type];
    let dieClassName = "die";
    if(props.locked){
        dieClassName += " locked";
    }
    if(props.disabled){
        dieClassName += " disabled";
    }
    return (
            <div className={dieClassName}
        onClick={() => props.lockIn(props.index)}>
            <i className={className}></i>
            </div>
    );
};

class DiceTray extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const free_dice_array = this.props.free_tray.map((n, key) => <Die type={n} index={key} lockIn={this.props.lockInDie} />);
        const locked_dice_array = this.props.locked_tray.map((n, key) => {
            if(n === 0){ // disabled because of thumbs down
                return <Die type={n} disabled={true}/>;
            } else { // regularly locked
                return <Die type={n} locked={true} />;
            }
        });
        return (
            <div>
                <div className = "dice-tray" >
                <div className = "locked-tray">
                {locked_dice_array}
                </div>
                <div className = "free-tray">
                {free_dice_array}
                </div>
                </div>
                <Button color="secondary" onClick={this.props.reroll}>Opnieuw Gooien</Button>
                </div>
        );
    }
}

export default DiceTray;
