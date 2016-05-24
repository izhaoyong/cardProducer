/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
'use strict';
let resource =  $("#pictureContent");
let cardName = "cardTemplate/CiCard.txt";
let templateName = "";
let jsName = "";
let cardsID = "";
let userID = "";
let category = null;
let image_4_3 = false;
let image_no_cut = false;
let mediaType ;
let whichLink = null;

let clickMyPictureMoreTimes = 0;
let clickSystemPictureMoreTimes = 0;
let clickSearchPictureMoreTimes = 0;

let clickMySoundMoreTimes = 0;
let clickSystemSoundMoreTimes = 0;
let clickSearchSoundMoreTimes = 0;

let clickMyCardMoreTimes = 0;
let clickSystemCardMoreTimes = 0;
let clickSearchCardMoreTimes = 0;

let clickMyVideoMoreTimes = 0;
let clickSystemVideoMoreTimes = 0;
let clickSearchVideoMoreTimes = 0;

let systemPic = $('#systemPictureContainer');
let myPic = $('#myPictureContainer');
let searchPic = $('#picSearchResultContainer');

let systemAudio = $('#systemSoundContainer');
let myAudio = $('#mySoundContainer');
let searchAudio = $('#soundSearchResultContainer');

let systemCard = $('#systemCardContainer');
let myCard = $('#myCardContainer');
let searchCard = $('#cardSearchResultContainer');

let systemVideo = $('#systemVideoContainer');
let myVideo = $('#myVideoContainer');
let searchVideo = $('#videoSearchResultContainer');

let mask = $('#mask');
let chooseArea = $('#chooseArea');
let jsPTR = $('#jsPTR');
let templateContainer = $('#templateContainer');
let loadingLabel = $('#loadingLabel');
let resourceIconContainer = $('#resourceIconContainer');
let resourceVS = $('#resourceVS');
let tipChooseLabel = $('#tipChooseLabel');

let state = {
	'ZiCard':'1',
	'JuCard':'0_1',
	'PyCard':'0_1',
	'ImageCardCommon':'0_1_2',
	'DwCard':'1',
	'VideoCard':'3',
	'DialogCard':'0_1_2',
	'BqCard':'0_1_2',
	'CiCard':'0_1',	
	'CiCard2':'0_1',
	'CiCard3':'0',
	'Exercise1':'0',
	'Exercise2':'0_1',
	'Exercise3':'0_1',
	'ChooseCard':'0_1',
	'LineCard':'0_1',
	'YORNCard':'0_1',
	'StartCard':'0_1',
	'EndCard':'0_1',
	'PaixuCard':' '
};

let audioDragIcon = $("<img>")[0];
audioDragIcon.src = 'assets/mainIcon/soundDrag.png';

let picDragIcon = $("<img>")[0];
picDragIcon.src = 'assets/mainIcon/pictureDrag.png';

function getMoreSystemPic(){
	let local_userID = '0';
	let times = ++clickSystemPictureMoreTimes;
	$.ajax({
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=1",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(pattern, '_small$1');
			let img = $("<img/>")[0];
			img.src = src;
			$(systemPic).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#picJS').html( script );
		});
	});	
}

function getMoreMyPic(){
	let local_userID = userID;
	let times = ++clickMyPictureMoreTimes
	$.ajax({
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=1",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(pattern, '_small$1');
			let img = $("<img/>")[0];
			img.src = src;
			$(myPic).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#picJS').html( script );
		});
	});	
}

function getMoreSearchPic(){
	$.ajax({
		// url: 'xml/pic.xml',
		url: "../inc/source.php?style=2&num=20&type=1&search=" + searchInput.value + "&times=" + clickSearchPictureMoreTimes,
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		let len = node.length;
		$(node).each(function(index){
			if (index == len -1 ) { 
				return false;
			}
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(result[0], '_small'+result[0]);
			let img = $("<img/>")[0];
			img.src = src;
			$(searchPic).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#picJS').html( script );
		});
	});	
}

function getMoreSystemAduio(){
	let local_userID = '0';
	let times = ++clickSystemSoundMoreTimes;
	$.ajax({
		// url: 'xml/sound.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=2",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let description = $(this).attr("ResourceName");
			src = "../" + src.replace(/wav/g, 'mp3');
			makeAudio(src, description, systemAudio);
		});
		$('#audioItemCSS').prop('href','css/audioItem.css');

		$.getScript( 'js/audioItem.js' ).done( function( script, textStatus ){
			$('#audioJS').html( script );
		});
	});
}

function getMoreMyAudio(){
	let local_userID = userID;
	let times = ++ clickMySoundMoreTimes;
	$.ajax({
		// url: 'xml/sound.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=2",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let description = $(this).attr("ResourceName");
			src = "../" + src.replace(/wav/g, 'mp3');
			makeAudio(src, description, myAudio);
		});
		$('#audioItemCSS').prop('href','css/audioItem.css');

		$.getScript( 'js/audioItem.js' ).done( function( script, textStatus ){
			$('#audioJS').html( script );
		});
	});
}

