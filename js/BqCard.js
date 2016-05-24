'use strict';
console.log('bgCard');

let imageData = null;
let index = 0;
let which = null;
let preX = 0;
let preY = 0;
let curX = 0;
let curY = 0;
let mouseX = 0;
let mouseY = 0;
let src = "";

let commentCount = 0;
let curObject = null; 
let cornerWrapper = null;
let workImageContainer = $('#workImageContainer');
let isMouseDown = false;
let workImagePosition = $(workImageContainer).offset();
let dialogWrapper = $('#dialogWrapper');
let sentenceSetPanel = $('#sentenceSetPanel');
let webLink = $('#webLink');
let colorWrapper = $('#colorWrapper');
let markWrapper = $('#markWrapper');
let audioArray = [];
let cardArray = [];
let commentArray = [];
let linkArray = [];
let maskArray = [];
let mediaArray = [];
let markArray = [];
let picArray = [];
let nextArray = [];
let cnFontColor, pyFontColor, transFontColor;
let fontFamily, fontSize;
let hasPic = false;
let isMarkButtonClick = false;
let hasMouseMoved = false;
let isTrigged = false;
let isMark = false;

colorButton = $("#color");
colorLabel = $('#colorLabel');

//This is about the toolbar function
function setFontSize(fontSize){
    $.each(commentArray, function(){
        let comment = $(this).children()[4];
        $($(comment).children()[0]).css('font-size', fontSize*0.7);
        $($(comment).children()[1]).css('font-size', fontSize);
        $($(comment).children()[2]).css('font-size', fontSize*0.7);
    });   
}

$('#fontDDL').change( function(event){
    fontFamily = this.value;
    setFongFamily(fontFamily);
    modified = true;
    setSaveButton();
});

function setFongFamily(fontFamily){
    $.each(commentArray, function(){
        let comment = $(this).children()[4];
        $($(comment).children()[0]).css('font-family', fontFamily);
        $($(comment).children()[1]).css('font-family', fontFamily);
        $($(comment).children()[2]).css('font-family', fontFamily);
    });
}

$('#transColorPicker').click( function(event){
	transColor( event );
});

$('#cnColorPicker').click( function(event){
	cnColor( event );
});

$('#pyColorPicker').click( function(event){
	pyColor( event );
});

$('#fontSizeDDL').change(function(event){
    fontSize = this.value;
    setFontSize(parseInt(fontSize));
    modified = true;
    setSaveButton();
});

$('#bgColorPicker').click(function(event){
    setBGColor();
});

function cnColor(argument) {
    which = $("#cnColorPicker");

    $(colorWrapper).css('left', 520 );
    $(colorWrapper).css('top',  450 );
    $(colorWrapper).css('display','block');
}

function setCnFontColor(color){
    $.each(commentArray, function(){
        let comment = $(this).children()[4];
        let cnFont = $(comment).children()[1];
        $(cnFont).css('color',color);
    });
    $('#cnColorPicker').css('background-color',color);
}

function pyColor(argument) {
    which = $("#pyColorPicker");

    $(colorWrapper).css('left', 520 );
    $(colorWrapper).css('top',  356 );
    $(colorWrapper).css('display','block'); 
}

function setPyFontColor(color){
    $.each(commentArray, function(){
        let comment = $(this).children()[4];
        let pyFont = $(comment).children()[0];
        $(pyFont).css('color',color);
    });
    $('#pyColorPicker').css('background-color',color);
}

function transColor(argument) {
    which = $("#transColorPicker");

    $(colorWrapper).css('left', 520 );
    $(colorWrapper).css('top',  416 );
    $(colorWrapper).css('display','block'); 
}

function setTransFontColor(color){
    $.each(commentArray, function(){
        let comment = $(this).children()[4];
        let transFont = $(comment).children()[2];
        $(transFont).css('color',color);
    });
    $('#transColorPicker').css('background-color',color);
}

function setBGColor(){
    which = $("#bgColorPicker");

    $(colorWrapper).css('left', 520 );
    $(colorWrapper).css('top',  400 );
    $(colorWrapper).css('display','block');
}

$('#table>div>div').click( function( event ){
    let color = $(this).css('background-color');
    if ( $(which).attr('id') == "cnColorPicker") {
        cnFontColor = color;
        setCnFontColor(cnFontColor);
    }else if ( $(which).attr('id') == "pyColorPicker" ) {
        pyFontColor = color;
        setPyFontColor(pyFontColor);
    }else if ( $(which).attr('id') == "transColorPicker" ) {
        transFontColor = color;
        setTransFontColor( transFontColor );
    }else if ( $(which).children().length == 3) {
        setCommentColor(which, color);
    }else if( $(which).attr('id') == "bgColorPicker" ){
        $('#workImageContainer').css('background-color',color);
        $('#bgColorPicker').css('background-color',color);
    }else{
        $(which).css('background-color',color);
    }

    modified = true;
    setSaveButton();
    $(colorWrapper).css('display','none');
});

function setCommentColor(which, color){
    let after = $($(which).next()).next();
    if ($(which).prop('class') == 'left') {
        $(after).css('border-right-color', color);
    }else{
        $(after).css('border-left-color', color);
    }

    $(which).children().each(function(){
        $(this).css('background-color',color);
    });
}

$('#bqWrapper').mousedown(function( event ){
    if ( $.contains( document.getElementById("colorWrapper"), event.target ) ||  event.target == colorWrapper[0]  ) {
        $(colorWrapper).css('display','block');
    }else{
        $(colorWrapper).css('display','none');
    }

    if ( $.contains( document.getElementById("markWrapper"), event.target ) ||  event.target == markWrapper[0]  ) {
        $(markWrapper).css('display','block');
    }else{
        $(markWrapper).css('display','none');
    }

    if ( $.contains( document.getElementById("webLink"), event.target ) ||  event.target == webLink[0] ) {
        $(webLink).css('display','block');
    }else{
        $(webLink).css('display','none');
    }

    if ( $.contains( document.getElementById("sentenceSetPanel"), event.target ) ||  event.target == sentenceSetPanel[0]  ) {
        $(sentenceSetPanel).css('display','block');
    }else{
        $(sentenceSetPanel).css('display','none');
    }
});

