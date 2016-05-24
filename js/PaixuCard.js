'use strict';
let	answer = "", picPath, words, isSentence = false,
	doc, imageData, category = "";

console.log('hello wrold');

function buildRandomSequence(low, high){
	let x = 0, tmp = 0;
	if( low > high){
		tmp = low;
		low = high;
		high = tmp;
	}

	let array = [];
	for (let i = low; i <= high; i++) {
		array.push( i );
	}

	for (let i = array.length - 1; i > 0; i--) {
		x = parseInt(Math.random() * i);
		tmp = array[i];
		array[i] = array[x];
		array[x] = tmp;
	}

	return array;
}

$('.generate').click(function(event) {
	let str = $.trim( $('.input').prop('value') );
	let re = /\n+/;
	words = str.split( re );
	let len = words.length;
	if( len == 1 ){
		re = /\s+/;
		words = str.split( re );
		isSentence = true ; 
	}

	len = words.length;
	for(let i=0; i<len; i++){
		answer += words[i] + ",#@";
	}

	let needArray = buildRandomSequence(0, len - 1);
	createSequence( needArray, words, len);
});

function createSequence( needArray, words, len){
	$('.sequence').empty();
	for (let i = 0; i < len; i++) {
		let ele = $('<button>');
		$(ele).addClass("button");
		// $(ele).html( words[needArray[i]] );
		$(ele).html( words[i] );
		$('.sequence').append( ele );
	}

	html2canvas( $('.sequence'), {
		onrendered: function(canvas) {
			imageData = canvas.toDataURL("image/png");
		}
	});
}

jQuery.each(jQuery('textarea[data-autoresize]'), function() {
    let offset = this.offsetHeight - this.clientHeight;
    // let width = this.offsetWidth - this.clientWidth;
 
    let resizeTextarea = function(el) {
        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        // jQuery(el).css('width', 'auto').css('width', el.scrollWidth + width);
    };

    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
});

$('#savePic').click( function(){
	let nameCheck = $("#namecheck");
	$(nameCheck).css('zIndex', 99 );
	$(namecheck).css("top", "100px");
	$(namecheck).css("display", "block");
});

function upload(){
	let cardNameValue = $("#cardsnametext").prop('value');
	let tagTxt = $("#tagstext").prop('value');
	let category1 = $("#Category1").prop('value');
	let ex = $("#EX").prop('value');
	let cardsid = $('#cardsid').prop('value');
	let saveStyle = 4;
	let templateID = 2;
	let userID = "temp222.28.84.1520160501232437279304";

	let blob = dataURLtoBlob( imageData );	
	$.ajax({
		url: "/inc/source.php?style=11",
		method: "POST",
		data: blob,
		processData:false,
		contentType:'application/octet-stream',
	}).done( function( data ){
		picPath = data.responseText + "";
		doc = document.implementation.createDocument(null, "paixuCard", null);
		doc.documentElement.setAttribute("snapshot", picPath);
		let segments = doc.createElement("segments");
		for (let i = 0; i < words.length; i++) {
			let segment = doc.createElement("segment");
			let data = doc.createTextNode(words[i]);
			segment.appendChild(data);
			segments.appendChild(segment);
		}
		doc.documentElement.appendChild( segments );
		var str = (new XMLSerializer()).serializeToString(doc);
		str = str.replace(/xmlns(\S+)/g,"");

		$.ajax({
			url: "/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+templateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
			method:"POST",
			data: str,
			processData:false,
			contentType:"text/xml",
		}).done(function (data) {
			$('#namecheck').css('display','none');
		});
	});
}

$('#OK').click( function( event ){
	upload();
});

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

$('input[type="radio"]').click(function(){
	category = $(this).prop('value');
});