'use strcit';
let fileItems = [];
function appendTemplateToScroller( e, template, previewMediaContainer ){
	let content = $($($(template)[0].content).children()[0]).clone();
	let textarea = $(content).children()[3];
	$(textarea).focus( function(e){
		e.target.textContent = "";
		console.log('textarea');
	});
	$(previewMediaContainer).append($(content).clone(true));
}

function upload2Server(div){
	let imageData;
	html2canvas( div, {
		onrendered: function(canvas) {
			imageData = canvas.toDataURL("image/png");
			let tagInfo = $('textarea.tagInput').prop('value');
			let blob = dataURLtoBlob( imageData );
			$.ajax({
				url: encodeURI('../inc/source.php?width=100&height=75&style=3&ResourceTypeID=1&userID=' + userID + '&Tags=' + tagInfo),
				method: "POST",
				data: blob,
			}).done( function( data ){	});
		}
	});
}
