var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight*9/10;

function init() {
    scene = new THREE.Scene();
    initPlane();
    initCamera();
    initRenderer();
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 8, -3);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initPlane() {
	var geometry = new THREE.PlaneGeometry( 10, 10 );
	geometry.rotateX( -Math.PI / 2 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0.01, 0) );
	var material = new THREE.MeshBasicMaterial( { color: 0xC7C7C7 } );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
}

function addStamm() {
        var geometry = new THREE.CylinderGeometry( 0.05, 0.05, 0.5, 32 );
        var brown = new THREE.Color();
		var lightness = (Math.random() * 0.5) + 0.1;
        brown.setHSL(0.1, 1, lightness);
        var material = new THREE.MeshBasicMaterial();
        material.color = brown;
        var cylinder = new THREE.Mesh( geometry, material );
        
        cylinder.matrixAutoUpdate = false;
        
        cylinder.updateMatrix();
        
        //cylinder.rotateX((Math.random() * 6.28) + 0); //Falls "aufgerichtete" Positionierungen der Holzscheite gewünscht ist hier das erste // entfernen
        cylinder.rotateY((Math.random() * 6.28) + 0);
        cylinder.rotateZ(1.5708);
        
        cylinder.updateMatrix();
        
        var x = (Math.random() * 10)-5;
        var y = 0;
        var z = (Math.random() * 10)-5;
        cylinder.applyMatrix( new THREE.Matrix4().makeTranslation(x, y, z));
        
        cylinder.updateMatrix();
        
        console.log("Log created - Pos:"+x+"/"+y+"/"+z + " lightness: "+lightness);
        scene.add( cylinder );
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

		 
document.body.onkeydown = function(e){
			if(e.keyCode == 32){
				addStamm();
			}
}

init();
render();