$('#workImageContainer').mousedown(function( event ){
    if ( $.contains( document.getElementById("colorWrapper"), event.target ) ||  event.target == colorWrapper[0]  ) {
        $(colorWrapper).css('display','block');
    }else{
        $(colorWrapper).css('display','none');
    }

    if ( $.contains( document.getElementById("markWrapper"), event.target ) ||  event.target == markWrapper[0]  ) {
        $(markWrapper).css('display','block');
    }else{
        $(markWrapper).css('display','none');
    }

    if ( $.contains( document.getElementById("webLink"), event.target ) ||  event.target == webLink[0] ) {
        $(webLink).css('display','block');
    }else{
        $(webLink).css('display','none');
    }

    if ( $.contains( document.getElementById("sentenceSetPanel"), event.target ) ||  event.target == sentenceSetPanel[0]  ) {
        $(sentenceSetPanel).css('display','block');
    }else{
        $(sentenceSetPanel).css('display','none');
    }
});

$('#markToggleButton').click(function(event){
	isMarkButtonClick = !isMarkButtonClick;
	if ( isMarkButtonClick ) {
		$(this).css('background-color', '#123456');
        $('#wrapper').addClass('cursor');
	}else{
		$(this).css('background-color', 'transparent');
        $('#wrapper').removeClass('cursor');
	}
});

