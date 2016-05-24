'use strict';
let index = 0, imageData;

$('.item>button').click(function(event){
	$(event.target).parent().remove();
    modified = true;
    setSaveButton();
});

function deleteItem(event){
	$($(event.target).parent()).remove();
    modified = true;
    setSaveButton();
}

function showModify(event){
	$(event.target).parent().prev().prev().addClass("show");
}

function hideModify(event){
	$(event.target).parent().prev().removeClass("show");
    modified = true;
    setSaveButton();
}

$("#add").click(function( event ){
	$.ajax({
	  	url: "mxmlComponents/YORN.txt",
	}).done(function(response) {
		let line = $(response);
		let p1 = $(line).children()[2];
		let input = $(p1).children()[0];
		$(input).prop("name","check"+index);
		$(input).on('click', hideModify);

		p1 = $(line).children()[3];
		input = $(p1).children()[0];
		$(input).prop("name","check"+index++);				
		$(input).on('click', showModify);

		let delButton = $(line).children()[4];
		$(delButton).on('click', deleteItem);
	  	$(itemWrapper).append(line);
        
        modified = true;
        setSaveButton();
	});			
});



$('.falseRB').click(function(event){
	$(this).parent().prev().prev().addClass("show");
});

$('.trueRB').click(function(event){
	$(this).parent().prev().removeClass("show");
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
    let yornCard = $('<yornCard>',{
        snapshot: picPath,
    }).appendTo(div);

    let questions = $('<questions>').appendTo(yornCard);
    let items = $('.item');
    $.each( items , function( index, ele){
	    let item = $('<item>').appendTo(questions);
	    let check = $( $( $(item).children()[2] ).children()[0] ).prop('checked');

	    let question = $('<question>',{
	    	corrent: check ? "true":"false",
	    }).appendTo(item);
	    let questionStr = $($(ele).children()[0]).prop('value').split('/');
	    $.each(questionStr, function(index, str){
	    	if( str && str != ''){
	    		let citem = $('<citem>',{
	    			html: str,
	    		});

	    		if ( str.indexOf('*') != -1 || str.indexOf('x') != -1) {
	    			str.replace("*",'').replace('x',"");
	    			citem = $('<citem',{
	    				wrong: "wrong",
	    				html:str,
	    			});
	    		}
	    		citem.appendTo(question);
	    	}
	    });

	    $('<modify>',{
	    	html: $($(ele).children()[1]).prop('value'),
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
    html2canvas( $('#YORNwrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});