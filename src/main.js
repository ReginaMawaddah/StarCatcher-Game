import './style.css';
import * as THREE from 'three';

// ======================
// SCENE
// ======================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x6EC6FF);

// scene.fog = new THREE.Fog(
//     0x87CEEB,
//     25,
//     90
// );

// ======================
// CAMERA
// ======================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,15,18);
camera.lookAt(0,0,-20);

// ======================
// RENDERER
// ======================

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled=true;

document.body.appendChild(renderer.domElement);

// ======================
// LIGHT
// ======================

const ambient=new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);

const sunLight=new THREE.DirectionalLight(0xffffff,2);

sunLight.position.set(10,20,10);

sunLight.castShadow=true;

scene.add(sunLight);

// ======================
// RUMPUT
// ======================

const grass=new THREE.Mesh(

    new THREE.PlaneGeometry(80,120),

    new THREE.MeshStandardMaterial({
        color:0x3cb043
    })

);

grass.rotation.x=-Math.PI/2;

grass.receiveShadow=true;

scene.add(grass);

// ======================
// JALAN
// ======================

const road=new THREE.Mesh(

    new THREE.BoxGeometry(14,0.2,100),

    new THREE.MeshStandardMaterial({
        color:0x444444
    })

);

road.position.z=-40;

road.receiveShadow=true;

scene.add(road);

const borderMaterial = new THREE.MeshStandardMaterial({
    color:0xffffff
});

const leftBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.2,0.1,100),
    borderMaterial
);

leftBorder.position.set(-7.1,0.15,-40);
scene.add(leftBorder);

const rightBorder = leftBorder.clone();
rightBorder.position.x = 7.1;
scene.add(rightBorder);

// ======================
// GARIS JALAN
// ======================

const roadLines=[];

for(let i=0;i<20;i++){

    const line=new THREE.Mesh(

        new THREE.BoxGeometry(0.3,0.05,2),

        new THREE.MeshStandardMaterial({
            color:0xffffff
        })

    );

    line.position.set(
        0,
        0.12,
        8-i*5
    );

    scene.add(line);

    roadLines.push(line);

}

// ======================
// MATAHARI
// ======================

const sun=new THREE.Mesh(

    new THREE.SphereGeometry(2,32,32),

    new THREE.MeshStandardMaterial({

        color:0xffdd44,

        emissive:0xffcc00,

        emissiveIntensity:2

    })

);

sun.position.set(-18,20,-35);

scene.add(sun);

// ======================
// AWAN
// ======================

const clouds = [];

function createCloud(x,z){

    const cloud=new THREE.Group();

    for(let i=0;i<5;i++){

        const part=new THREE.Mesh(

            new THREE.SphereGeometry(
                1.2,
                16,
                16
            ),

            new THREE.MeshStandardMaterial({
                color:0xffffff
            })

        );

        part.position.set(
            i*0.9,
            Math.random()*0.4,
            Math.random()*0.3
        );

        cloud.add(part);

    }

    cloud.position.set(
        x,
        15+Math.random()*3,
        z
    );

   scene.add(cloud);
    clouds.push(cloud);

}

createCloud(-10,-20);
createCloud(8,-35);
createCloud(-3,-55);

// ======================
// POHON
// ======================

const trees = [];

function createTree(x,z){

    const tree=new THREE.Group();

    const trunk=new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.25,
            0.35,
            2
        ),

        new THREE.MeshStandardMaterial({
            color:0x8B4513
        })

    );

    trunk.position.y=1;

    tree.add(trunk);

    const leaves=new THREE.Mesh(

        new THREE.ConeGeometry(
            1.2,
            2.5,
            8
        ),

        new THREE.MeshStandardMaterial({
            color:0x2E8B57
        })

    );

    leaves.position.y=3;

    tree.add(leaves);

    tree.position.set(
        x,
        0,
        z
    );

    scene.add(tree);
    trees.push(tree);

}

for(let i=0;i<35;i++){

    createTree(-10,-i*6);

    createTree(10,-i*6);

}

// ======================
// MOBIL MERAH SPORTY
// ======================

const car = new THREE.Group();

// Body utama
const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.2,0.8,4),
    new THREE.MeshStandardMaterial({
        color:0xe60012,
        metalness:0.85,
        roughness:0.18
    })
);

body.position.y=0.8;
body.castShadow=true;
car.add(body);