$('#commentImg').on('dragstart', function( event ){
	event.originalEvent.dataTransfer.setDragImage(picDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',"comment");
});

$('#linkImg').on('dragstart', function( event ){
	event.originalEvent.dataTransfer.setDragImage(picDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',"link");
});

$('#maskImg').on('dragstart', function(event){
	event.originalEvent.dataTransfer.setDragImage(picDragIcon, 40, 40);
	event.originalEvent.dataTransfer.setData('text/plain',"mask");
});

$('#workImageContainer').on('mousedown', workImageContainerDown);
function workImageContainerDown(event){
    event.stopPropagation();
    if ( isMarkButtonClick ) {
        addMark(event.pageX, event.pageY );
        hasMouseMoved = false;
        $('#workImageContainer').on('mousemove', workImageContainerMove);
        $('#workImageContainer').on('mouseup', workImageContainerUp);
    }
}

function workImageContainerMove(event){
    event.stopPropagation();
	if ( isMarkButtonClick ) {
		hasMouseMoved = true;
	}
}

function workImageContainerUp( event ){
    event.stopPropagation();
	if ( !hasMouseMoved && isMarkButtonClick ) {
        whichLink.remove();
        markArray.pop();
        $('#workImageContainer').off('mousemove', workImageContainerMove);
        $('#workImageContainer').off('mouseup', workImageContainerUp);
	}
}

$('#workImageContainer').on('dragover', function( event ){
	event.preventDefault();
	event.stopPropagation();
});

$('#workImageContainer').on('drop',workImageContainerDrop);
function workImageContainerDrop( event ){
    event.preventDefault();
    event.stopPropagation();

    src = event.originalEvent.dataTransfer.getData('text/plain');
    if( src.search("snapshot") > -1 ) {
        addCard(event.pageX, event.pageY - 20, src);
    }else if( src.search("mp3") > -1 ) {
        addAudio(event.pageX, event.pageY );
    }else if( src.search("pic") > -1 ){
        src = src.replace('_small',"");
        addPic(event.pageX, event.pageY - 20, src);
    }else if ( src.search("comment") > -1) {
        addComment(event.pageX, event.pageY - 20);
    }else if ( src.search("link") > -1 ) {
        addLink(event.pageX, event.pageY - 20);
    }else if( src.search("mask") > -1 ){
		addMask( event.pageX, event.pageY -20);
    }
    modified = true;
    setSaveButton();
}

function addMark(x, y){
   $.ajax({
        url: "mxmlComponents/mark.txt",
    }).done(function(data){
        cornerWrapper = $(data);

        $($( cornerWrapper ).children()[0]).on( "click", delCorner );
        $($( cornerWrapper ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( cornerWrapper ).children()[0]).on( "mouseleave", delImgMouseOut );

        $($( cornerWrapper ).children()[1]).on( "click", showWebColor );
        $($( cornerWrapper ).children()[1]).on( "mouseover", colorImgMouseOver );
        $($( cornerWrapper ).children()[1]).on( "mouseleave", colorImgMouseOut );

        $($( cornerWrapper ).children()[2]).on( "click", showMarkWrapper );
        $($( cornerWrapper ).children()[2]).on( "mouseover", commentImgMouseOver );
        $($( cornerWrapper ).children()[2]).on( "mouseleave", commentImgMouseOut );

        $(cornerWrapper).children().each( function(){
        	$(this).on( "mousedown", componentDown );
        });

        $($(cornerWrapper).children()[4]).children().each(function(){
        	$(this).on("mousedown",  cornerDown);
        });

        $(cornerWrapper).css('height', '22px');
        $($(cornerWrapper).children()[4]).css('width', 0);
        $($(cornerWrapper).children()[4]).children().each(function(){
            $(this).trigger("mousedown", [x, y]);
        });        

        $( cornerWrapper ).css({'top': y - $(workImageContainer).offset().top -20, 'left': x - $(workImageContainer).offset().left});
        $( cornerWrapper ).appendTo(workImageContainer);

        markArray.push( cornerWrapper );
        whichLink = cornerWrapper;
    });
}

function addComment(x, y){
   $.ajax({
        url: "mxmlComponents/tuwenComment.txt",
    }).done(function(data){
        let commentItem = $(data);

        $($( commentItem ).children()[0]).on( "click", delCorner );
        $($( commentItem ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( commentItem ).children()[0]).on( "mouseleave", delImgMouseOut );

        $($( commentItem ).children()[1]).on( "click", showWebColor );
        $($( commentItem ).children()[1]).on( "mouseover", colorImgMouseOver );
        $($( commentItem ).children()[1]).on( "mouseleave", colorImgMouseOut );

        $($( commentItem ).children()[2]).on( "click", toolClick );
        $($( commentItem ).children()[2]).on( "mouseover", toolImgMouseOver );
        $($( commentItem ).children()[2]).on( "mouseleave", toolImgMouseOut );

        $($( commentItem ).children()[0]).on( "mousedown", componentDown );
        $($( commentItem ).children()[1]).on( "mousedown", componentDown );
        $($( commentItem ).children()[2]).on( "mousedown", componentDown );

        $($($(commentItem).children()[4]).children()[0]).css('color', pyFontColor);
        $($($(commentItem).children()[4]).children()[1]).css('color', cnFontColor);
        $($($(commentItem).children()[4]).children()[2]).css('color', transFontColor);

        $($( commentItem ).children()[4]).children().each(function(){
            $(this).keydown( function( event ){
                if( $(commentItem).width() + $(commentItem).position().left + 30 > 488 ){
                    $( commentItem ).css({'left': 488 - $(commentItem).width() - 30 });
                }
                modified = true;
                setSaveButton();
            });
        });

        if( commentCount  % 2 == 0){
        	$($(commentItem).children()[4]).addClass("left");
        }else{
        	$($(commentItem).children()[4]).addClass("right");
        }
        commentCount++;

        $( commentItem ).css({'top': y - workImagePosition.top,'left': x - workImagePosition.left});
        $( commentItem ).appendTo(workImageContainer);
          
        commentArray.push( commentItem );
    });
}

function addLink(x, y){
   $.ajax({
        url: "mxmlComponents/link.txt",
    }).done(function(data){
        cornerWrapper = $(data);

        $($( cornerWrapper ).children()[0]).on( "click", delCorner );
        $($( cornerWrapper ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( cornerWrapper ).children()[0]).on( "mouseleave", delImgMouseOut );

        $($( cornerWrapper ).children()[1]).on( "click", showWebColor );
        $($( cornerWrapper ).children()[1]).on( "mouseover", colorImgMouseOver );
        $($( cornerWrapper ).children()[1]).on( "mouseleave", colorImgMouseOut );

        $($( cornerWrapper ).children()[2]).on( "click", showWebAgain );
        $($( cornerWrapper ).children()[2]).on( "mouseover", commentImgMouseOver );
        $($( cornerWrapper ).children()[2]).on( "mouseleave", commentImgMouseOut );

        $(cornerWrapper).children().each( function(){
        	$(this).on( "mousedown", componentDown );
        });

        $($(cornerWrapper).children()[4]).children().each(function(){
        	$(this).on("mousedown", cornerDown);
        });

        $( cornerWrapper ).css({'top': y - $(workImageContainer).offset().top,'left': x - $(workImageContainer).offset().left});
        $( cornerWrapper ).appendTo(workImageContainer);

        $( webLink ).css({'top': 350,'left': 150});
        $( webLink ).css('display','block');

        linkArray.push( cornerWrapper );
        whichLink = cornerWrapper;
    });
}

function addMask(x, y){
   $.ajax({
        url: "mxmlComponents/mask.txt",
    }).done(function(data){
        cornerWrapper = $(data);

        $($( cornerWrapper ).children()[0]).on( "click", delCorner );
        $($( cornerWrapper ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( cornerWrapper ).children()[0]).on( "mouseleave", delImgMouseOut );

        $($( cornerWrapper ).children()[1]).on( "click", showWebColor );
        $($( cornerWrapper ).children()[1]).on( "mouseover", colorImgMouseOver );
        $($( cornerWrapper ).children()[1]).on( "mouseleave", colorImgMouseOut );

        $(cornerWrapper).children().each( function(){
            $(this).on( "mousedown", componentDown );
        });

        $($(cornerWrapper).children()[3]).children().each(function(){
            $(this).on("mousedown", cornerDown);
        });

        $( cornerWrapper ).css({'top': y - $(workImageContainer).offset().top,'left': x - $(workImageContainer).offset().left});
        $( cornerWrapper ).appendTo(workImageContainer);

        maskArray.push( cornerWrapper );
    });
}

function addAudio(x, y){
   $.ajax({
        url: "mxmlComponents/audio.txt",
    }).done(function(data){
        let audio = $(data);
		$($( audio ).children()[0]).on( "mousedown", componentDown );
        $($( audio ).children()[0]).on( "click", delCorner );
        $($( audio ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( audio ).children()[0]).on( "mouseleave", delImgMouseOut );

		$($( audio ).children()[2]).on( "mousedown", componentDown );
        let mp3 = $( audio ).children()[3];
        mp3.src = src;

        $( audio ).css({'top': y - $(workImageContainer).offset().top,'left': x - $(workImageContainer).offset().left});                
        $( audio ).appendTo(workImageContainer);

        audioArray.push( audio );
    });
}

function addPic(x, y, picPath){
   	$.ajax({
        url: "mxmlComponents/picItem.txt",
    }).done(function(data){
        cornerWrapper = $(data);

        $($( cornerWrapper ).children()[0]).on( "click", delCorner );
        $($( cornerWrapper ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( cornerWrapper ).children()[0]).on( "mouseleave", delImgMouseOut );

        $(cornerWrapper).children().each( function(){
        	$(this).on( "mousedown", componentDown );
        });

        $($(cornerWrapper).children()[2]).children().each(function(){
        	$(this).on("mousedown",  cornerDown);
        });

        let picRouter = 'url(' + picPath + ')';
        $($(cornerWrapper).children()[2]).css('background-image',picRouter);
        $($(cornerWrapper).children()[2]).css('background-repeat',"no-repeat");
        $($(cornerWrapper).children()[2]).css('background-positon',"100% 100%");
        $($(cornerWrapper).children()[2]).css('background-size',"100% 100%");

        $( cornerWrapper ).css({'top': y - $(workImageContainer).offset().top , 'left': x - $(workImageContainer).offset().left});
        $( cornerWrapper ).appendTo(workImageContainer);

        picArray.push( cornerWrapper );
    });
}

function addCard(x, y, src){
   $.ajax({
        url: "mxmlComponents/card.txt",
    }).done(function(data){
        cornerWrapper = $(data);
 
        $(cornerWrapper).children().each( function(){
        	$(this).on( "mousedown", componentDown );
        });

        $($(cornerWrapper).children()[3]).children().each(function(){
        	$(this).on("mousedown", cornerDown);
        });

        $($( cornerWrapper ).children()[0]).on( "click", delCorner );
        $($( cornerWrapper ).children()[0]).on( "mouseover", delImgMouseOver );
        $($( cornerWrapper ).children()[0]).on( "mouseleave", delImgMouseOut );

        $($( cornerWrapper ).children()[1]).on( "click", showWebColor );
        $($( cornerWrapper ).children()[1]).on( "mouseover", colorImgMouseOver );
        $($( cornerWrapper ).children()[1]).on( "mouseleave", colorImgMouseOut );

        $( cornerWrapper ).css({'top': y - $(workImageContainer).offset().top,'left': x - $(workImageContainer).offset().left});
        $( cornerWrapper ).appendTo(workImageContainer);
        let pattern = /(\d+)_small\.(png|jpg)/;
        if (pattern.test(src)) {
            let result = pattern.exec(src);
            let cardURL = 'yulan2.php?cardID=' + result[1];
            $($(cornerWrapper).children().last()).attr('data',cardURL);
        }

        cardArray.push( cornerWrapper );
    });
}

function delImgMouseOver( event ){
    event.target.src = "assets/icon/delete_over.png";
}

function delImgMouseOut( event ){
    event.target.src = "assets/icon/delete.png";
}

function colorImgMouseOver( event ){
    event.target.src = "assets/icon/color_over.png";
}

function colorImgMouseOut( event ){
    event.target.src = "assets/icon/color.png";
}

function toolImgMouseOver( event ){
    event.target.src = "assets/icon/tool_over.png";
}

function toolImgMouseOut( event ){
    event.target.src = "assets/icon/tool.png";
}

function commentImgMouseOver( event ){
    event.target.src = "assets/icon/comment_over.png";
}

function commentImgMouseOut( event ){
    event.target.src = "assets/icon/comment.png";
}

function delCorner(event){
    $($(event.target).parent()).remove();
}

function componentDown( event ){
    isMouseDown = true;

    cornerWrapper = $(event.target).parent();
    let str = $(event.target).prop("class");

    if( str.search("corner") > -1) {
        cornerDown( event );
    }else{
        let position = $(cornerWrapper).position();
        let offset = $(workImageContainer).offset();
        mouseX = event.pageX - position.left - offset.left;
        mouseY = event.pageY - position.top - offset.top -22;

        $(event.target).on("mousemove", componentMove);
        $(event.target).on("mouseup", componentUp);
        $(event.target).on("mouseleave", componentLeave);
        $(event.target).on("mouseenter", componentEnter);
    }
}

function componentLeave( event ){
    $(workImageContainer).on('mousemove', workImageMouseMove);
}

function componentEnter( event ){
    $(workImageContainer).off('mousemove', workImageMouseMove);
}

function componentMove(event){
    let position = $(cornerWrapper).position();    
    let width = $(workImageContainer).width();
    let height = $(workImageContainer).height();

    let left = event.pageX - workImagePosition.left > mouseX ? event.pageX - mouseX - workImagePosition.left : 0;
    let top = event.pageY - workImagePosition.top > mouseY  ? event.pageY - mouseY - workImagePosition.top -22 : -22;

    left = left > width - $(cornerWrapper).width() ? (width - $(cornerWrapper).width()) : left;
    top = top > height - $(cornerWrapper).width() ? (height - $(cornerWrapper).width()) : top;

    $( cornerWrapper ).css({'top': top,'left': left });
}

function componentUp( event ){
    isMouseDown = false;

    $(event.target).off("mousemove");
    $(event.target).off("mouseup");
    $(event.target).off("mouseleave");
    $(event.target).off("mouseenter");
    $(workImageContainer).off('mousemove', workImageMouseMove);

    cornerWrapper = null;
}

function handleScaleYU(){
    let bottom = $(cornerWrapper ).height() + $( cornerWrapper ).position().top;
    let top = event.pageY - workImagePosition.top - 20 ;

    $( cornerWrapper ).css({'top': top , 'height': bottom - top });
}

function handleScaleYD(){
    let top = $( cornerWrapper ).position().top ;
    let height = event.pageY - top - workImagePosition.top;

    $( cornerWrapper ).css({'height':  height});
}

function handleScaleXL(){
    let right = $( cornerWrapper ).width() + $( cornerWrapper ).position().left;
    let left = event.pageX - workImagePosition.left ;

    $( cornerWrapper ).css({'left': left, 'width': right - left});
}

function handleScaleXR(){
    let left = $( cornerWrapper ).position().left ;
    let width = event.pageX - left - workImagePosition.left;

    $( cornerWrapper ).css({'width':  width});
}

function cornerDown( event, x, y ){
    isMouseDown = true;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    cornerWrapper = $($(event.target).parent()).parent();
    preX = event.pageX;
    preY = event.pageY;

    if ( event.isTrigger || event.isTrusted) {
        preX = x;
        preY = y;
        isTrigged = true;
        
    }
    curObject = event.target;

    $(curObject).on("mousemove",cornerMove);
    $(curObject).on("mouseup",cornerUp);
    $(curObject).on("mouseleave",cornerLeave);
    $(curObject).on("mouseenter",cornerEnter);
}

function cornerEnter( event ){
    $(workImageContainer).off('mousemove', workImageMouseMove);
}

function cornerLeave( event ){
    $(workImageContainer).on('mousemove', workImageMouseMove);
}

function cornerMove(event){
    event.preventDefault();
    event.stopPropagation();

    if ( isTrigged ) {
        $($(event.target).parent()).css('width', '100%' );
        isTrigged = false;
        isMark = true;
    }

    curX = event.pageX;
    curY = event.pageY;
    let gapX = curX - preX;
    let gapY = curY - preY;

    if ( gapX == 0 || gapY == 0) {
        return ;
    }

    if ( curObject!= null && curObject.name.match("left") ) {
        if ( $(curObject).parent().width() == 0 && gapX > 0 ) {
            if (curObject.name == "top left") {
                curObject = $($(curObject).parent()).children()[2];
            }else if ( curObject.name == "bottom left"){
                curObject = $($(curObject).parent()).children()[7]
            }else{
                curObject = $($(curObject).parent()).children()[4];
            }
            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
            $(curObject).on("mouseleave",cornerLeave);
        }else{
            handleScaleXL(  );
        }
    }
    
    if( curObject!= null && curObject.name.match( "right" ) ){
        if ( $(curObject).parent().width() == 0 && gapX < 0) {
            if (curObject.name == "top right") {
                curObject = $($(curObject).parent()).children()[0];
            }else if ( curObject.name == "bottom right"){
                curObject = $($(curObject).parent()).children()[5];
            }else{
                curObject = $($(curObject).parent()).children()[3];
            }

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",  cornerUp);
            $(curObject).on("mouseleave",cornerLeave);
        }else{
            handleScaleXR( );
        }
    }

    if( curObject!= null && curObject.name.match("top")) {
        if ( $(curObject).parent().height() == 0 && gapY > 0) {
            if (curObject.name == "top left") {
                curObject = $($(curObject).parent()).children()[5];
            }else if ( curObject.name == "top right"){
                curObject = $($(curObject).parent()).children()[7];
            }else{
                curObject = $($(curObject).parent()).children()[6];
            }

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
            $(curObject).on("mouseleave",cornerLeave);
        }else{
            handleScaleYU();                    
        }
    }

    if( curObject!= null && curObject.name.match("bottom") ){
        if ( $(curObject).parent().height() == 0 && gapY < 0) {
            if (curObject.name == "bottom left") {
                curObject = $($(curObject).parent()).children()[0];
            }else if ( curObject.name == "bottom right"){
                curObject = $($(curObject).parent()).children()[2];
            }else{
                curObject = $($(curObject).parent()).children()[1];
            }

            $(curObject).on("mousemove",cornerMove);
            $(curObject).on("mouseup",cornerUp);
            $(curObject).on("mouseleave",cornerLeave);
        }else{
            handleScaleYD();
        }
    }

    preX = curX;
    preY = curY;
}

function cornerUp(event){
    // event.stopPropagation();

    isMouseDown = false;
    $(curObject).off("mousemove");
    $(curObject).off("mouseup");
    $(curObject).off("mouseleave");
    $(curObject).off("mouseenter");

    $(workImageContainer).off('mousemove', workImageMouseMove);    
    curObject = null;

    if ( isMark ) {
        isMark = false;
        $( markWrapper ).css({'top': 350,'left': 150});
        $( markWrapper ).css('visibility','visible');
        $( markWrapper ).css('display','block');
    }
}

function workImageMouseMove(event){
    if ( curObject != null) {
        cornerMove( event );
    }else if ( cornerWrapper != null ) {
        componentMove( event );
    }
}

function workImageMouseUp(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if ( curObject != null) {
        cornerUp( event );
    }
}

$('#webLink>button:nth-child(3)').on('click', webLinkSave);
$('#webLink>button:nth-child(4)').on('click', webLinkCancel);

function webLinkCancel(event){
    $($(event.target).parent()).css('display','none');
}

function webLinkSave(event){
    let str = $($(event.target).parent().children()[0]).children()[1];
    let src = $($(event.target).parent().children()[1]).children()[1];
    setWebLink($(src).prop('value'),$(str).prop('value'));
    $($(event.target).parent()).css('display','none');
}

function setWebLink(src,str){
    let link = $(whichLink).children().last();
    $(link).attr('href',src);
    $(link).html(str);
}

function showWebAgain(event){
    event.stopPropagation();
    if (event.target == this) {
        which = $(event.target).parent();
        whichLink = $(event.target).parent();
        $( webLink ).css('display','block');        
    }
}

function showWebColor(event){
    event.stopPropagation();
    if ( event.target == this ) {
        which = $(event.target).parent();
        let position = $(which).position();

        $(colorWrapper).css('left', position.left + 100 );
        $(colorWrapper).css('top',  position.top + 22 );
        $(colorWrapper).css('display','block');
        which = $(which).children()[3];
        if (which.tagName == "BR") {
            which = $(which).next();
        }
    }
}

function showMarkWrapper(event){
    $( markWrapper ).css({'top': 350,'left': 150});
    $( markWrapper ).css('visibility','visible');
    $( markWrapper ).css('display','block');
}

$('#markWrapper>button:nth-child(2)').click(function(event){
    let input = $($(event.target).prev()).prop('value');
    $($(whichLink).children().last()).html(input);
    $($(event.target).parent()).css('visibility','hidden');
});

$('#markWrapper>button:nth-child(3)').click(function(event){
    $($(event.target).parent()).css('visibility','hidden');
});

let comment = null;
let count = 1;
function toolClick(event){
    comment  = $(event.target).parent();
    $(sentenceSetPanel).css({'top': 100,'left':100 });
    $(sentenceSetPanel).css("display","block");
}

$('#cnCheckBox').on('click', cnCheck);
$('#borderCheckBox').on('click', borderCheck);
$('#pyCheckBox').on('click', pyCheck);
$('#transCheckBox').on('click', transCheck);

function cnCheck(event){
    let show = $(event.target).prop("checked");
    if ( show ) {
        $('.cnWrapper').css('display','block');
        count ++;
    }else{
        if( count == 1) {
            $(event).prop("checked","true");
            return;
        }else{
            $('.cnWrapper').css('display','none');
            count--;
        }
    }
}

function pyCheck(event){
    let show = $(event.target).prop("checked");
    if ( show ) {
        count++;
        $('.pyWrapper').css('display','block');
    }else{
        if( count == 1){
            $(event).prop("checked","true");
            return;
        }else{
            $('.pyWrapper').css('display','none');
            count--;
        }
    }
}

function transCheck(event){
    let show = $(event.target).prop("checked");
    if ( show ) {
        count++;
        $('.transWrapper').css('display','block');
    }else{
        if( count == 1) {
            $(event).prop("checked","true");
            return;
        }else{
            $('.transWrapper').css('display','none');
            count--;
        }
    }
}

function borderCheck(event){
    let show = $(event.target).prop("checked");
    if ( show ) {
        $($(comment).children()[4]).css("border","2px solid blue");
        // $($(comment).children()[5]).css("border-color","transparent blue");
    }else{
        $($(comment).children()[4]).css("border","0px solid blue");
        // $($(comment).children()[5]).css("border-color","transparent");
    }
}

$('#preview').click( function( event ){
    $('#return').fadeIn(1000);
    $('#toolbar').addClass('toolbarTransform90');
    hideWidget();
    $(workImageContainer).off('drop');
});

$('#return').click( function(event){
    $('#toolbar').addClass('toolbarTransform0');
    $(this).fadeOut(1000,function(){
        $('#toolbar').removeClass('toolbarTransform90');
        $('#toolbar').removeClass('toolbarTransform0');        
    });
    showWidget();
    $(workImageContainer).on('drop',workImageContainerDrop);
});

function hideWidget(){
    hideLink();
    hideComment();
    hideCard();
    hideAudio();
    hideMark();
    hideNext();
    hideMedia();
    hideMask();
    hidePic();
}

function hideLink(){
    $.each( linkArray, function(index, item){
        let linkItem = $(item);
        $($(linkItem).children()[0]).fadeOut(1000);
        $($(linkItem).children()[1]).fadeOut(1000);
        $($(linkItem).children()[2]).fadeOut(1000);
        hideCorner( $(linkItem).children()[4] );

        $($( linkItem ).children()[4]).on('mouseenter', linkMouseIn);
        $($( linkItem ).children()[4]).on('mouseleave', linkMouseOut);
        $($( linkItem ).children()[4]).on('click', gotoWebsite);
        
        $(linkItem).off('mousemove',workImageMouseMove);
        $(linkItem).off('mouseenter',workImageMouseMove);
    });
}

function gotoWebsite(e){
    if (e.currentTarget != e.target) {
        return ;
    }
    window.open($(e.target).next().prop('href'));
}

function linkMouseIn(e){
    $(e.target).next().css('visibility','visible');
}

function linkMouseOut(e){
    $(e.target).next().css('visibility','hidden');
}

function hideComment(){
    $.each( commentArray, function(index, item){
        let commentItem = $(item);
        $($(commentItem).children()[0]).fadeOut(1000);
        $($(commentItem).children()[1]).fadeOut(1000);
        $($(commentItem).children()[2]).fadeOut(1000);
        $($(commentItem).children()[5]).off('mousedown');
        $($(commentItem).children()[6]).off('mousedown');

        $($(commentItem).children()[4]).children().each(function(){
            $(this).addClass('no_select');
        });
        let comment = $(commentItem).children()[4];
        $($(comment).children()[0]).removeAttr('contenteditable');
        $($(comment).children()[1]).removeAttr('contenteditable');
        $($(comment).children()[2]).removeAttr('contenteditable');
    });
}

function hideCard(){
    $.each( cardArray, function(index, item){
        let cardItem = $(item);
        $($(cardItem).children()[0]).fadeOut(1000);
        $($(cardItem).children()[1]).fadeOut(1000);
        $($(cardItem).children()[3]).on('click', cardClick);

        hideCorner( $(cardItem).children()[3] );
    });
}

function cardClick(e){
    let url = $($(e.target).next()).attr('data');
    url =  window.location.host +'/'+url;
    window.open(url);
    console.log(url);
}

function hideAudio(){
    $.each( audioArray, function(index, item){
        let audioItem = $(item);
        $($(audioItem).children()[0]).fadeOut(1000);
        $($(audioItem).children()[2]).off('mousedown');
    });
}

function hideMark(){
    $.each( markArray, function(index, item){
        let markItem = $(item);
        $($(markItem).children()[0]).fadeOut(1000);
        $($(markItem).children()[1]).fadeOut(1000);
        $($(markItem).children()[2]).fadeOut(1000);
        hideCorner( $(markItem).children()[4] );

        $($( markItem ).children()[4]).on('click', showMarkedInfo);
    });
}

function hideNext(){
    $.each( nextArray, function(index, item){
        let nextItem = $(item);
        $($(nextItem).children()[0]).fadeOut(1000);
        $($(nextItem).children()[1]).fadeOut(1000);
        hideCorner( $(nextItem).children()[3] );
    });
}

function hideMedia(){
    $.each( mediaArray, function(index, item){
        let mediaItem = $(item);
        $($(mediaItem).children()[0]).fadeOut(1000);
        $($(mediaItem).children()[1]).fadeOut(1000);
        $($(mediaItem).children()[2]).fadeOut(1000);
        $($(mediaItem).children()[3]).fadeOut(1000);
        hideCorner( $(mediaItem).children()[5] );
    });
}

function hideMask(){
    $.each( maskArray, function(index, item){
        let maskItem = $(item);
        $($(maskItem).children()[0]).fadeOut(1000);
        $($(maskItem).children()[1]).fadeOut(1000);
        hideCorner( $(maskItem).children()[3] );

        $($( maskItem ).children()[3]).on('click', hideMaskArea);
    });
}

function hideMaskArea(event){
    if (event.currentTarget != event.target) {
        return ;
    }
    $(this).css('display','none');
}

function hidePic(){
    $.each( picArray, function(index, item){
        let picItem = $(item);
        $($(picItem).children()[0]).fadeOut(1000);
        hideCorner( $(picItem).children()[2] );
    });
}

function showMarkedInfo(event){
    if (e.currentTarget != e.target) {
        return ;
    }
    let width = $($(event.target).parent()).width();
    if ( isShowingInfo ) {
        $($(event.target).next()).animate({
            left:width,
        },1000);
    }else{
        $($(event.target).next()).animate({
            left:0,
        },1000);
    }
    isShowingInfo = !isShowingInfo;
}

function showWidget(){
    showLink();
    showComment();
    showCard();
    showAudio();
    showMark();
    showNext();
    showMedia();
    showMask();
    showPic();
}

function showLink(){
    $.each( linkArray, function(index, item){
        let linkItem = $(item);
        $($(linkItem).children()[0]).fadeIn(1000);
        $($(linkItem).children()[1]).fadeIn(1000);
        $($(linkItem).children()[2]).fadeIn(1000);
        showCorner( $(linkItem).children()[4] );

        $($( linkItem ).children()[4]).off('mouseenter', linkMouseIn);
        $($( linkItem ).children()[4]).off('mouseleave', linkMouseOut);
        $($( linkItem ).children()[4]).off('click', gotoWebsite);

        $(linkItem).on('mousemove',workImageMouseMove);
    });
}

function showComment(){
    $.each( commentArray, function(index, item){
        let commentItem = $(item);
        $($(commentItem).children()[0]).fadeIn(1000);
        $($(commentItem).children()[1]).fadeIn(1000);
        $($(commentItem).children()[2]).fadeIn(1000);
        $($(commentItem).children()[5]).on('mousedown',componentDown);
        $($(commentItem).children()[6]).on('mousedown',componentDown);
        
        $($(commentItem).children()[4]).children().each(function(){
            $(this).removeClass('no_select');
        });
        let comment = $(commentItem).children()[4];
        $($(comment).children()[0]).attr('contenteditable','true');
        $($(comment).children()[1]).attr('contenteditable','true');
        $($(comment).children()[2]).attr('contenteditable','true');

    });    
}

function showCard(){
    $.each( cardArray, function(index, item){
        let cardItem = $(item);
        $($(cardItem).children()[0]).fadeIn(1000);
        $($(cardItem).children()[1]).fadeIn(1000);
        $($(cardItem).children()[3]).off('click', cardClick);

        showCorner( $(cardItem).children()[3] );
    });    
}

function showAudio(){
    $.each( audioArray, function(index, item){
        let audioItem = $(item);
        $($(audioItem).children()[0]).fadeIn(1000);
        $($(audioItem).children()[2]).on('mousedown',componentDown);
    });    
}

function showMark(){
    $.each( markArray, function(index, item){
        let markItem = $(item);
        $($(markItem).children()[0]).fadeIn(1000);
        $($(markItem).children()[1]).fadeIn(1000);
        $($(markItem).children()[2]).fadeIn(1000);
        showCorner( $(markItem).children()[4] );

        $($( markItem ).children()[4]).off('click', showMarkedInfo);
    });
}

function showNext(){
    $.each( nextArray, function(index, item){
        let nextItem = $(item);
        $($(nextItem).children()[0]).fadeIn(1000);
        $($(nextItem).children()[1]).fadeIn(1000);
        showCorner( $(nextItem).children()[3] );
    });
}

function showMedia(){
    $.each( mediaArray, function(index, item){
        let mediaItem = $(item);
        $($(mediaItem).children()[0]).fadeIn(1000);
        $($(mediaItem).children()[1]).fadeIn(1000);
        $($(mediaItem).children()[2]).fadeIn(1000);
        $($(mediaItem).children()[3]).fadeIn(1000);
        showCorner( $(mediaItem).children()[5] );
    });
}

function showMask(){
    $.each( maskArray, function(index, item){
        let maskItem = $(item);
        $($(maskItem).children()[0]).fadeIn(1000);
        $($(maskItem).children()[1]).fadeIn(1000);
        $($( maskItem ).children()[3]).fadeIn(1000);
        // $($( maskItem ).children()[3]).css('visibility','visible');
        showCorner( $(maskItem).children()[3] );

        $($( maskItem ).children()[3]).off('click', hideMaskArea);
    });
}

function showPic(){
    $.each( picArray, function(index, item){
        let picItem = $(item);
        $($(picItem).children()[0]).fadeIn(1000);
        showCorner( $(picItem).children()[2] );
    });
}

function hideCorner( element ){
    $(element).off('mousedown');
    $(element).children().each( function(event){
        $(this).fadeOut(1000);
    });
}

function showCorner( element ){
    $(element).on('mousedown',componentDown);
    $(element).children().each( function(event){
        $(this).fadeIn(1000);
    });
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
    html2canvas( $('#dialogWrapper'), {
        onrendered: function(canvas) {
            imageData = canvas.toDataURL("image/png");
            getSnapShot( dataURLtoBlob(imageData) );
        }
    });
});

function getSnapShot( blob ){
    $.ajax({
        url: "/inc/source.php?style=11",
        method: "POST",
        contentType:'application/octet-stream',
        processData:false,
        data: blob,
    }).done(function(data){
        let pattern = /[^\.]+\.(png|jpg)/g;
        let result = pattern.exec(data);
        let picPath = result[0];
        $('#preview').trigger('click');
        html2canvas( $('#workImageContainer'), {
            onrendered: function(canvas) {
                imageData = canvas.toDataURL("image/png");
                getFixedURL( dataURLtoBlob(imageData), picPath );
            }
        });        
    });
}

function getFixedURL(blob, snapshot){
    $.ajax({
        url: "/inc/source.php?style=11",
        method: "POST",
        contentType:'application/octet-stream',
        processData:false,
        data: blob,
    }).done(function(data){
        let pattern = /[^\.]+\.(png|jpg)/g;
        let result = pattern.exec(data);
        let picPath = result[0];
        uploadXML(snapshot, picPath);
    });
}

function uploadXML(snapshot, fixedURL){
    let cardNameValue = $("#cardsnametext").prop('value');
    let tagTxt = $("#tagstext").prop('value');
    let category1 = $("#Category1").prop('value');
    let ex = $("#EX").prop('value');
    let cardsid = $('#cardsid').prop('value');
    let saveStyle= 4;
    let TemplateID = 2;
    let userID = "temp222.28.84.1520160501232437279304";

    $.ajax({
        url: "/inc/source.php?style="+saveStyle+"&InstanceName="+cardNameValue+"&TemplateID="+TemplateID+"&CardsID="+cardsid+"&Tags="+tagTxt+"&userID="+userID+"&Category="+category+"&Category1="+category1+"&EX="+ex,
        method: "POST",
        contentType:'text/xml',
        processData:false,
        data: prepareXML( snapshot, fixedURL ),
    }).done(function(data){
        $('#namecheck').css('display','none');
        return2Template();
    });
}

function prepareXML(snapshot, fixedURL){
    let div = $('<div>');
    let dialog = $('<Dialog>',{
        snapshot:snapshot,
    }).appendTo(div);

    let img = $('<IMAGE>',{
        url:$('#workImageContainer>img').attr('src'),
        fixedURL:fixedURL,
    }).appendTo(dialog);

    let ui = $('<UI>',{
        id:'application',
    }).appendTo(dialog);

    $.each(commentArray, function(index, Sentence){
        let idStr = "Mr_"+ index;
        let offsetX = $(Sentence).css('left').replace('px','');
        let offsetY = $(Sentence).css('top').replace('px','');
        let component = $('<COMPONENT>',{
            type:'ui.Sentence',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        $('<PARAMETER>',{
            type:"String",
            name:'font',
            html:fontFamily,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"int",
            name:'fontSize',
            html: fontSize,
        }).appendTo(constructor);

        let pattern = /\d+/g;
        let red = parseInt(pattern.exec(cnColor));
        red = red*256*256;
        let green = parseInt(pattern.exec(cnColor));
        green = green * 256;
        let blue = parseInt(pattern.exec(cnColor));
        let bgColor = red + green + blue;
        $('<PARAMETER>',{
            type:"uint",
            name:'cnColor',
            html: bgColor,
        }).appendTo(constructor);

        pattern = /\d+/g;
        red = parseInt(pattern.exec(pyColor));
        red = red*256*256;
        green = parseInt(pattern.exec(pyColor));
        green = green * 256;
        blue = parseInt(pattern.exec(pyColor));
        bgColor = red + green + blue;
        $('<PARAMETER>',{
            type:"uint",
            name:'pyColor',
            html: bgColor,
        }).appendTo(constructor);

        pattern = /\d+/g;
        red = parseInt(pattern.exec(transColor));
        red = red*256*256;
        green = parseInt(pattern.exec(transColor));
        green = green * 256;
        blue = parseInt(pattern.exec(transColor));
        bgColor = red + green + blue;
        $('<PARAMETER>',{
            type:"uint",
            name:'transColor',
            html: bgColor,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:'sentenceStyle',
            html: $($(Sentence).children()[4]).css('class'),
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:'chinese',
            html: $($($(Sentence).children()[4]).children()[1]).html(),
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:'pinyin',
            html: $($($(Sentence).children()[4]).children()[0]).html(),
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:'translation',
            html: $($($(Sentence).children()[4]).children()[2]).html(),
        }).appendTo(constructor);
    });

    let len = commentArray.length;
    $.each(linkArray, function(index, weblink){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(weblink).css('left').replace('px','');
        let offsetY = $(weblink).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.WebLink',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);
        $('<PARAMETER>',{
            type:"Number",
            name:"scale",
            html:1,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"Number",
            name:"originalWidth",
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"Number",
            name:"originalHeight",
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:"description",
            html:$($(weblink).children().last()).html(),
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:"String",
            name:"linkURL",
            html:$($(weblink).children().last()).attr('href'),
        }).appendTo(constructor);

        let mask = $(weblink).children()[4];
        let maskColor = $(mask).css('background-color');
        let pattern = /\d+/g;
        let red = parseInt(pattern.exec(maskColor));
        red = red*256*256;
        let green = parseInt(pattern.exec(maskColor));
        green = green * 256;
        let blue = parseInt(pattern.exec(maskColor));
        bgColor = red + green + blue;
        $('<PARAMETER>',{
            type:"uint",
            name:"maskColor",
            html:maskColor,
        }).appendTo(constructor);
    });

    len += linkArray.length;
    $.each(audioArray, function(index, audio){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(audio).css('left').replace('px','');
        let offsetY = $(audio).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.Audio',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        let src = $($(audio).children()[3]).attr('src');
        $('<PARAMETER>',{
            type:'String',
            name:'audioURL',
            html: src,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'String',
            name:'iconSize',
            html:"big",
        }).appendTo(constructor);
    });

    len += audioArray.length;
    $.each(cardArray, function(index, card){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(card).css('left').replace('px','');
        let offsetY = $(card).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.Card',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);
        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        $('<PARAMETER>',{
            type:'Number',
            name:'scale',
            html:1,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalWidth',
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalHeight',
            html:180,
        }).appendTo(constructor);

        let last = $(card).children().last();
        $('<PARAMETER>',{
            type:"Number",
            name:'linkURL',
            html:$(last).html(),
        }).appendTo(constructor);

        let maskColor = $($(last).prev()).css('background-color');
        $('<PARAMETER>',{
            type:"uint",
            name:'maskColor',
            html:maskColor,
        }).appendTo(constructor);
    });

    len += cardArray.length;
    $.each(maskArray, function(index, mask){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(mask).css('left').replace('px','');
        let offsetY = $(mask).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.Mask',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        let src = $($(audio).children()[3]).attr('src');
        $('<PARAMETER>',{
            type:'Number',
            name:'scale',
            html: 1,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalWidth',
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalHeight',
            html:180,
        }).appendTo(constructor);
    });

    len += maskArray.length;
    $.each(markArray, function(index, mark){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(mark).css('left').replace('px','');
        let offsetY = $(mark).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.Mark',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        let detail = $($(mark).children().last()).html();
        $('<PARAMETER>',{
            type:'Number',
            name:'scale',
            html: 1,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalWidth',
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalHeight',
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'String',
            name:'detail',
            html:detail,
        }).appendTo(constructor);
    });

    len += markArray.length;
    $.each(picArray, function(index, pic){
        let idStr = "Mr_"+ index + len;
        let offsetX = $(pic).css('left').replace('px','');
        let offsetY = $(pic).css('top').replace('px','');

        let component = $('<COMPONENT>',{
            type:'ui.Mark',
            id:idStr,
            x:offsetX,
            y:offsetY,
        }).appendTo(ui);

        let constructor = $('<CONSTRUCTOR>').appendTo(component);

        let picPath = $($(mark).children().last()).css('background-color');
        $('<PARAMETER>',{
            type:'Number',
            name:'scale',
            html: 1,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalWidth',
            html:180,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'Number',
            name:'originalHeight',
            html:135,
        }).appendTo(constructor);

        $('<PARAMETER>',{
            type:'String',
            name:'picSource',
            html: picPath,
        }).appendTo(constructor);
    });
    return $(div).html();
}

$('input[type="radio"]').click(function(){
    category = $(this).prop('value');
});