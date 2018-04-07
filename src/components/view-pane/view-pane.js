import React, {
    Component
} from 'react';
import './styles/index.scss';
import { Button } from 'reactstrap';
var _ = require('lodash');

const world_width = 6;
const world_height = 4;

const world = [
    // 0
    {
        tile: "0_1",
        code: [3, 4],
        blocked: []
    },
    {
        tile: "0_2",
        code: [2],
        blocked: []
    },
    {
        tile: "1_1",
        code: [3, 2],
        blocked: ["right"]
    },
    {
        tile: "2_1",
        code: [],
        blocked: ["left"]
    },
    {
        tile: "4_1",
        code: [5, 5],
        blocked: []
    },
    {
        tile: "0_1",
        code: [3, 3, 3],
        blocked: []
    },
    // 6
    {
        tile: "0_3",
        code: [3, 4, 4],
        blocked: []
    },
    {
        tile: "0_1",
        code: [1, 2 ],
        blocked: []
    },
    // 8
    {
        tile: "1_2",
        code: [2, 2],
        blocked: ["right"]
    },
    {
        tile: "2_2",
        code: [],
        blocked: ["left"]
    },
    // 10
    {
        tile: "1_2",
        code: [],
        blocked: ["right"]
    },
    {
        tile: "2_1",
        code: [],
        blocked: ["left"]
    },
    {
        tile: "0_1",
        code: [3, 4],
        blocked: []
    },
    {
        tile: "0_3",
        code: [3, 4],
        blocked: []
    },
    // 14
    {
        tile: "9_1",
        code: [3, 4],
        blocked: ["down"]
    },
    // 15
    {
        tile: "1_1",
        code: [3, 4],
        blocked: ["right"]
    },
    // 16
    {
        tile: "8_1",
        code: [3, 4],
        blocked: ["left", "right"]
    },
    // 17
    {
        tile: "2_2",
        code: [3, 4],
        blocked: ["left"],
        exit: true
    },
    // 18
    {
        tile: "0_2",
        code: [3, 4],
        blocked: []
    },
    {
        tile: "1_1",
        code: [3, 4],
        blocked: ["right"]
    },
    // 20
    {
        tile: "3_1",
        code: [3, 4],
        blocked: ["left", "up"]
    },
    // 21
    {
        tile: "1_2",
        code: [3, 4],
        blocked: ["right"]
    },
    // 22
    {
        tile: "6_1",
        code: [3, 4],
        blocked: ["left"]
    },
    {
        tile: "0_3",
        code: [3, 4],
        blocked: []
    },
];

const getIndexFromCartesianCoords = function({x, y}) {
    return (y*world_width + x);
};

const getTileInWorld = function(coords) {
    let {x, y} = coords;
    if((x < 0) || (y < 0) ||
       (x >= world_width) ||
       (y >= world_height)) {
        return {
            tile: "border",
            code: [],
            x: x,
            y: y
        };
    }
    let tile = world[getIndexFromCartesianCoords(coords)];
    tile.x = x;
    tile.y = y;
    return tile;
};

const getLocalTiles = function(coords) {
    let {x, y} = coords;
    let local_world = getLocalWorld(coords);

    return({
        topLeft: getTileInWorld(local_world['topLeft']),
        topMid: getTileInWorld(local_world['topMid']),
        topRight: getTileInWorld(local_world['topRight']),
        left: getTileInWorld(local_world['left']),
        center: getTileInWorld(local_world['center']),
        right: getTileInWorld(local_world['right']),
        botLeft: getTileInWorld(local_world['botLeft']),
        botMid: getTileInWorld(local_world['botMid']),
        botRight: getTileInWorld(local_world['botRight'])
    });
};

const getLocalWorld = function({x, y}) {
    return({
        topLeft: {x: x-1, y: y-1},
        topMid: {x: x, y: y-1},
        topRight: {x: x+1, y: y-1},
        left: {x: x-1, y: y},
        center: {x: x, y: y},
        right: {x: x+1, y: y},
        botLeft: {x: x-1, y: y+1},
        botMid: {x: x, y: y+1},
        botRight: {x: x+1, y: y+1}
    });
}