function getMoreSearchAudio(){
	$.ajax({
		// url: 'xml/sound.xml',
		url: "../inc/source.php?style=2&num=20&type=2&search=" + searchInput.value + "&times=" + clickSearchSoundMoreTimes,
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		let len = node.length;
		$(node).each(function(index){
			if (index == len - 1) {
				return false;
			}
			let src = $(this).attr("location");
			let description = $(this).attr("ResourceName");
			src = "../" + src.replace(/wav/g, 'mp3');
			makeAudio(src, description, searchAudio);
		});
		$('#audioItemCSS').prop('href','css/audioItem.css');

		$.getScript( 'js/audioItem.js' ).done( function( script, textStatus ){
			$('#audioJS').html( script );
		});
	});
}

function getMoreSystemCard(){
	let local_userID = '0';
	let times = ++ clickMyCardMoreTimes;
	$.ajax({
		// url: 'xml/card.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=13" + "&times=" + times + "&num=20",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(pattern, '_small$1');
			let img = $("<img/>")[0];
			img.src = src;
			// img.title = $(this).attr("cardID");
			$(img).attr('cardID', $(this).attr("cardID"));
			$(systemCard).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#cardJS').html( script );
		});
	});	
}

function getMoreMyCard(){
	let local_userID = userID;
	let times = ++ clickMyCardMoreTimes;
	$.ajax({
		// url: 'xml/card.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=13" + "&times=" + times + "&num=20",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(pattern, '_small$1');
			let img = $("<img/>")[0];
			img.src = src;
			img.title = $(this).attr("cardID");
			$(myCard).append(img);
		});
		$('#ItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#cardJS').html( script );
		});
	});
}

function getMoreSearchCard(){
	$.ajax({
		// url: 'xml/card.xml',
		url: "../inc/source.php?style=14&num=20&search=" + searchInput.value + "&times=" + clickSearchCardMoreTimes,
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		let len = node.length;
		$(node).each(function(index){
			if (index == len -1 ) {
				return false;
			}

			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(result[0], '_small' + result[0] );
			let img = $("<img/>")[0];
			img.src = src;
			img.title = $(this).attr("cardID");
			$(searchCard).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#cardJS').html( script );
		});
	});
}

function getMoreSystemVideo(){
	let local_userID = '0';
	let times = ++ clickSystemVideoMoreTimes;

	$.ajax({
		// url: 'xml/pic.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=3",
		dataType:"xml",
	}).done(function( data ){
		if (data == null) {
			return ;
		}
		let node = data.children[0].children;
		let len = node.length;
		$(node).each(function(index){
			if (index == len -1) {
				return false;
			}
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(result[0], '_small'+result[0]);
			let img = $("<img/>")[0];
			img.src = src;
			$(systemVideo).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#videoJS').html( script );
		});
	});
}

function getMoreMyVideo(){
	let local_userID = userID;
	let times = ++ clickMyVideoMoreTimes;

	$.ajax({
		// url: 'xml/pic.xml',
		url: "../inc/source.php?userID=" + local_userID + "&style=1" + "&times=" + times + "&num=20" + "&type=3",
		dataType:"xml",
	}).done(function( data ){
		let node = data.children[0].children;
		$(node).each(function(){
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(pattern, '_small$1');
			let img = $("<img/>")[0];
			img.src = src;
			$(myVideo).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#videoJS').html( script );
		});
	});
}

function getMoreSearchVideo(){
	$.ajax({
		// url: 'xml/pic.xml',
		url: "../inc/source.php?style=2&num=20&type=3&search=" + searchInput.value + "&times=" + clickSearchVideoMoreTimes,
		dataType:"xml",
	}).done(function( data ){
		if (data == null) {
			return;
		}

		let node = data.children[0].children;
		let len = node.length;
		$(node).each(function(index){
			if (index == len -1 ) {
				return false;
			}
			let src = $(this).attr("location");
			let pattern = /(\.\w+)$/;
			let result = pattern.exec(src);
			src = "../" + src.replace(result[0], '_small'+result[0]);
			let img = $("<img/>")[0];
			img.src = src;
			$(searchVideo).append(img);
		});
		$('#picItemCSS').prop('href','css/picItem.css');

		$.getScript( 'js/picItem.js' ).done( function( script, textStatus ){
			$('#videoJS').html( script );
		});
	});
}

function makeAudio(src, description, soundContainer){
	$.ajax({
		url: "mxmlComponents/audioItem.txt",
	}).done(function( data ){
		let audioItem = $(data);
		$(audioItem).children()[0].title = src;
		$($(audioItem).children()[0]).html( description );
		$(audioItem).children()[1].src = src;
		$(audioItem).children()[2].value = src;

		$(soundContainer).append(audioItem);
	});
}

function makeVideo(src, description, videoContainer){
	$.ajax({
		url: "mxmlComponents/videoItem.txt",
	}).done(function( data ){
		let videoItem = $(data);
		$(videoItem).children()[0].title = src;
		$($(videoItem).children()[1]).html( description );

		$(videoContainer).append(videoItem);
	});
}

function resource2None(){
	$("#pictureContent").css("display","none");
	$("#soundContent").css("display","none");
	$("#cardContent").css("display","none");
	$("#videoContent").css("display","none");
}

