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

const random_distribution = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8];
const get_random_die_face = function() {
    return random_distribution[Math.floor(Math.random(0, random_distribution.length) * random_distribution.length)];
};

const get_random_dice_array = function(count) {
    return _.range(0, count).map((n) => get_random_die_face());
};

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
        this.state = {
            locked_tray: [],
            free_tray: _.range(0, 6)
        };
        this.reroll();
    }

    cleanThumbsDownDie() {
        const bad_dice = this.state.locked_tray.filter((n) => n === 0);
        if(bad_dice.length > 1) { // more than one thumbs down die..
            const count = this.state.locked_tray.reduce((acc, n) => {
                if(n === 1) {
                    acc += 2;
                }
                return acc;
            }, 0);
            if(count > 1) {
                let good_counter = Math.floor(count/2); // this many thumb ups will be removed
                let bad_counter = 2 * good_counter;     // and twice as many thumbs down :)
                const to_add = good_counter + bad_counter;
                console.log(good_counter);
                console.log(bad_counter);
                const new_locked_tray = this.state.locked_tray.filter((n) => {
                    console.log("n: " + n + " goods: " + good_counter + " bads: " + bad_counter);
                    if(n > 1) {
                        return true; // not a thumb so let's not worry
                    }
                    if(n === 1) { // okay it's a thumbs up
                        if(good_counter-- > 0) {
                            return false;
                        }
                    }
                    if(n === 0) { // thumbs down folks!
                        if (bad_counter-- > 0) {
                            return false;
                        }
                    }
                    return true;
                });
                console.log("new locked tray: ");
                console.log(new_locked_tray);
                this.state.locked_tray = new_locked_tray;
                this.state.free_tray = this.state.free_tray.concat(get_random_dice_array(to_add));
            }
            console.log("but we could clear: ..." + count);
            const thumbs_down_to_move_up = this.state.free_tray.filter((n) => n === 0);
            if(thumbs_down_to_move_up > 1) {
                const free_dice_to_remain_in_free_tray = this.state.filter((n) => n !== 0);
                this.state.locked_tray = this.state.locked_tray.concat(thumbs_down_to_move_up);
                this.state.free_tray = free_dice_to_remain_in_free_tray;
                this.cleanThumbsDownDie();
            }
            this.forceUpdate();
        }
    }

    lockInDie(free_dice_index) {
        this.state.locked_tray = this.state.locked_tray.concat(this.state.free_tray[free_dice_index]);
        this.state.free_tray = this.state.free_tray.filter((n, i) => { return (i !== free_dice_index);});
        this.cleanThumbsDownDie();
        this.forceUpdate();
    }

    reroll() {
        const count = this.state.free_tray.length;
        const random_dice = get_random_dice_array(count);
        const random_dice_thumbs_down = random_dice.filter((n) => n === 0);
        const random_dice_for_free_tray = random_dice.filter((n) => n !== 0);
        this.state.free_tray = random_dice_for_free_tray;
        this.state.locked_tray = this.state.locked_tray.concat(random_dice_thumbs_down);
        this.cleanThumbsDownDie();
        this.forceUpdate();
    }

    render() {
        const free_dice_array = this.state.free_tray.map((n, key) => <Die type={n} index={key} lockIn={this.lockInDie.bind(this)} />);
        const locked_dice_array = this.state.locked_tray.map((n, key) => {
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
                <Button color="secondary" onClick={this.reroll.bind(this)}>Opnieuw Gooien</Button>
                </div>
        );
    }
}

export default DiceTray;
