'use strict';

let isPlaying = 0;
let duration = 0;
let audio = null;
let progress = null;
$('.audio').mouseenter(function(){
	$($(this).children()[0]).addClass('blur');
	$($(this).children()[2]).addClass('show');
	audio = $($(this).children()[1])[0];
});

$('.audio').mouseleave(function(){
	$($(this).children()[0]).removeClass('blur');
	$($(this).children()[2]).removeClass('show');

	isPlaying = 0;
	audio.pause();
});

$('.playButton').click(function(event){
	progress = $(this).next();
	if ( isPlaying ) {
		isPlaying = 0;
		audio.pause();
		$(this).css('background-image',"url('assets/mainIcon/pause32.png')");
	}else{
		audio.play();
		isPlaying = 1;
		$(this).css('background-image',"url('assets/mainIcon/play32.png')");
	}

	$($(this).next()).addClass("show");			
});

$('.audio>audio').on('timeupdate',function(){
	$(progress).attr('value',this.currentTime);
	console.log( progress.value );
});

// $('.audio>').on('dragstart',function(event){
// 	console.log(event.target);
// });

$('.audio>audio').on('loadeddata',function(){
	duration = $(this).prop("duration");
	$($(this).next().next()).prop('max',duration);
});

$('.audio>audio').on('ended',function(){
	$($(this).next()).css('background-image',"url('assets/mainIcon/pause32.png')");
	isPlaying = 0;
});

$('.audio>label').on('dragstart',function(event){
	event.preventDefault();

	event.originalEvent.dataTransfer.setDragImage(audioDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',this.title);
	console.log("lable");
});

$('.audio>button').on('dragstart',function(event){
	event.originalEvent.dataTransfer.setDragImage(audioDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',this.value);
	console.log("button");
});

// $('#playButton').on('dragover',function(event){
// 	event.preventDefault();
// });

// $('#playButton').on('drop',function(event){
// 	event.preventDefault();

// 	let src = event.originalEvent.dataTransfer.getData('text/plain');
// 	$(this).children()[0].src = src;
// });

// $('#playButton').click(function(event){
// 	$(this).children()[0].play();
// });