$("#pictureNavButton").click(function (event) {
	resource2None();
	$("#pictureContent").css("display","block");
	resource = $("#pictureContent");
});

$("#soundNavButton").click(function (event) {
	resource2None();
	$("#soundContent").css("display","block");
	resource = $("#soundContent");
});

$("#cardNavButton").click(function (event) {
	resource2None();
	$("#cardContent").css("display","block");
	resource = $("#cardContent");
});

$("#videoNavButton").click(function (event) {
	resource2None();
	$("#videoContent").css("display","block");
	resource = $("#videoContent");
});

function setSearchContent2NONE(){
	$('#picSearchResultContainer').empty();
	$('#soundSearchResultContainer').empty();
	$('#cardSearchResultContainer').empty();
	$('#videoSearchResultContainer').empty();
}

function doSearch(){
	getMoreSearchVideo();
	getMoreSearchCard();
	getMoreSearchPic();
	getMoreSearchAudio();
}

function searchResource(){
	let searchText = $("#searchInput").prop("value");
	if ( searchText == "" ) return;

	setSearchContent2NONE();
	clickSearchPictureMoreTimes = 1;
	clickSearchVideoMoreTimes = 1;
	clickSearchCardMoreTimes = 1;
	clickSearchSoundMoreTimes = 1;
	doSearch();

	$($("#pictureContent").children()[0]).css("display","none");
	$($("#soundContent").children()[0]).css("display","none");
	$($("#videoContent").children()[0]).css("display","none");
	$($("#cardContent").children()[0]).css("display","none");

	$($("#pictureContent").children()[1]).css("display","flex");
	$($("#soundContent").children()[1]).css("display","flex");
	$($("#videoContent").children()[1]).css("display","flex");
	$($("#cardContent").children()[1]).css("display","flex");
}

$("#searchInput").keydown(function(){
	$("#removeInputX").css("visibility","visible");
});

$("#removeInputX").click(function(){
	$("#removeInputX").css("visibility","hidden");
	$("#searchInput").prop("value","");

	resource2None();
	$($("#pictureContent").children()[1]).css("display","none");
	$($("#soundContent").children()[1]).css("display","none");
	$($("#videoContent").children()[1]).css("display","none");
	$($("#cardContent").children()[1]).css("display","none");

	$($("#pictureContent").children()[0]).css("display","flex");
	$($("#soundContent").children()[0]).css("display","flex");
	$($("#videoContent").children()[0]).css("display","flex");
	$($("#cardContent").children()[0]).css("display","flex");

	$(resource).css('display','block');
});

$('.TileGroup>img').on('dragstart',function( event ){
	let src = $(event.target).prop('src');
	event.originalEvent.dataTransfer.setData('text/plain',src);
});

$('#myPicMoreButton').click( function( event ){
	getMoreMyPic();
	$('#noMyPicLabel').css('display','none');
});

$('#sysPicMoreButton').click( function( event ){
	getMoreSystemPic();
});

$('#getMoreSearchedPicButton').click( function( event ){
	clickSearchPictureMoreTimes ++ ;
	getMoreSearchPic();
});

$('#mySoundMoreButton').click( function( event ){
	getMoreMyAudio();
	$('#noMySoundLabel').css('display','none');
});

$('#sysSoundMoreButton').click( function( event ){
	getMoreSystemAduio();
});

$('#getMoreSearchedSoundButton').click( function( event ){
	clickSearchSoundMoreTimes ++;
	getMoreSearchAudio();
});

$('#myCardMoreButton').click( function( event ){
	getMoreMyCard();
	$('#noMyCardLabel').css('display','none');
});

$('#sysCardMoreButton').click( function( event ){
	getMoreSystemCard();
});

$('#getMoreSearchedCardButton').click( function( event ){
	clickSearchCardMoreTimes ++ ;
	getMoreSearchCard();
});

$('#myVideoMoreButton').click( function( event ){
	getMoreMyVideo();
	$('#noMyVideoLabel').css('display','none');
});

$('#sysVideoMoreButton').click( function( event ){
	getMoreSystemVideo();
});

$('#getMoreSearchedVideoButton').click( function( event ){
	clickSearchVideoMoreTimes ++ ;
	getMoreSearchVideo();
});

$('button.imgUploadButton').click( function(event){
	$('input.uploadImg').click();
});

$('button.uploadAudioButton').click( function(event){
	mediaType = "audio";
	$('input.uploadAudio').click();
});

$('button.uploadVideoButton').click( function(event){
	mediaType = "video";
	$('input.uploadVideo').click();
});

$('button#soundRecordButton').click( function(event){
	$('#mask').css('display','block');
	$("#SoundUploadPanel").css('visibility','visible');	
	init();
});


$('.tileGroup1 input[type="radio"]').click(function(){
    category = $(this).prop('value');
});


// this is about dialog Card
let colorButton = null;
let colorLabel = null ;

function SetColor(color){
    let iLen = String(color).length;
    color = String(color).substring(iLen, iLen - 6);
    $(colorButton).css('background-color','#'+color);
    $(colorLabel).prop('value',color);
}