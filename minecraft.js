const page = document.querySelector('.page');

let worldMat = [];
let world;
class TileObj {
    constructor(tileName) {
        this.tileName = tileName;
    }

    clickOnTile (nowTool) {
        if (condition) { //TODO
            
        }
    }
}

class Tool {
    constructor(toolName, canWorkOn) {
        this.toolName = toolName;
        this.canWorkOn = canWorkOn;
    }
}

let tilesTypes = new Map();
tilesTypes.set(0, new TileObj('sky-tile'));
tilesTypes.set(1, new TileObj('grass-tile'));
tilesTypes.set(2, new TileObj('soil-tile'));
tilesTypes.set(3, new TileObj('stone-tile'));
tilesTypes.set(4, new TileObj('wood-tile'));
tilesTypes.set(5, new TileObj('leaf-tile'));

let toolsTypes = new Map();
toolsTypes.set(0, new Tool('axe', ['wood-tile', 'leaf-tile']));
toolsTypes.set(0, new Tool('pickaxe', ['stone-tile']));
toolsTypes.set(0, new Tool('shovel', ['grass-tile', 'soil-tile']));

function createWorld(numBlocksInWidth = 25) {
    // create matrix
    for (let row = 0; row < 25; row++) {
        worldMat[row] = [];
        for (let col = 0; col < numBlocksInWidth; col++) {
            // sky
            if (row < 13) {
                worldMat[row][col] = 0;
            } else if (row === 13) { // grass
                worldMat[row][col] = 1;
            } else { // ground
                worldMat[row][col] = 2;
            }
        }
    }
    // add objects
    // create the world divs
    let worldDivs = document.createElement('div');
    worldDivs.classList.add('world-divs-warpper');
    worldMat.map(row => {row.map(tileNume => {
        let tile = document.createElement('div');
        tile.classList.add(tilesTypes.get(tileNume));
        worldDivs.appendChild(tile);
    })});
    // upload
    world.appendChild(worldDivs);
}

function startGame() {
    console.log('start');
    // delete text
    page.innerHTML = 
     `<div class="game-page">
        <div class="world"></div>
        <div class="bar"></div>
    </div>`;

    world = document.querySelector('.world');
    createWorld();
    // createSideBar(); TODO
    
}

document.querySelector('.start-btn').addEventListener('click', startGame);