// Kabin
const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.6,0.8,2),
    new THREE.MeshStandardMaterial({
        color:0x222244
    })
);

cabin.position.set(0,1.5,-0.2);
cabin.castShadow=true;
car.add(cabin);

// Kap depan
const hood = new THREE.Mesh(
    new THREE.BoxGeometry(2,0.35,1),
    new THREE.MeshStandardMaterial({
        color:0xdd0000
    })
);

hood.position.set(0,1.0,1.5);
hood.rotation.x=-0.2;
car.add(hood);

// Bagasi
const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(2,0.35,1),
    new THREE.MeshStandardMaterial({
        color:0xdd0000
    })
);

trunk.position.set(0,1.0,-1.5);
trunk.rotation.x=0.2;
car.add(trunk);

// Roda
const wheelGeometry =
new THREE.CylinderGeometry(
0.45,
0.45,
0.35,
24
);

const wheelMaterial =
new THREE.MeshStandardMaterial({
color:0x111111
});

const wheels = [];

function addWheel(x,z){

const wheel =
new THREE.Mesh(
wheelGeometry,
wheelMaterial
);

wheel.rotation.z=Math.PI/2;

wheel.position.set(x,0.45,z);

wheel.castShadow=true;

car.add(wheel);
wheels.push(wheel);

}

addWheel(-1,1.3);
addWheel(1,1.3);
addWheel(-1,-1.3);
addWheel(1,-1.3);

// Lampu depan
const headMaterial =
new THREE.MeshStandardMaterial({

color:0xfff3a0,

emissive:0xffcc44,

emissiveIntensity:1

});

const head1 =
new THREE.Mesh(

new THREE.BoxGeometry(
0.3,
0.2,
0.05
),

headMaterial

);

head1.position.set(-0.6,0.8,2.02);

car.add(head1);

const head2=head1.clone();

head2.position.x=0.6;

car.add(head2);

// Lampu belakang
const tailMaterial=
new THREE.MeshStandardMaterial({

color:0xff2222,

emissive:0xaa0000

});

const tail1=
new THREE.Mesh(

new THREE.BoxGeometry(
0.3,
0.2,
0.05
),

tailMaterial

);

tail1.position.set(-0.6,0.8,-2.02);

car.add(tail1);

const tail2=tail1.clone();

tail2.position.x=0.6;

car.add(tail2);

car.position.set(0,0,4);

scene.add(car);

// ======================
// KONTROL
// ======================

// ======================
// DETEKSI DEVICE
// ======================

const isMobile =
/Android|iPhone|iPad|iPod|Mobile/i.test(
navigator.userAgent
);

const keys={};

// ======================
// SWIPE
// ======================

let touchStartX = 0;
let touchEndX = 0;

window.addEventListener("keydown",(e)=>{

keys[e.key.toLowerCase()]=true;

});

window.addEventListener("keyup",(e)=>{

// ======================
// SWIPE CONTROL
// ======================

window.addEventListener("touchstart",(e)=>{

    if(controlMode!=="swipe") return;

    touchStartX=e.changedTouches[0].clientX;

});

window.addEventListener("touchend",(e)=>{

    if(controlMode!=="swipe") return;

    touchEndX=e.changedTouches[0].clientX;

    const distance=touchEndX-touchStartX;

    if(distance>40){

        car.position.x+=2.5;

    }

    if(distance<-40){

        car.position.x-=2.5;

    }

    // Batas jalan

    if(car.position.x>roadLimit)
        car.position.x=roadLimit;

    if(car.position.x<-roadLimit)
        car.position.x=-roadLimit;

});

keys[e.key.toLowerCase()]=false;

});

// ======================
// BATAS JALAN
// ======================

const roadLimit=5.3;

// ======================
// SKOR
// ======================

let score=0;

let highScore=0;

let level=1;

let lives=3;

let miss=0;

// ======================
// UI
// ======================

const ui=document.createElement("div");

ui.style.position="absolute";
ui.style.top="15px";
ui.style.left="15px";
ui.style.color="white";
ui.style.fontSize="18px";
ui.style.fontWeight="bold";
ui.style.fontFamily="Arial";
ui.style.textShadow="2px 2px 5px black";

ui.style.background="rgba(0,0,0,0.45)";
ui.style.padding="10px";
ui.style.borderRadius="12px";
ui.style.border="2px solid white";
ui.style.minWidth="180px";
ui.style.lineHeight="1.6";

