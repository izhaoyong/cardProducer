'use strcit';

function appendTemplateToScroller( e, template, previewContainer ){
	let content = $($($(template)[0].content).children()[0]).clone();
	let textarea = $( $(content).children()[1] ).children()[0];
	$(textarea).focus( function(e){
		e.target.textContent = "";
		console.log('textarea');
	});
	let scroller = $(content).children()[0];
	let image = new Image();
	image.src = e.target.result;
	let scale = 0;
	$(image).attr('draggable','false');
	if ( image.height / image.width > 0.75) {
		scale = dimension.width / image.width;
		$(image).css('width','100%') ;
		$(image).css('cursor','n-resize');
		pickMode = "x";
	}else if ( image.height / image.width < 0.75) {
		scale = dimension.height / image.height;
		$(image).css('height','100%') ;
		$(image).css('cursor','e-resize');
		pickMode = "y";
	}else{
		scale = dimension.height / image.height;
		$(image).css('height','100%') ;
	}

	$(scroller).mousedown( function(event){
		preX = event.clientX;
		preY = event.clientY;

		$(this).on('mousemove',scrollerMouseMove);
		$(this).on('mouseleave',scrollerMouseLeave);
		$(this).on('mouseup',scrollerMouseLeave);
	});

	$(image).appendTo( $(scroller) );
	$(previewContainer).append($(content).clone(true));
}

function scrollerMouseMove(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
	let gapX = mouseX - preX;
	let gapY = mouseY - preY;
	let position = $(e.target).position();
	if ( pickMode == "x") {
		if ( position.top + gapY > dimension.height - e.target.height  && position.top + gapY < 0) {
			$(e.target).css({'top':position.top + gapY});			
		}
	}else if (pickMode == "y") {
		if ( position.left + gapX > dimension.width - e.target.width  && position.left + gapX < 0) {
			$(e.target).css({'left': position.left + gapX });
		}
	}

	preY = mouseY;
	preX = mouseX;
}

function scrollerMouseLeave(e){
	$($(e.target).parent()).off('mousemove');
	$($(e.target).parent()).off('mouseleave');
}
