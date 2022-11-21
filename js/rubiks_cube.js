let camera, scene, renderer, controls;
window.addEventListener("resize", onResize, false);
function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(-40,30,30);
    camera.lookAt(scene.position);


    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);




    let blocks = new Array();
    const blockLen = 2;
    const geom = new THREE.BoxGeometry(blockLen, blockLen, blockLen).toNonIndexed();
    const mater = new THREE.MeshLambertMaterial({vertexColors: true});
    
    const positionAttribute = geom.getAttribute('position');
    const colors = [];
    const color6 = [new THREE.Color(0xff0000), new THREE.Color(0xff8000),new THREE.Color(0xffff00),new THREE.Color(0x00ff00),new THREE.Color(0x0000ff),new THREE.Color(0xffffff)]

    console.log(positionAttribute)
    for ( let i = 0; i < 6; i ++ ) {
        console.log(color6[i])
        for(let j=0;j<6;j++){
            colors.push( color6[i].r, color6[i].g, color6[i].b );
        }
        
    }
    geom.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    
    for(let i = 0; i<27; i++){
        let block = new THREE.Mesh(geom, mater);
        block.matrixAutoUpdate = false;
        blocks.push(block)
    }
    blocks.forEach((block)=>{scene.add(block);});
    let cnt = 0;
    console.log(blocks)

    for(let i = -1;i<=1;i++){
        for(let j=-1;j<=1;j++){
            for(let k=-1;k<=1;k++){
                blocks[cnt].matrix.makeTranslation((blockLen+0.1) * i, (blockLen + 0.1) * j, (blockLen + 0.1) * k);
                cnt++;
            }
        }
    }
        
    // define the new attribute
        


    function renderScene(){

        controls.update();

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }


    //renderer
    renderer = new THREE.WebGLRenderer();


    
    //controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene();
}
window.onload = init;