document.body.appendChild(ui);

// ======================
// MOBILE BUTTON
// ======================

if(isMobile){

const leftBtn=document.createElement("button");
const rightBtn=document.createElement("button");

leftBtn.innerHTML="◀";
rightBtn.innerHTML="▶";

[leftBtn,rightBtn].forEach(btn=>{

btn.style.position="absolute";
btn.style.bottom="30px";
btn.style.width="80px";
btn.style.height="80px";
btn.style.fontSize="35px";
btn.style.borderRadius="50%";
btn.style.border="none";
btn.style.background="rgba(0,0,0,0.5)";
btn.style.color="white";
btn.style.zIndex="1000";

});

leftBtn.style.left="30px";
rightBtn.style.right="30px";

document.body.appendChild(leftBtn);
document.body.appendChild(rightBtn);

leftBtn.style.display="none";
rightBtn.style.display="none";

// Tekan

leftBtn.addEventListener("touchstart",()=>{

keys["a"]=true;

});

leftBtn.addEventListener("touchend",()=>{

keys["a"]=false;

});

rightBtn.addEventListener("touchstart",()=>{

keys["d"]=true;

});

rightBtn.addEventListener("touchend",()=>{

keys["d"]=false;

});

}

// ======================
// START SCREEN
// ======================

let gameStarted = false;

let controlMode = "keyboard";

const startScreen = document.createElement("div");

startScreen.style.position = "absolute";
startScreen.style.top = "0";
startScreen.style.left = "0";
startScreen.style.width = "100%";
startScreen.style.height = "100%";
startScreen.style.background = "rgba(0,0,0,0.7)";
startScreen.style.display = "flex";
startScreen.style.flexDirection = "column";
startScreen.style.justifyContent = "center";
startScreen.style.alignItems = "center";
startScreen.style.color = "white";
startScreen.style.fontFamily = "Arial";
startScreen.innerHTML = `
<h1>⭐ STAR CATCHER ⭐</h1>

<p>Tangkap bintang sebanyak mungkin!</p>

<div id="mobileControl" style="display:none;">

<h3>Pilih Kontrol</h3>

<button id="btnControl">🔘 Tombol</button>

<button id="swipeControl">👆 Swipe</button>

</div>

<div id="desktopControl">

<p>A / D atau ← →</p>

<button id="startBtn">▶ Mulai Game</button>

</div>
`;

document.body.appendChild(startScreen);

const mobileMenu =
document.getElementById("mobileControl");

const desktopMenu =
document.getElementById("desktopControl");

if(isMobile){

    mobileMenu.style.display="block";

    desktopMenu.style.display="none";

}else{

    mobileMenu.style.display="none";

    desktopMenu.style.display="block";

}

const startBtn=document.getElementById("startBtn");

startBtn.style.padding="12px 25px";
startBtn.style.fontSize="20px";
startBtn.style.borderRadius="10px";
startBtn.style.border="none";
startBtn.style.cursor="pointer";
startBtn.style.background="#ffcc00";
startBtn.style.fontWeight="bold";

document.getElementById("startBtn").onclick = () => {

    document.getElementById("btnControl").onclick=()=>{

        controlMode="button";

        leftBtn.style.display="block";
        rightBtn.style.display="block";

        gameStarted=true;

        startScreen.style.display="none";

    };

    document.getElementById("swipeControl").onclick=()=>{

        controlMode="swipe";

        leftBtn.style.display="none";
        rightBtn.style.display="none";

        gameStarted=true;

        startScreen.style.display="none";

    };

    gameStarted = true;

    startScreen.style.display = "none";

};

// ======================
// GAME OVER
// ======================

const gameOver = document.createElement("div");

gameOver.style.position="absolute";
gameOver.style.top="0";
gameOver.style.left="0";
gameOver.style.width="100%";
gameOver.style.height="100%";
gameOver.style.display="none";
gameOver.style.background="rgba(0,0,0,0.75)";
gameOver.style.justifyContent="center";
gameOver.style.alignItems="center";
gameOver.style.flexDirection="column";
gameOver.style.color="white";
gameOver.style.fontFamily="Arial";

gameOver.innerHTML=`
<h1>💀 GAME OVER 💀</h1>
<h2 id="finalScore"></h2>
<button id="playAgain">🔄 Main Lagi</button>
`;

