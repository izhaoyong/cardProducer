    'use strict';
    function delImgMouseOver( event ){
        event.src = "assets/icon/delete_over.png";
    }

    function delImgMouseOut( event ){
        event.src = "assets/icon/delete.png";
    }

    function colorImgMouseOver( event ){
        event.src = "assets/icon/color_over.png";
    }

    function colorImgMouseOut( event ){
        event.src = "assets/icon/color.png";
    }

    function toolImgMouseOver( event ){
        event.src = "assets/icon/tool_over.png";
    }

    function toolImgMouseOut( event ){
        event.src = "assets/icon/tool.png";
    }

    function commentImgMouseOver( event ){
        event.src = "assets/icon/comment_over.png";
    }

    function commentImgMouseOut( event ){
        event.src = "assets/icon/comment.png";
    }

    function delCorner(){
        $($(event.target).parent()).remove();
    }
    
    function webLinkCancel(){
        $($(event.target).parent()).css('display','none');
    }

    function webLinkSave(){
        $($(event.target).parent()).css('display','none');
    }

    function showWebAgain(){
        $('#webLink').css('display','block');
    }

    function showWebColor(){
        which = $(event.target).parent();
        let position = $(which).position();

        $('#colorWrapper').css('left', position.left + 100 );
        $('#colorWrapper').css('top',  position.top + 22 );
        $('#colorWrapper').css('display','block');
        which = $(which).children()[3];
    }

    let comment = null;
    let count = 1;

    function toolClick(){
        comment  = $(event.target).parent();
        $("#sentenceSetPanel").css({'top': 100,'left':100 });
        $("#sentenceSetPanel").css("display","block");
    }

    function borderCheck(event){
        let show = $(event).prop("checked");
        if ( show ) {
            $($(comment).children()[4]).css("border","2px solid blue");
            $($($(comment).children()[4]).children()[3]).css("border-color","transparent blue");
        }else{
            $($(comment).children()[4]).css("border","0px solid blue");
            $($($(comment).children()[4]).children()[3]).css("border-color","transparent");
        }
    }