const page = document.querySelector('.page');

let worldMat = [];
let world;
let bar;
class TileObj {
    constructor(tileName, canPickup) {
        this.tileName = tileName;
        this.canPickup = canPickup;
    }

    clickOnTile (nowTool) {
        if (nowTool.canWorkOn.contains(this.tileName)) {
            // add this tile to the inventory //TODO
            // change this tile to sky tile //TODO           
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
tilesTypes.set(0, new TileObj('sky-tile', false));
tilesTypes.set(1, new TileObj('grass-tile', true));
tilesTypes.set(2, new TileObj('soil-tile', true));
tilesTypes.set(3, new TileObj('stone-tile', true));
tilesTypes.set(4, new TileObj('wood-tile', true));
tilesTypes.set(5, new TileObj('leaf-tile', true));

let toolsTypes = new Map();
toolsTypes.set(0, new Tool('axe', ['wood-tile', 'leaf-tile']));
toolsTypes.set(1, new Tool('pickaxe', ['stone-tile']));
toolsTypes.set(2, new Tool('shovel', ['grass-tile', 'soil-tile']));

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
    // add objects //TODO
    // create the world divs
    let worldDivs = document.createElement('div');
    worldDivs.classList.add('world-divs-warpper');
    worldMat.map(row => {row.map(tileNum => {
        let tile = document.createElement('div');
        tile.classList.add(tilesTypes.get(tileNum).tileName);
        worldDivs.appendChild(tile);
    })});
    // upload
    world.appendChild(worldDivs);
}
function createToolbox() {
    let toolbox = document.createElement('div');
    toolbox.classList.add('tool-box');

    toolsTypes.forEach(tool => {
        let t = document.createElement('div');
        
        t.classList.add('tool');
        t.classList.add(tool.toolName);
        t.innerText = tool.toolName;
        let a = document.createElement('div');
        t.appendChild(a).classList = "tool-img";
        toolbox.appendChild(t);
    });
    return toolbox;
}

function createInventory() {
    let inventory = document.createElement('div');
    inventory.classList.add('inventory');

    tilesTypes.forEach(tile => {
        if (tile.canPickup) {
            let t = document.createElement('div');

            t.classList.add('tile');
            t.classList.add(`${tile.tileName}-inventory`);
            t.innerText = '0';
            let a = document.createElement('div');
            a.classList.add(tile.tileName);
            a.classList.add("tile-img");
            t.appendChild(a);
            inventory.appendChild(t);
        }
        return inventory;
    });
    return inventory;
}

function createSideBar() {
    let toolbox = createToolbox();
    let inventory = createInventory();
    let resetBtn = document.createElement('button');
    resetBtn.classList.add('in-game-btn');
    resetBtn.innerText = 'Reset';

    bar.appendChild(toolbox);
    bar.appendChild(inventory);
    bar.appendChild(resetBtn);//TODO
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
    bar = document.querySelector('.bar');
    createWorld();
    createSideBar();
}

document.querySelector('.start-btn').addEventListener('click', startGame);