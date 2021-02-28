const page = document.querySelector('.page');

let worldMat = [];
let world;
let bar;
let inventory;
let toolInUse = null;
let tileInUse = null;

class TileObj {
    constructor(tileName, canPickup) {
        this.tileName = tileName;
        this.canPickup = canPickup;
    }
}

class Tool {
    constructor(toolName, canWorkOn) {
        this.toolName = toolName;
        this.canWorkOn = canWorkOn;
    }
}

class GameObj {
    constructor(objName, matrix) {
        this.objName = objName;
        this.matrix = matrix;
    }
}

let tilesTypes = new Map();
tilesTypes.set(0, new TileObj('sky-tile', false));
tilesTypes.set(1, new TileObj('grass-tile', true));
tilesTypes.set(2, new TileObj('soil-tile', true));
tilesTypes.set(3, new TileObj('stone-tile', true));
tilesTypes.set(4, new TileObj('wood-tile', true));
tilesTypes.set(5, new TileObj('leaf-tile', true));
tilesTypes.set(6, new TileObj('cloud-tile', false));

let toolsTypes = new Map();
toolsTypes.set(0, new Tool('axe', ['wood-tile', 'leaf-tile']));
toolsTypes.set(1, new Tool('pickaxe', ['stone-tile']));
toolsTypes.set(2, new Tool('shovel', ['grass-tile', 'soil-tile']));

let gameObjects = new Map();
gameObjects.set('tree', new GameObj('tree',
    [[5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [0, 0, 4, 0, 0],
    [0, 0, 4, 0, 0],
    [0, 0, 4, 0, 0]]));
gameObjects.set('rock', new GameObj('rock',
    [[0, 0, 3, 3, 0],
    [0, 3, 3, 3, 0],
    [3, 3, 3, 3, 3],]));
gameObjects.set('cloud', new GameObj('cloud',
    [[0, 0, 6, 6, 6, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 6, 6, 0, 0]]));

function addObjInMat(objName, x, y) {
    let objToInsert = gameObjects.get(objName);
    
    for (let i = 0; i < objToInsert.matrix.length; i++) {
        for (let j = 0; j < objToInsert.matrix[0].length; j++) {
            worldMat[i + x][j + y] = objToInsert.matrix[i][j];
        }
    }
    console.log(worldMat);
}

function isNearSky(divI, divJ) {
    
    // if the tile is near the sky or cloud
    if (worldMat[divI][divJ - 1] === 0 ||
        worldMat[divI][divJ - 1] === 6 ||
        worldMat[divI][divJ + 1] === 0 ||
        worldMat[divI][divJ + 1] === 6 ||
        worldMat[divI - 1][divJ] === 0 ||
        worldMat[divI - 1][divJ] === 6 ||
        worldMat[divI + 1][divJ] === 0 ||
        worldMat[divI + 1][divJ] === 6) {
        return true;
    } else {
        return false;
    }
}

function updateTile(divI, divJ, targetedDiv, targetedClass) {
    let classNum;
    switch (targetedClass) { //TODO - hard coded
        case 'grass-tile':
            classNum = 0;
            break;
        case 'soil-tile':
            classNum = 1;
            break;
        case 'stone-tile':
            classNum = 2;
            break;
        case 'wood-tile':
            classNum = 3;
            break;
        case 'leaf-tile':
            classNum = 4;
            break;
    
        default:
            break;
    }
    // add tile to inventory 
    inventory.children[classNum].replaceChild(document.createTextNode(`${parseInt(inventory.children[classNum].innerText) + 1}`), inventory.children[classNum].firstChild);
    // remove tile from world mat
    worldMat[divI][divJ] = 0;
    console.log('------------', worldMat);
    // update the div in the world
    targetedDiv.classList.remove(targetedClass);
    targetedDiv.classList.add('sky-tile');
}

function worldListenerHandler() {
    if (toolInUse) {
        let targetedDiv = event.target;
        let targetedClass = targetedDiv.className;

        let classNum;
        switch (targetedClass) { //TODO - hard coded
            case 'sky-tile':
                classNum = 0;
                break;
            case 'grass-tile':
                classNum = 1;
                break;
            case 'soil-tile':
                classNum = 2;
                break;
            case 'stone-tile':
                classNum = 3;
                break;
            case 'wood-tile':
                classNum = 4;
                break;
            case 'leaf-tile':
                classNum = 5;
                break;
            case 'cloud-tile':
                classNum = 6;
                break;
        
            default:
                classNum = -1;
                break;
        }

        console.log('>>>',targetedClass);
        console.log('>>>',toolInUse.canWorkOn);
        console.log('>>>',tilesTypes.get(classNum).tileName);
        if (classNum >= 0 && toolInUse.canWorkOn.includes(tilesTypes.get(classNum).tileName)) {
            console.log('>>>>>>>>>>>>5');
            let id = targetedDiv.id;
            let temp = id.split('-');
            let divI = parseInt(temp[1]);
            let divJ = parseInt(temp[2]);
            // if the tile is in a place that can be taken
            if (isNearSky(divI, divJ)) {
                updateTile(divI, divJ, targetedDiv, targetedClass);
            }
        } else {
            // sign the tool that cann't be used //TODO
        }
    } else if (tileInUse) {
        targetedDiv = event.target;

        // if the tile can be put in this place
        if (!targetedDiv.canPickup) {
            // place the tile in world //TODO
            
            // decrease the tile from the inventory //TODO
        } else {
            // sign the tile that cann't be used //TODO
        }
    }
}

function toolsListenerHandler() { //TODO
    let targetedDiv = event.target;
    let targetedtext = targetedDiv.parentElement.innerText;

    // save the in use tool
    if (Array.from(toolsTypes.values()).map(t => t.toolName).includes(targetedtext)) {
        if (targetedtext === 'axe') { //TODO hardcoded
            toolInUse = toolsTypes.get(0);
            tileInUse = null;
        } else if (targetedtext === 'pickaxe') {
            toolInUse = toolsTypes.get(1);
            tileInUse = null;
        } else if (targetedtext === 'shovel') {
            toolInUse = toolsTypes.get(2);
            tileInUse = null;
        }
    }
    console.log(toolInUse);
    // mark it in the toolbox //TODO
}

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
    addObjInMat('cloud', 2, 3);
    addObjInMat('rock', 10, 1);
    addObjInMat('rock', 10, 11);
    addObjInMat('tree',5, 19);

    // create the world divs
    let worldDivs = document.createElement('div');
    worldDivs.classList.add('world-divs-warpper');
    worldMat.map((row, i) => {row.map((tileNum, j) => {
        let tile = document.createElement('div');
        tile.classList.add(tilesTypes.get(tileNum).tileName);
        tile.setAttribute("id", `div-${i}-${j}`);
        worldDivs.appendChild(tile);
    })});
    // upload
    world.appendChild(worldDivs);
    console.log(world); //TODO
}

