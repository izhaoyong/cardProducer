'use strict';
console.log('workarea');
let modified = false;
let isSavedButton = false;

$("#plusButton").mouseenter(function(){
	$(this).css("background-image","url('assets/buttons/back_over.png')");
});

$("#plusButton").mouseleave(function(){
	$(this).css("background-image","url('assets/buttons/back.png')");
});

$("#reloadButton").mouseenter(function(){
	$(this).css("background-image","url('assets/buttons/reload_over.png')");
});

$("#reloadButton").mouseleave(function(){
	$(this).css("background-image","url('assets/buttons/reload.png')");
});

$("#helpButton").mouseenter(function(){
	$(this).css("background-image","url('assets/buttons/help_over.png')");
});

$("#helpButton").mouseleave(function(){
	$(this).css("background-image","url('assets/buttons/help.png')");
});

$("#plusButton").click(function() {
	if ( modified ) {
		$('#namecheck').css('right','170px');
		$('#namecheck').css('top','80px');
		$('#namecheck').css('display','block');
		isSavedButton = false;
	}else {
		return2Template();
	}
});

function return2Template(){
	$('#tipChooseLabel').css('visibility',"visible");
	$('#mask').css("display","block");
	$("#chooseArea").css("display","block");
	$('#loadingLabel').addClass('hidden');
	$('#saveButton').css('background-image',"url('assets/buttons/save_disabled.png')");	
	modified = false;
	item2show();	
}

$('#reloadButton').click(function(){
	$.ajax({
	  url: cardName,
	}).done(function( data){
		$("#templateContainer").html(data);
		$.getScript( jsName ).done(function( script, textStatus ){
			$('#jsPTR').html(script);
		});
	});

	$('#saveButton').css('background-image',"url('assets/buttons/save_disabled.png')");
	modified = false;
});

function setSaveButton(){
	$('#saveButton').css('background-image',"url('assets/buttons/save.png')");	
}

$("#saveButton").mouseenter(function(){
	if( modified ){
		$(this).css("background-image","url('assets/buttons/save_over.png')");
	}
});

$("#saveButton").mouseleave(function(){
	if( modified ) {
		$(this).css("background-image","url('assets/buttons/save.png')");
	}
});

$('#saveButton').click(function( event ){
	$('#namecheck').css('right','170px');
	$('#namecheck').css('top','80px');
	$('#namecheck').css('display','block');
	isSavedButton = true;
});

$('#Cancel').click(function(event){
	if ( isSavedButton ){
		$('#namecheck').css('display','none');
		return ;
	}else{
		$('#namecheck').css('display','none');
		return2Template();		
	}
});