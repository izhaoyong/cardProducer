'use strict';

$(".cardItem").mouseenter( function( event ){
	$($(event.target).parent().children()[0]).addClass("hover");
	$($(event.target).parent().children()[1]).addClass("hover");
});

$(".cardItem").mouseleave( function( event ){
	$($(event.target).parent().children()[0]).removeClass("hover");
	$($(event.target).parent().children()[1]).removeClass("hover");
});

$(".cardItem").click( function( event ){
	item2hide();
	$(tipChooseLabel).css('visibility',"hidden");
	$($(event.target).parent()).css("visibility","visible");	
	let label = $($(event.target).parent()).children()[0];
	templateName = $(label).attr("value");
	cardName = "cardTemplate/" + templateName + ".txt";
	jsName = "js/" + templateName + ".js";
	$(loadingLabel).removeClass('hidden');

	let resoutceArr = state[$(label).attr("value")].split('_');
	filterResource();
	for( let index in resoutceArr){
		$($(resourceIconContainer).children()[resoutceArr[index]]).css('display','block');
	}
	$($(resourceVS).children()[resoutceArr[0]]).css('display','block');

	$.ajax({
		url: cardName,
	}).done(function( data ){
		$(templateContainer).html(data);
		$(loadingLabel).html('正在加载卡片模板...100%)');

		$.getScript( jsName ).done(function( script ){
			$(jsPTR).html(script);
			$(chooseArea).css("display","none");
			$(mask).css('display','none');
		}).fail( function(jqxhr){
			console.log(jqxhr.state);
		});
	});
});

function filterResource(){
	$(resourceIconContainer).children().each(function(){
		$(this).css('display','none');
	});

	$(resourceVS).children().each(function(){
		$(this).css('display','none');
	});
}

function item2hide(){
	$('.cardItem').each(function(){
		$(this).css('visibility','hidden');
	});
}

function item2show(){
	$('.cardItem').each(function(){
		$(this).css('visibility','visible');
	});
}