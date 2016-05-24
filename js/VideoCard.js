'use strict';
console.log('videoCard');
let imageData;
$('#videoContainer').on('dragover', function(event){
	event.preventDefault();
});

$('#videoContainer').on('drop', function(event){
	event.preventDefault();
	event.stopPropagation();

	let src = event.originalEvent.dataTransfer.getData('text/plain');
	$('#videoPlayer').prop('src', src);

	modified = true;
	setSaveButton();
	console.log(event.target);
});

$('#titleRT').on('keydown',function(event){
	modified = true;
	setSaveButton();
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
    	url:"/inc/source.php?style=11",
    	mothod:"POST",
    	contentType:'application/octet-stream',
    	processData:false,
    	data:blob,
    }).done(function(data){
    	let pattern = /^([^\.])+\.(png|jpg)/;
    	let picPath = "";
    	if( pattern.test(data) ){
    		let result = pattern.exec(data);
    		picPath = result[0];
    	}
    	console.log(data);
    	$.ajax({
    		url:"/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+TemplateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
    		mothod:"POST",
    		processData:false,
    		contentType:'text/xml',
    		data:prepareXML(picPath),
    	}).done(function(event){
            $('#namecheck').css('display','none');
            return2Template();
    	});
    });
}

function prepareXML(picPath){
	let imageURL = $('#videoPlayer').attr('src');
	imageURL.replace('../',"");
	let div = $('<div>');
	let videoCard = $('<videoCard>',{
		img:imageURL,
		mp4:imageURL.replace(/flv/g,'mp4'),
		ogg:imageURL.replace(/flv/g,'ogg'),
		snapshot:picPath,
	}).appendTo(div);

    $('<description>',{
        html: $('#titleRT').prop('value'),
    }).appendTo(videoCard);

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
    html2canvas( $('#videowrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            uploadXML();
        }
    });
});

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});