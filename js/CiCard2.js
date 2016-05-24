'use strict';
// let modified = false;
let imageData ;
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

$('#explainRT').on('keydown',function( event ){
    modified = true;
    setSaveButton();
    console.log('log');
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
    let ciCard = $('<ciCard2>',{
        img: $('#backgroundImage').attr('src'),
        mp3: $('#playButton>audio').attr('src'),
        wav: $('#playButton>audio').attr('src').replace(/mp3/g,'wav'),
        snapshot: picPath,
    }).appendTo(div);

    $('<description>',{
        html: $('#explainRT').html(),
    }).appendTo(ciCard);

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
    html2canvas( $('#picwrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});