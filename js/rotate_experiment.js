let scene, camera, renderer;




function init(){

    //scene의 구성요소 : camera, lights, objects
    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 10, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //object(axes)
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //object(box)
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(3,5,7),
        new THREE.MeshLambertMaterial({color : 0xdddddd})
    )
    box.position.x = 2;
    box.position.y = 2;
    box.position.z = 2;
    box.castShadow = true;
    scene.add(box)

    //gui 생성
    let controls = new function(){
        this.Eulerian1 = 0;
        this.Eulerian2 = 0;
        this.Eulerian3 = 0;
    }
    let gui = new dat.GUI();
    gui.add(controls, "Eulerian1", 0, 2 * Math.PI);
    gui.add(controls, "Eulerian2", 0, 2 * Math.PI);
    gui.add(controls, "Eulerian3", 0, 2 * Math.PI);

    function renderScene(){
        box.rotation.y = controls.Eulerian2;
        box.rotation.x = controls.Eulerian1;
        
        // box.rotation.x = controls.Eulerian3;
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene()
}


window.onload = init;