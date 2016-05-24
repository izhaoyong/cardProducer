'use strict';
let fileItems = [], fileNames = [], formDataArr=[], tagInfo;
let mediaUploadPanel = $('#mediaUploadPanel');
$('button.mediaXButton').click(function(event){
	$('#mask').css('display','none');
	$(mediaUploadPanel).css('visibility','hidden');
});

$('input.uploadAudio').change(function( event ){
	$($( $(mediaUploadPanel).children()[0] ).children()[1]).css('visibility','hidden');
	$($(mediaUploadPanel).children()[2]).css('visibility','hidden');
	$($( $(mediaUploadPanel).children()[5] ).children()[1]).css('visibility','hidden');

	uploadMeida(event);
	if ('content' in document.createElement('template')) {
	}
	$('#mask').css('display','block');
	$(mediaUploadPanel).css('visibility','visible');
});

$('input.uploadVideo').change(function( event ){
	$($( $(mediaUploadPanel).children()[0] ).children()[0]).css('visibility','hidden');
	$($(mediaUploadPanel).children()[1]).css('visibility','hidden');
	$($( $(mediaUploadPanel).children()[5] ).children()[0]).css('visibility','hidden');

	uploadMeida(event);
	if ('content' in document.createElement('template')) {
	}
	$('#mask').css('display','block');
	$(mediaUploadPanel).css('visibility','visible');
});

function uploadMeida(event){
	let previewMediaContainer = $('div.previewMediaContainer');
	$(previewMediaContainer).empty();
	fileNames = [];
	fileItems = [];
	formDataArr = [];
	let len = event.target.files.length;
	for (let i = 0; i < len; i++) {
		let template = $('#mediaFileUploadItem');
		let content = $($($(template)[0].content).children()[0]).clone();
		let textarea = $(content).children()[3];
		let name = $(content).children()[1];
		let size = $(content).children()[2];
		let img = $(content).children()[0];
		if ( mediaType == "audio") {
			$(img).prop('src','assets/buttons/sound.png');
		}
		$(name).html( event.target.files[i].name);
		fileNames.push(event.target.files[i].name);
		let shortSize = byteFormat(event.target.files[i].size);
		$(size).html( shortSize );

		$(textarea).focus( function(e){
			e.target.value = "";
		});

		$(textarea).change( function(e){
			tagInfo = e.target.value;
			console.log(e.target.value);
		});

		$(previewMediaContainer).append($(content).clone(true));

		let formData = new FormData();
		formData.append('Filedata', event.target.files[i]);
		formDataArr.push(formData);
	}
}

function byteFormat(bytes){
	let ks = bytes / 1024 ;
	let ms = ks / 1024;
	let gs = ms / 1024;
	
	if( gs > 1){
		return gs.toFixed(2) + ' GB';
	}else if(ms > 1){
		return ms.toFixed(2) + ' MB';
	}else if(ks > 1){
		return ks.toFixed(2) + ' KB';
	}else{
		return bytes + '字节';
	}
}

function upload2Server(index, len){
	let userID = "";
	let type = 2;
	if (mediaType != "audio") {
		type = 3;
	}
	$.ajax({
		url: encodeURI('../inc/source.php?style=3&ResourceTypeID=' + type + '&ResourceName=' + fileNames[index] + '&Tags=' + tagInfo + '&userID=' + userID),
		cache: false,
		processData:false,
		contentType:false,
		method: "POST",
		data: formDataArr[index],
		dataType:'text',
	}).done( function( data ){
        if (index == len - 1) {
        	$('#mediaUploadPanel').css('visibility','hidden');
	        return2Template();
	        if (mediaType == 'audio') {
	        	getMoreMyAudio();	
	        }else{
	        	getMoreMyVideo();
	        }        	
        }else{
        	console.log(data.responseText);
        }
	});
}

$('button.mediaUploadButton').click( function( e ){
	let len = formDataArr.length;
	for (let i = 0; i < len; i++) {
		upload2Server(i, len);
	}
});