'use strict';
let mouseX;
let mouseY;
let preX;
let preY;
let pickMode = '';
let dimension ;
$('button.xButton').click(function(event){
	$('#mask').css('display','none');
	$('#imageUploadPanel').css('visibility','hidden');
});

$('input.uploadImg').change(function( event ){
	uploadPicture();
	if ('content' in document.createElement('template')) {
	}
	$('#mask').css('display','block');
	$('#imageUploadPanel').css('visibility','visible');
});

function uploadPicture(){
	setImageMetaData();
	let previewContainer = $('div.previewContainer');
	$(previewContainer).empty();
	let len = event.target.files.length;
	for (let i = 0; i < len; i++) {
		let reader = new FileReader();
		reader.onload = function(e){
			dimension = {width:230, height:172.5};
			let template = $('#UploadItem');
			if ( !image_4_3 ) {
				template = $('#UploadItem2');
				dimension.width = 161 ;
				dimension.height = 209 ;
			}

			if ( image_no_cut ) {
				template = $('#UploadItemNoCut');
				dimension.width = 230 ;
				dimension.height = 209 ;
			}
			appendTemplateToScroller( e, template , previewContainer);
		
		};
		reader.readAsDataURL(event.target.files[i]);
	}
}

function setImageMetaData(){
	if ( templateName == 'ImageCardCommon'  || templateName == 'DialogCard') {
		image_4_3 = false;		
	}else{
		image_4_3 = true;
	}

	if ( templateName == 'BqCard') {
		image_no_cut = true;
	}else{
		image_no_cut = false;
	}	
}

$('button#uploadButton').click( function( e ){
	console.log( "hello world" );
	let previewContainer = $('div.previewContainer');
	let len = $(previewContainer).children().length;
	for (let i = 0; i < len; i++) {
		let div = $( $(previewContainer).children()[i] ).children()[0];
		UploadImage2Server(div);
	}
});

function UploadImage2Server(div){
	let imageData;
	html2canvas( div, {
		onrendered: function(canvas) {
			imageData = canvas.toDataURL("image/png");
			let tagInfo = $('textarea.tagInput').prop('value');
			let userID = "";
			let blob = dataURLtoBlob( imageData );
			$.ajax({
				url: encodeURI('../inc/source.php?width=100&height=75&style=3&ResourceTypeID=1&userID=' + userID + '&Tags=' + tagInfo),
				processData:false,
				contentType:'application/octet-stream',
				method: "POST",
				data: blob,
			}).done( function( data ){
	            $('#imageUploadPanel').css('visibility','hidden');
				getMoreMyPic();
	            return2Template();
				console.log("done");
			});
		}
	});
}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}