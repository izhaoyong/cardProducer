'use strict';
console.log('startCard');
let modified = false, bg = false, colorPicker = $('#colorWrapper');
let bgColor = "", textColor = "", imageData = null;

$('#backgroundImage').on('dragover',function (event) {
	event.preventDefault();
});

$('#backgroundImage').on('drop',function (event) {
    event.preventDefault();
    event.stopPropagation();

    let src = event.originalEvent.dataTransfer.getData('text/plain');
    $( this ).prop('src',src);

    modified = true;
    setSaveButton();
    console.log(event.target);
});

$('#titleRT').on('keydown',function( event ){
    modified = true;
    setSaveButton();
    console.log('log');
});

$('#buttonRT').on('keydown',function( event ){
    modified = true;
    setSaveButton();
    console.log('log');
});

let colorButton = $("#color");
let colorLabel = $('#colorLabel');

function SetColor(color){
    let iLen = String(color).length;
    color = String(color).substring(iLen, iLen - 6);
    $(colorButton).css('background-color','#'+color);
    $(colorLabel).prop('value',color);
}

$('.cell').mouseover(function( event ){
    $(this).css('border-color','white');
});

$('.cell').mouseleave(function( event ){
    $(this).css('border-color','black');
});

$('#table>div>div').click( function(event){
    let color = $(this).css('background-color');

    if ( bg ) {
        $('#bgColorPicker').css('background-color',color);
        $('#Startwrapper').css('background-color',color);
        $('#buttonContainer').css('background-color',color);
        $('#titleRT').css('background-color',color);
        $('#buttonRT').css('background-color',color);
    }else{
        $('#textColorPicker').css('background-color',color);
        $('#buttonRT').css('color',color);
        $('#titleRT').css('color',color);
    }

    $('#colorWrapper').css('display','none');
    modified = true;
    setSaveButton();
});

function setBgColor(){
    bg = true;

    $('#colorWrapper').css('left', '0px');
    $('#colorWrapper').css('top', 490 );
    $('#colorWrapper').css('display','block');
}

function setTextColor(){
    bg = false;
    
    $('#colorWrapper').css('left', '850px');
    $('#colorWrapper').css('right', '3px');
    $('#colorWrapper').css('top',  120 );
    $('#colorWrapper').css('display','block');    
}

$('#Startwrapper').click( function(event){
    if( event.target ==  $('#bgColorPicker')[0] ){
        setBgColor();
    }else if( event.target ==  $('#textColorPicker')[0] ){
        setTextColor();
    }else {
        $(colorPicker).css('display','none');
    }
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
            data: prepareXML( data ),
        }).done(function(data){
            $('#namecheck').css('display','none');
            return2Template();
        });
    });
}

function prepareXML( picPath ){
    let color = $('#bgColorPicker').css('background-color');
    let pattern = /\d+/g;
    let red = parseInt(pattern.exec(color));
    red = red*256*256;
    let green = parseInt(pattern.exec(color));
    green = green * 256;
    let blue = parseInt(pattern.exec(color));
    bgColor = red + green + blue;

    color = $('#textColorPicker').css('background-color');
    pattern = /\d+/g;
    red = parseInt(pattern.exec(color));
    red = red*256*256;
    green = parseInt(pattern.exec(color));
    green = green * 256;
    blue = parseInt(pattern.exec(color));
    textColor = red + green + blue;

    let div = $('<div>');
    let startCard = $('<startCard>',{
        img: $('#backgroundImage').attr('src'),
        snapshot: picPath,
    }).appendTo(div);

    $('<title>',{
        html: $('#titleRT').prop('value'),
    }).appendTo(startCard);

    $('<buttonText>',{
        html:$('#buttonRT').prop('value'),
    }).appendTo(startCard);

    $('<bgColor>',{
        html:bgColor,
    }).appendTo(startCard);

    $('<textColor>',{
        html:textColor,
    }).appendTo(startCard);

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
    html2canvas( $('#Startwrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});