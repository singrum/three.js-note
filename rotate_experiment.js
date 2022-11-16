
let scene, camera, renderer;




function init(){

    //scene의 구성요소 : camera, lights, objects
    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //ligths
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 10, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //fixed axes
    let axes_f = new THREE.AxesHelper(20);
    axes_f.setColors("black","black","black");
    scene.add(axes_f);

    //rotated axes
    let axes_r = new THREE.AxesHelper(20);
    axes_r.setColors("red","red","red");
    scene.add(axes_r);

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
        this.var1 = 0;
        this.var2 = 0;
        this.var3 = 0;
    }
    let gui = new dat.GUI();
    gui.add(controls, "var1", -2 * Math.PI, 2 * Math.PI);
    gui.add(controls, "var2", -2 * Math.PI, 2 * Math.PI);
    gui.add(controls, "var3", -2 * Math.PI, 2 * Math.PI);

    function renderScene(){
        box.rotation.set(controls.var1,controls.var2,controls.var3)
        axes_r.rotation.set(controls.var1, controls.var2, controls.var3);
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