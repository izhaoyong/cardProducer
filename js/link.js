'use strict';
let index = 0;
let preX = 0;
let preY = 0;
let curX = 0;
let curY = 0;

function handleScaleYU(){
    let bottom = $(cornerWrapper ).height() + $( cornerWrapper ).position().top;
    let top = event.pageY - linkWrapperPosition.top - 20 ;

    $( cornerWrapper ).css({'top': top , 'height': bottom - top });
}

function handleScaleYD(){
	let top = $( cornerWrapper ).position().top ;
	let height = event.pageY - top - linkWrapperPosition.top;

    $( cornerWrapper ).css({'height':  height});
}

function handleScaleXL(){
    let right = $( cornerWrapper ).width() + $( cornerWrapper ).position().left;
    let left = event.pageX - linkWrapperPosition.left ;

    $( cornerWrapper ).css({'left': left, 'width': right - left});
}

function handleScaleXR(){
	let left = $( cornerWrapper ).position().left ;
	let width = event.pageX - left - linkWrapperPosition.left;

    $( cornerWrapper ).css({'width':  width});
}

$("button[class*='corner']").mousedown(function(event){
    event.stopPropagation();
	console.log("down");
	cornerDown( event );
});

function cornerDown( event ){
    event.preventDefault();
    event.stopPropagation();
    preX = event.pageX;
    preY = event.pageY;
    curObject = event.target;

    $(curObject).on("mousemove",cornerMove);
    $(curObject).on("mouseup",cornerUp);
}

function cornerMove(event){
	console.log("move");

    event.preventDefault();
    event.stopPropagation();

    curX = event.pageX;
    curY = event.pageY;
    let gapX = curX - preX;
    let gapY = curY - preY;

    if ( curObject!= null && curObject.name.match("left") ) {
        if ( $(curObject).parent().width() == 0 && gapX > 0 ) {
        	if (curObject.name == "top left") {
        		curObject = $("div button[name='top right']")[0];
        	}else if ( curObject.name == "bottom left"){
				curObject = $("div button[name='bottom right']")[0];
        	}else{
            	curObject = $("div button[name='right']")[0];
        	}
            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
        }else{
        	handleScaleXL(  );
        }
    }
    
    if( curObject!= null && curObject.name.match( "right" ) ){
        if ( $(curObject).parent().width() == 0 && gapX < 0) {
        	if (curObject.name == "top right") {
        		curObject = $("div button[name='top left']")[0];
        	}else if ( curObject.name == "bottom right"){
				curObject = $("div button[name='bottom left']")[0];
        	}else{
            	curObject = $("div button[name='left']")[0];
        	}

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",	1);
        }else{
        	handleScaleXR( );
        }

    }

    if( curObject!= null && curObject.name.match("top")) {
        if ( $(curObject).parent().height() == 0 && gapY > 0) {
        	if (curObject.name == "top left") {
        		curObject = $("div button[name='bottom left']")[0];
        	}else if ( curObject.name == "top right"){
				curObject = $("div button[name='bottom right']")[0];
        	}else{
            	curObject = $("div button[name='bottom']")[0];                		
        	}

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
        }else{
        	handleScaleYU();                	
        }
    }

    if( curObject!= null && curObject.name.match("bottom") ){
        if ( $(curObject).parent().height() == 0 && gapY < 0) {
        	if (curObject.name == "bottom left") {
        		curObject = $("div button[name='top left']")[0];
        	}else if ( curObject.name == "bottom right"){
				curObject = $("div button[name='top right']")[0];
        	}else{
            	curObject = $("div button[name='top']")[0];                		
        	}

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
        }else{
        	handleScaleYD();
        }
    }

    preX = curX;
    preY = curY;
}

function cornerLeave(event){
    $(curObject).off("mousemove");
    $(curObject).off("mouseleave");
    $(curObject).off("mouseup");
}

function cornerUp(event){
    cornerLeave(event);
    curObject = null;
}