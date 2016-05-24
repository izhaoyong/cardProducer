'use strict';
console.log('lineCard');
let lineWrapper = $("#lineWrapper");
let focus = null, imageData;

$('.lineItem>button').click(function( event ){
	$(event.target).parent().remove();
    modified = true;
    setSaveButton();
});

function deleteLine(event){
	$(event.target).parent().remove();
    modified = true;
    setSaveButton();
}

$("#add").click(function(event){
	$.ajax({
	  url: "mxmlComponents/line.txt",
	}).done(function(response) {
	  	let lineItem = $(response);
	  	let autofocus = $(lineItem).children()[0];
	  	let delButton = $(lineItem).children()[3];
	  	$(delButton).on("click", deleteLine);
	  	$(lineItem).appendTo( lineWrapper );
        console.log('lineItem');
        modified = true;
        setSaveButton();
	});
});	

function removeFocus(){
	$(lineWrapper).children().each(function( ){
		let autofocus = $(this).children().filter("input[autofocus]");
		if ( autofocus.length ){
			$(autofocus).removeAttr("autofocus");
		}else{
			console.log("log");
		}
	});
}

function uploadXML(){
    let cardNameValue = $("#cardsnametext").prop('value'),
        tagTxt = $("#tagstext").prop('value'),
        category1 = $("#Category1").prop('value'),
        ex = $("#EX").prop('value'),
        cardsid = $('#cardsid').prop('value'),
        saveStyle= 4,
        templateID = 2,
        userID = "temp222.28.84.1520160501232437279304",
        blob = dataURLtoBlob( imageData );

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
    let lineCard = $('<lineCard>',{
        snapshot: picPath,
    }).appendTo(div);

    let questions = $('<questions>').appendTo(lineCard);
    let items = $('.lineItem');
    $.each( items , function( index, ele){
	    let item = $('<item>').appendTo(questions);
	    $('<left>',{
	    	html:$($(ele).children()[0]).prop('value'),
	    }).appendTo(item);
	    $('<right>',{
	    	html:$($(ele).children()[1]).prop('value'),
	    }).appendTo(item);
    });

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
    html2canvas( $('#Linewrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});