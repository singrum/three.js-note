

let camera, scene, renderer;

function init(){
    window.addEventListener("resize", onResize, false);
    function onResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //scene의 구성요소 : camera, lights, objects
    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 40;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //object(axes)
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);



    
    //vertices
    let geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    let vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -3.0,  1.0,
        1.0,  1.0,  1.0,
    ] );
    

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let mesh = new THREE.Mesh( geometry, material );

    scene.add(mesh)







    //gui 생성
    let controls = new function(){
        this.x = 1;
        this.y = 1
        this.z = 1

    }
    let gui = new dat.GUI();
    gui.add(controls, "x", 0, 5);
    gui.add(controls, "y", 0, 5);
    gui.add(controls, "z", 0, 5);

    function renderScene(){
        vertices = new Float32Array( [
            controls.x, controls.y, controls.z,
            1.0, -3.0,  1.0,
            1.0,  1.0,  1.0,
        ] );
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        mesh = new THREE.Mesh( geometry, material );
        scene.add(mesh);
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