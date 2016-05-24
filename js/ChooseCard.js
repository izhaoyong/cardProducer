'use strict';
console.log('choose card');
let wordGroupContainer = $('#wordGroupContainer'),
    imageData ;

$('.wordGroup>button').click(function(event){
	$(event.target).parent().remove();
});

function delWordGroup( event ){
	$(event.target).parent().remove();
}

$('input.textInput').keydown(function(e){
    modified = true;
    setSaveButton();
});

$('#chooseText').keydown(function(e){
    modified = true;
    setSaveButton();
});

$('#Choosewrapper>button').click( function(){
	$.ajax({
		url: "mxmlComponents/wordGroup.txt",
	}).done(function( data ){
		let wordItem = $(data);
		let delButton = $( wordItem ).children()[1];
		$(delButton).on("click", delWordGroup);
		$( wordItem ).appendTo(wordGroupContainer);
        modified = true;
        setSaveButton();
	});
});

function uploadXML(){
    let cardNameValue = $("#cardsnametext").prop('value');
    let tagTxt = $("#tagstext").prop('value');
    let category1 = $("#Category1").prop('value');
    let ex = $("#EX").prop('value');
    let cardsid = $('#cardsid').prop('value');
    let saveStyle= 4;
    let templateID = 2;
    let userID = "temp222.28.84.1520160501232437279304";
    let blob = dataURLtoBlob( imageData );

    $.ajax({
        url: "/inc/source.php?style=11",
        method: "POST",
        processData:false,
        contentType:'application/octet-stream',
        data: blob,
    }).done( function( data ){
        let pattern = /[^\.]+\.(png|jpg)/g;
        let result = pattern.exec(data);
        let picPath = result[0];
        $.ajax({
            url: "/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+templateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
            method: "POST",
            processData:false,
            contentType:'text/xml',
            data: prepareXML( picPath ),
        }).done(function(data){
            $('#namecheck').css('display','none');
            return2Template();
        });
    });
}

function prepareXML( picPath ){
    let div = $('<div>');
    let chooseCard = $('<chooseCard>',{
        snapshot: picPath,
    }).appendTo(div);

    let groups = $('<groups>').appendTo(chooseCard);
    let wordGroup = $('.wordGroup');
    $.each(wordGroup, function( index, ele){
	    let group = $('<group>').appendTo(groups);
        let child = $(ele).children()[0];
	    let words = $(child).prop('value').split(/，|、|。|；|,|\.|;|\//g);
	    $.each(words, function(cursor, word){
		    $('<item>',{
		    	html:word,
		    }).appendTo(group);
	    });
    });

    $('<text>',{
        html: $('#chooseText').prop('value').replace(/\n+/g,'***'),
    }).appendTo(chooseCard);

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
    html2canvas( $('#Choosewrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});