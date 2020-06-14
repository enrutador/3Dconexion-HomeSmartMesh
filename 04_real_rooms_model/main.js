import * as three from "./three_app.js";

import * as mouse from "./three_mouse.js";

const interactive_meshes = {};
var rooms_light_state = {};
var rooms;



$.getJSON("rooms.json", function(json_data) {
	rooms = json_data;
	main_init();
});

function main_init(){

	three.init(on_load);

	window.addEventListener( 'mesh_mouse_enter', onMeshMouseEnter, false );
	window.addEventListener( 'mesh_mouse_exit', onMeshMouseExit, false );
	window.addEventListener( 'mesh_mouse_down', onMeshMouseDown, false );
	window.addEventListener( 'mesh_touch_start', onMeshTouchStart, false );
	//OSKAR
	//window.addEventListener( 'mousemove', onMouseMove, false );
}



function on_load(){
	mouse.init(three.getCamera());
	let interactive_meshes_names = rooms["MeshList"];
	let interactive_meshes_list = three.getObjects(interactive_meshes_names);
	mouse.SetMeshList(interactive_meshes_list);

	//convert list to map for more practicale usage in events
	interactive_meshes_list.forEach(mesh => interactive_meshes[mesh.name] = mesh);
	
	three.animate();
}

function onMeshMouseEnter(e){
	console.log(`Mesh Mouse Enter in ${e.detail.name}`);
	document.getElementById('viewer').style.cursor = "pointer";
	three.setBulbState(interactive_meshes[e.detail.name],"highlight",true);
	//updateMouseCoords(e, mouse);
	//updateMouseCoords(e, mouse);
	showTooltip(e);
}

function onMeshMouseExit(e){
	console.log(`Mesh Mouse Exit out of ${e.detail.name}`)
	document.getElementById('viewer').style.cursor = "default";
	three.setBulbState(interactive_meshes[e.detail.name],"highlight",false);
}

function swap_light_state(name){
	if(typeof rooms_light_state[name] == "undefined"){
		rooms_light_state[name] = true;
	}
	else{
		rooms_light_state[name] = ! rooms_light_state[name];
	}
	return rooms_light_state[name];
}

function onMeshMouseDown(e){
	console.log(`Mesh Mouse Down on ${e.detail.name}`);
	const switch_to_state = swap_light_state(e.detail.name);
	three.setBulbState(interactive_meshes[e.detail.name],"switch",switch_to_state);
	
	
}

function onMeshTouchStart(e){
	console.log(`Mesh Touch Start on ${e.detail.name}`)
	const switch_to_state = swap_light_state(e.detail.name);
	three.setBulbState(interactive_meshes[e.detail.name],"switch",switch_to_state);
}


//Following two functions will convert mouse coordinates
//from screen to three.js system (where [0,0] is in the middle of the screen)
//this will be 2D coordinates of the current mouse position, [0,0] is middle of the screen.
//var mouse = new THREE.Vector3();



function showTooltip(e) {
	console.log(`Evento recibido: ${e}`)	
    var divElement = $('tooltip');	
    console.log(`Evento recibido: ${e.detail.name}`)
    divElement.find('ObjectViewMouse').text(`${e.detail.name}`);

}




