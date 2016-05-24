"use strict";
console.log('exercise2');
let check = "aRadioButton", imageData, modified = false;

function label2Hidden(){
	$(".selGroup>label").each(function(event){
		$(this).css("visibility","hidden");
	});	
}

$(".selGroup>input[type='radio']").click(function (event) {
	label2Hidden();
	let label = $(this).next();
	$(label).css("visibility","visible");
});

$('#picWrapper').on('dragover',function (event) {
	event.preventDefault();
});

$('#picWrapper').on('drop',function (event) {
    event.preventDefault();
    event.stopPropagation();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $('#backgroundImage').prop('src',src);

    modified = true;
    setSaveButton();
    console.log(event.target);
});

$(".selGroup>input[type='radio']").click(function(event){
	if (check == this.id) {
		console.log('equal');
	}else{
		check = this.id;
		modified = true;
	    setSaveButton();
	}
});

$(".selGroup>input[type='text']").on('keydown',function(){
	modified = true;
	setSaveButton();
});

$('div#picWrapper>img').on('dragover',function (event) {
	event.preventDefault();
});

$('div#picWrapper>img').on('drop',function (event) {
    event.preventDefault();
    event.stopPropagation();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $(event.target).prop('src',src);

    modified = true;
    setSaveButton();
    console.log(event.target);
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
        processData:false,
        contentType:'application/octet-stream',
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
    let exercise1 = $('<exercise1>',{
        img: $('#backgroundImage').attr('src'),
        snapshot: picPath,
    }).appendTo(div);


    $('<A>',{
		corrent: $("#aRadioButton").prop("checked"),
		html:$("#aInput").prop("value"),
    }).appendTo(exercise1);

    $('<B>',{
		corrent: $("#bRadioButton").prop("checked"),
		html:$("#bInput").prop("value"),
    }).appendTo(exercise1);

    $('<C>',{
		corrent: $("#cRadioButton").prop("checked"),
		html:$("#cInput").prop("value"),
    }).appendTo(exercise1);

    $('<D>',{
		corrent: $("#dRadioButton").prop("checked"),
		html:$("#dInput").prop("value"),
    }).appendTo(exercise1);

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
    html2canvas( $('#Ex1wrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});