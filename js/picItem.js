'use strict';
$('.TileGroup>img').on('dragstart',function(event){
	event.originalEvent.dataTransfer.setDragImage(picDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',this.src);
});