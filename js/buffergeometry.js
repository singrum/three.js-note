// https://r105.threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html

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
    spotLight.position.set(80, 60, 40);
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

        -1.0, -1.0,  1.0,
        1.0, -3.0,  1.0,
        1.0,  1.0,  1.0,


        -1.0, -1.0,  1.0,
        1.0, -3.0,  1.0,
        1.0,  1.0,  1.0,

        -1.0, -1.0,  1.0,
        1.0, -3.0,  1.0,
        1.0,  1.0,  1.0,
    ] );
    

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals()
    let material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    let mesh = new THREE.Mesh( geometry, material );


    // let box = new THREE.Mesh(
    //     new THREE.BoxGeometry(4,4,4),
    //     new THREE.MeshLambertMaterial({color : 0xdddddd})
    // )
    // box.position.x = 0;
    // box.position.y = 2;
    // box.position.z = 0;
    // box.castShadow = true;
    // scene.add(box)






    //gui 생성
    let controls = new function(){
        this.x1 = 1; this.y1 = 0; this.z1 = 1;
        this.x2 = 0; this.y2 = 1; this.z2 = 1;
        this.x3 = 0; this.y3 = 1; this.z3 = 0;
        this.x4 = 0; this.y4 = 1; this.z4 = 0;

    }
    let gui = new dat.GUI();
    gui.add(controls, "x1", 0, 15); gui.add(controls, "y1", 0, 15); gui.add(controls, "z1", 0, 15);
    gui.add(controls, "x2", 0, 15); gui.add(controls, "y2", 0, 15); gui.add(controls, "z2", 0, 15);
    gui.add(controls, "x3", 0, 15); gui.add(controls, "y3", 0, 15); gui.add(controls, "z3", 0, 15);
    gui.add(controls, "x4", 0, 15); gui.add(controls, "y4", 0, 15); gui.add(controls, "z4", 0, 15);
    let i = 0.01;
    function renderScene(){
        
        vertices = new Float32Array([
            controls.x1, controls.y1, controls.z1,
            controls.x2, controls.y2, controls.z2,
            controls.x3, controls.y3, controls.z3,
            controls.x4, controls.y4, controls.z4,
  
        ])
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.computeVertexNormals()
    
        scene.add(mesh)

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }


    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    renderScene();
            
}


window.onload = init;