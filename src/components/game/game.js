import React, {
    Component
} from 'react';
import './styles/default.scss';


import Timer from './timer.js';
import Header from '../header/header.js';
import ViewPane from '../view-pane/view-pane.js';
import DiceTray from '../dice-tray/dice-tray.js';
import TopBar from '../top-bar/top-bar.js';
import ReactPlayer from 'react-player'
var _ = require('lodash');
var Sound = require('react-sound').default;

const random_distribution = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8];
const get_random_die_face = function() {
    return random_distribution[Math.floor(Math.random(0, random_distribution.length) * random_distribution.length)];
};

const get_random_dice_array = function(count) {
    return _.range(0, count).map((n) => get_random_die_face());
};

const songs = [
    "/sounds/level1/1.mp3",
    "/sounds/level1/3.mp3",
    "/sounds/level1/3.mp3",
    "/sounds/level1/2.mp3",
    "/sounds/level1/3.mp3",
    "/sounds/level1/1.mp3",
    "/sounds/level1/2.mp3",
    "/sounds/level1/3.mp3",
    "/sounds/level1/1.mp3",
    "/sounds/level1/2.mp3",
    "/sounds/level1/3.mp3"
];

const overlayclasses = [
    "overlay-passing",
    "overlay-passing none",
    "overlay-passing blue",
    "overlay-passing lightblue",
    "overlay-passing orange",
    "overlay-passing green",
    "overlay-passing lightgreen",
    "overlay-passing red",
    "overlay-passing yellow",
    "overlay-passing pink",
];

class Game  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locked_tray: [],
            free_tray: _.range(0, 6),
            song: 0,
            playing: true,
            played: 0,
            loaded: 0,
            overlayclass: 0
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

    payCost(cost) {
        let reducedCostForm = cost.reduce((acc, n) => {
            if(!acc[n])acc[n] = {};
            if(!acc[n].required) {
                acc[n].required = 1;
            }
            else {
                acc[n].required++;
            }
            return acc;
        }, {});

        this.state.locked_tray.forEach((n) => {
            if(reducedCostForm[n]) {
                if(!reducedCostForm[n].obtained) {
                    reducedCostForm[n].obtained = 1;
                } else {
                    reducedCostForm[n].obtained++;
                }
            }
        });

        let canPay = Object.keys(reducedCostForm).reduce((acc, n) => {
            if(acc === false) {
                return false;
            }
            if(!reducedCostForm[n].obtained || reducedCostForm[n].obtained < reducedCostForm[n].required) {
                return(false);
            } else {
                return(true);
            }
        }, true);

        let totalToBeFreed = Object.keys(reducedCostForm).reduce((acc, n) => {
            return acc + reducedCostForm[n].required;
        }, 0);

        if(canPay === true) {
            let current_locked_tray = this.state.locked_tray;
            Object.keys(reducedCostForm).forEach((codePart) => {
                current_locked_tray = current_locked_tray.filter((n) => {
                    if(""+n === codePart) {
                        if(reducedCostForm[codePart].required > 0) {
                            reducedCostForm[codePart].required--;
                            return false;
                        }
                    }
                    return true;
                });
                this.state.locked_tray = current_locked_tray;
                console.log("total to be freed: " + totalToBeFreed);
                let new_die = get_random_dice_array(totalToBeFreed);
                console.log(new_die);
                this.state.free_tray = this.state.free_tray.concat(new_die);
                console.log("new free tray:");
                console.log(this.state.free_tray);
            });
        }

        this.forceUpdate();

        return canPay;
    }

    handleSongLoading() {
        
    }

    handleSongPlaying() {
        
    }

    handleSongFinishedPlaying() {
        console.log("finished song");
        if(this.state.song < songs.length - 1) {
            console.log(this.state.song);
            this.state.song++;
            this.state.played=0;
            this.state.loaded=0;
            this.forceUpdate();
        } else {
            // GAME OVER MAN
        }
    }

    changeOverlayClass() {
        this.state.overlayclass++;
        if(this.state.overlayclass >= overlayclasses.length) {
            this.state.overlayclass = 0;
        }
        this.forceUpdate();
    }

    render() {
        return (
                <div className = "game" >
                <div className = {overlayclasses[this.state.overlayclass]}>
                </div>
                <Header />
                <div className = "game-board">
                <ViewPane payCost={this.payCost.bind(this)}/>
                  <TopBar lives={3} score={55} />
                <DiceTray locked_tray={this.state.locked_tray} free_tray={this.state.free_tray}
            reroll={this.reroll.bind(this)} lockInDie={this.lockInDie.bind(this)}/>
                </div>

                <Timer tick={this.changeOverlayClass.bind(this)} />
                <ReactPlayer url={songs[this.state.song]}
            loaded={this.state.loaded}
            playing
            played={this.state.played}
            onEnded={this.handleSongFinishedPlaying.bind(this)}
            height={10}/>
                </div>
        );
    }
}

export default Game;