function createToolbox() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>1')
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
    inventory = document.createElement('div');
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
    console.log('>>>>>>>>>>>2')
    let toolbox = createToolbox();
    let inventory = createInventory();
    let resetBtn = document.createElement('button'); //TODO?
    resetBtn.classList.add('in-game-btn');
    resetBtn.innerText = 'Reset';

    bar.appendChild(toolbox);
    bar.appendChild(inventory);
    bar.appendChild(resetBtn);
}

function startGame() {
    console.log('start');
    // delete text and create the 2 main divs
    page.innerHTML = 
     `<div class="game-page">
        <div class="world"></div>
        <div class="bar"></div>
    </div>`;

    world = document.querySelector('.world');
    bar = document.querySelector('.bar');
    createWorld();
    console.log('>>>>>>>>>>>>3')
    createSideBar();
    // create event listeners //TODO
    createListeners();
}

function createListeners() {
    // create world listener
    world.addEventListener('click', worldListenerHandler); //TODO
    // create tools listener
    bar.children[0].addEventListener('click', toolsListenerHandler); //TODO
    console.log('>>>>>>>>>>4')
    // create inventory listeners
    //bar.children[1].addEventListener('click', inventoryListenerHandler); //TODO
    // create button listeners
    //bar.children[2].addEventListener('click', btnListenerHandler); //TODO
}

document.querySelector('.start-btn').addEventListener('click', startGame);