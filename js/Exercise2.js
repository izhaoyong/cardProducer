"use strict";
console.log('exercise2');
let rightLabel = $("#rightLabel"), imageData,curImg = "aImage", modified = false;

$("div#Ex2wrapper>img").click(function(){
	let position = $(this).position();

	if ( curImg == this.id ) {
		return;
	}else{
		if( this.id == "aImage"){
			$(rightLabel).css("left",position.left / 0.7);
			$(rightLabel).css("top",position.top / 0.7);
		}else if( this.id == "bImage"){
			$(rightLabel).css("left",position.left / 0.7+ $(this).width() - 100 );
			$(rightLabel).css("top",position.top / 0.7);
		}else if( this.id == "cImage"){
			$(rightLabel).css("left",position.left / 0.7);
			$(rightLabel).css("top",position.top / 0.7 + $(this).height() - 30 );
		}else{
			$(rightLabel).css("left",position.left / 0.7 + $(this).width() -100 );
		 	$(rightLabel).css("top",position.top / 0.7 + $(this).height() - 30 );
		}
		curImg = this.id;
		modified = true;
	    setSaveButton();
	}
});

$('div#Ex2wrapper>img').on('dragover',function (event) {
	event.preventDefault();
});

$('div#Ex2wrapper>img').on('drop',function (event) {
    event.preventDefault();
    event.stopPropagation();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $(event.target).prop('src',src);

    modified = true;
    setSaveButton();
    console.log(event.target);
});

$('#questionInput').on('keydown',function(){
	modified = true;
    setSaveButton();
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
    let blob = dataURLtoBlob( imageData );

    $.ajax({
        url: "/inc/source.php?style=11",
        method: "POST",
        contentType:'application/octet-stream',
        processData:false,
        data: blob,
    }).done( function( data ){
        $.ajax({
            url: "/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+TemplateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
            method: "POST",
            processData:false,
            contentType:'text/xml',
            data: prepareXML( data.responseText + "" ),
        }).done(function(data){
            $('#namecheck').css('display','none');
            return2Template();
        });
    });
}

function prepareXML( picPath ){
    let div = $('<div>');
    let exercise2 = $('<exercise2>',{
        question:$('#questionInput').prop('value'),
        mp3:$('#playButton>audio').attr('src'),
        wav:$('#playButton>audio').attr('src').replace(/mp3/g,'wav'),
        snapshot: picPath,
    }).appendTo(div);


    $('<A>',{
    	img:$('#aImage').attr('src'),
    	corrent: $('#aImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise2);

    $('<B>',{
    	img:$('#bImage').attr('src'),
    	corrent: $('#bImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise2);

    $('<C>',{
    	img:$('#cImage').attr('src'),
    	corrent: $('#cImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise2);

    $('<D>',{
    	img:$('#dImage').attr('src'),
    	corrent: $('#dImage').prop('id') == curImg ? "true" : "false"
    }).appendTo(exercise2);

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
    html2canvas( $('#Ex2wrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});