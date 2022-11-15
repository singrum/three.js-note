

let camera, scene, renderer;


//GUI생성
let controls = new function(){
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
}
let gui = new dat.GUI();
gui.add(controls, "rotationSpeed", 0, 0.5);
gui.add(controls, "bouncingSpeed", 0, 0.5);


function setting(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
}


function init(){
    //화면 리사이즈 맞춤
    window.addEventListener("resize", onResize, false);
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    //회전 애니메이션
    let i =0;
    function renderScene_rotate(){
        
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        requestAnimationFrame(renderScene_rotate);
        renderer.render(scene, camera);
    }
    //바운스 애니메이션
    function renderScene_bounce(){
        i += 0.4;
        cube.position.x = 20 + (10 * (Math.cos(i)));
        cube.position.y = 2 + (10 * Math.abs(Math.sin(i)));
        requestAnimationFrame(renderScene_bounce);
        renderer.render(scene, camera);
    }
    function renderScene_both(){
        
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
        i += controls.bouncingSpeed;
        cube.position.x = 20 + (10 * (Math.cos(i)));
        cube.position.y = 2 + (10 * Math.abs(Math.sin(i)));
        requestAnimationFrame(renderScene_both);
        renderer.render(scene, camera);
    }

    setting();

    let planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4,4,4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    cube.position.x = -6;
    cube.position.y = 6;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube)

    camera.position.x = -40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);

        
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.body.appendChild(renderer.domElement);
    renderScene_both();
}
window.onload = init;