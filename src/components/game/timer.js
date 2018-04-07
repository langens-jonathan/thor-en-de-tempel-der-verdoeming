// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/
import React, {
    Component
} from 'react';
import './styles/default.scss';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0,
            start: Date.now()
        };
        this.timer = setInterval(this.tick.bind(this), 600);
    }

    tick(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered
        this.setState({elapsed: new Date() - this.state.start});
        this.props.tick(this.state.elapsed);
    }

    render() {

        // Calculate elapsed to tenth of a second:
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return <div  className = "timer-box"> <p>De tempel stort in over <b>{320-seconds} seconden!!</b></p></div>;
    }
};

export default Timer;
// ReactDOM.render(
//     <TimerExample start={Date.now()} />,
//     document.getElementById('container')
// );