const travel_up = function({x, y}) {
    let new_y = y - 1;
    if(new_y < 0) new_y = 0;
    return({
        x: x,
        y: new_y
    });
};

const travel_down = function({x, y}) {
    let new_y = y + 1;
    if(!(new_y < world_height)) new_y = world_height - 1;
    return({
        x: x,
        y: new_y
    });
};

const travel_left = function({x, y}) {
    let new_x = x - 1;
    if(new_x < 0) new_x = 0;
    return({
        x: new_x,
        y: y
    });
};

const travel_right = function({x, y}) {
    let new_x = x + 1 ;
    if(!(new_x < world_width)) new_x = world_width - 1;
    return({
        x: new_x,
        y: y
    });
};

const travel = function(coords, direction) {
    switch(direction) {
    case 'up':
        return travel_up(coords);
        break;
    case 'down':
        return travel_down(coords);
        break;
    case 'left':
        return travel_left(coords);
        break;
    case 'right':
        return travel_right(coords);
        break;
    }
};

const icons=[
    "thumbs-down",
    "thumbs-up",
    "eye",
    "certificate",
    "snapchat-ghost",
    "fire",
    "bug",
    "bullseye",
    "flask"
];

const Key = function(props) {
    let icon_name = icons[props.type];
    if(props.type >= icons.length) {
        icon_name = "window-maximize";
    }
    const className = "fa fa-" + icon_name;
    return (
            <div className="key">
            <i className={className}></i>
            </div>
    );
}

const Tile = function(props) {
    const className="tile "+props.location;
    const tileClass="image_" + props.tile.tile;
    let keyListClass="keyList_"+props.location;
    if(props.tile.tile === "border") {
        keyListClass="keyList_border";
    }
    if(props.blocked === true) {
        keyListClass="keyList_border";
    }
    let keys = props.tile.code.map((number) =>
                                  <Key type={number} />
                                  );
    if(keys.length === 0) {
        keys = _.range(0,2).map((n) =>
                               <Key type={99999} />
                              );
    }

    const payCostAndWalk = function() {
        if(props.payCost(props.tile.code) === true) {
            props.walk();
        }
    };

    return(
            <div className={className}>
            <div className={tileClass}>
            <div className={keyListClass} onClick={() => payCostAndWalk()}>{keys}</div>
            {props.tile.exit ?
             <h1>EXIT</h1>:
             <h1></h1>
            }
            </div>
            </div>
    );
};

class ViewPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                x: 1,
                y: 1
            }};
    }

    travel(direction) {
        this.state.position = travel(this.state.position, direction);
        this.forceUpdate();
    }

    render() {
        const local_tiles = getLocalTiles(this.state.position);
        console.log(local_tiles);
        console.log(world);

        const left_blocked = local_tiles.center.blocked.indexOf("left") > -1;
        const right_blocked = local_tiles.center.blocked.indexOf("right") > -1;
        const top_blocked = local_tiles.center.blocked.indexOf("up") > -1;
        const bot_blocked = local_tiles.center.blocked.indexOf("down") > -1;

        return (
                <div className = "view-pane" >
                <div className="barbarian"></div>
                <Tile location={"topleft"} tile={local_tiles['topLeft']} walk={() => {}}/>
                <Tile location={"topmid"} tile={local_tiles['topMid']} walk={() => this.travel('up')} blocked={top_blocked} payCost={this.props.payCost}/>
                <Tile location={"topright"} tile={local_tiles['topRight']} walk={() => {}}/>
                <Tile location={"midleft"} tile={local_tiles['left']} walk={() => this.travel('left')} blocked={left_blocked} payCost={this.props.payCost}/>
                <Tile location={"center"} tile={local_tiles['center']} walk={() => {}}/>
                <Tile location={"midright"} tile={local_tiles['right']} walk={() => this.travel('right')} blocked={right_blocked} payCost={this.props.payCost}/>
                <Tile location={"botleft"} tile={local_tiles['botLeft']} walk={() => {}}/>
                <Tile location={"botmid"} tile={local_tiles['botMid']} walk={() => this.travel('down')} blocked={bot_blocked} payCost={this.props.payCost}/>
                <Tile location={"botright"} tile={local_tiles['botRight']} walk={() => {}}/>
                </div>
        );
    }
}

export default ViewPane;
