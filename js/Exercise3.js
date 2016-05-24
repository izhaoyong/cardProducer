"use strict";
console.log('exercise3');
let rightLabel = $("#rightLabel");
let curImg = "aImage";
if (modified || !modified) {
}else{
    let modified = false;
}

$("div#Ex3wrapper>img").click(function(){
	let position = $(this).position();

	if(this.id == curImg){

	}else{
		if( this.id == "aImage"){
			$(rightLabel).css("top", 168 );
		}else if( this.id == "bImage"){
			$(rightLabel).css("top",  548 );
		}
		curImg = this.id;
		modified = true;
	    setSaveButton();		
	}
});

$('#questionInput').on('keydown',function(){
	modified = true;
    setSaveButton();
});


$('div#Ex3wrapper>img').on('dragover',function (event) {
	event.preventDefault();
});

$('div#Ex3wrapper>img').on('drop',function (event) {
    event.preventDefault();
    event.stopPropagation();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $(event.target).prop('src',src);

    modified = true;
    setSaveButton();
    console.log(event.target);
});

$('#playButton').on('dragover',function(event){
    event.preventDefault();
});

$('#playButton').on('drop',function(event){
    event.preventDefault();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $(this).children()[0].src = src;

    modified = true;
    setSaveButton();
});

$('#playButton').click(function(event){
    $(this).children()[0].play();
});

function uploadXML(){
    let cardNameValue = $("#cardsnametext").prop('value');
    let tagTxt = $("#tagstext").prop('value');
    let category1 = $("#Category1").prop('value');
    let ex = $("#EX").prop('value');
    let cardsid = $('#cardsid').prop('value');
    let saveStyle= 4;
    let TemplateID = 2;
    let userID = "temp222.28.84.1520160501232437279304";
    let blob = null;

    html2canvas( $('#Ex3wrapper'), {
        onrendered: function(canvas) {
            let imageData = canvas.toDataURL("image/png");
            blob = dataURLtoBlob( imageData );
        }
    });

    $.ajax({
        url: "/inc/source.php?style=11",
        method: "POST",
        contentType:'application/octet-stream',
        processData:false,
        data: blob,
    }).done( function( data ){
        $.ajax({
            url: "/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+templateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
            method: "POST",
            contentType:'text/xml',
            processData:false,
            data: prepareXML( data.responseText + "" ),
        }).done(function(data){
            $('#namecheck').css('display','none');
            return2Template();
        });
    });
}

function prepareXML( picPath ){
    let div = $('<div>');
    let exercise3 = $('<exercise3>',{
    	question: $('#questionInput').prop('value'),
    	mp3: $('#playButton>audio').attr(src),
    	wav: $('#playButton>audio').attr(src).replace("mp3","wav"),
        img: $('#backgroundImage').attr('src'),
        snapshot: picPath,
    }).appendTo(div);


    $('<A>',{
    	img:$('#aImage').attr('src'),
    	corrent: $('#aImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise3);

    $('<B>',{
    	img:$('#bImage').attr('src'),
    	corrent: $('#bImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise3);

    return $(div).html();
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

$('#OK').click( function( event ){
    uploadXML();
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});