document.body.appendChild(gameOver);

document.getElementById("playAgain").onclick=()=>{

    location.reload();

};

function updateUI(){

    if(score > highScore){
        highScore = score;
    }

    ui.innerHTML = `
    <h2 style="margin:0 0 10px 0;">⭐ STAR CATCHER ⭐</h2>

    ⭐ Score : ${score}<br>
    🏆 High Score : ${highScore}<br>
    ❤️ Lives : ${lives}<br>
    ❌ Miss : ${miss}/5<br>
    🚀 Level : ${level}
    `;

}

updateUI();

// ======================
// BINTANG
// ======================

const stars=[];

const starGeometry=
new THREE.OctahedronGeometry(0.7);

const starMaterial=
new THREE.MeshStandardMaterial({

color:0xffd700,

emissive:0xffcc00,

emissiveIntensity:1.5

});

let starSpeed=0.08;

function spawnStar(){

    if(stars.length >= 3){
    return;
    }

    const star = new THREE.Mesh(
        starGeometry,
        starMaterial
    );

    star.castShadow = true;

    // Posisi acak di atas jalan
    const lanes = [-5,-2.5,0,2.5,5];

    star.position.set(

        lanes[Math.floor(Math.random()*lanes.length)],

        12,

        4

    );

    scene.add(star);

    stars.push(star);

}

setInterval(spawnStar, 1200);

// ======================
// COLLISION
// ======================

function checkCollision(a,b){

    return(

        Math.abs(a.position.x-b.position.x)<1.5 &&

        Math.abs(a.position.y-b.position.y)<1.2

    );

}

// ======================
// ANIMASI
// ======================

function animate(){

    requestAnimationFrame(animate);

    if(!gameStarted){

    renderer.render(scene,camera);

    return;

    }

    sun.rotation.y += 0.003;

    // ======================
    // JALAN BERGERAK
    // ======================

    for (const line of roadLines) {

    line.position.z += 0.45;

    if (line.position.z > 10) {

        line.position.z = -90;

    }

    }

    // ======================
    // POHON BERGERAK
    // ======================

    for (const tree of trees) {

    tree.position.z += 0.45;

    if (tree.position.z > 10) {

        tree.position.z = -110;

    }

    }

    // ======================
    // AWAN BERGERAK
    // ======================

    for (const cloud of clouds) {

    cloud.position.x += 0.01;

    if (cloud.position.x > 20) {

        cloud.position.x = -20;

    }

    }

    // Gerak mobil
    if(keys["arrowleft"] || keys["a"]){

        car.position.x -= 0.25;

        if(car.position.x < -roadLimit)
            car.position.x = -roadLimit;

        car.rotation.z = 0.18;

    }

    else if(keys["arrowright"] || keys["d"]){

        car.position.x += 0.25;

        if(car.position.x > roadLimit)
            car.position.x = roadLimit;

        car.rotation.z = -0.18;

    }

    else{

        car.rotation.z *= 0.85;

    }

        for(const wheel of wheels){

        wheel.rotation.x += 0.15;

    }

    // Gerak bintang
    for(let i = stars.length-1; i>=0; i--){

        const star = stars[i];

        star.position.y -= starSpeed;

        star.rotation.x += 0.08;
        star.rotation.y += 0.08;
        star.rotation.z += 0.05;

        if(checkCollision(car,star)){

            scene.remove(star);

            stars.splice(i,1);

            score++;

            if(score % 10 === 0){

            level++;

            console.log("LEVEL UP! Level " + level);

            starSpeed += 0.01;

            if(starSpeed > 0.35){
                starSpeed = 0.35;
            }

        }

            updateUI();

            continue;

        }

        if(star.position.y < 0.5){

            scene.remove(star);

            stars.splice(i,1);

            miss++;

            if(miss >= 5){

                miss = 0;

                lives--;

            }

            updateUI();

        }

    }

    if(lives <= 0){

        gameOver.style.display="flex";

        document.getElementById("finalScore").innerHTML=
        "Score : "+score;

        renderer.render(scene,camera);

        return;

    }

    // ======================
    // CAMERA FOLLOW
    // ======================

    camera.position.x += (car.position.x - camera.position.x) * 0.08;
    camera.lookAt(
    car.position.x,
    0,
    -20
    );
    
    renderer.render(scene,camera);

}

animate();

// Resize
window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});