console.log("running");
var container = null, snapshot = null,
	disorderedContainer = null, savePanel = null,
	orderedContainer = null,
	tools = null,dialog = null,
	answer = "",type = 0, picPath,words,
	viewportH, viewportW, doc,
	rightContainer=null, wrongContainer = null,
	isSentence = false, imageData;

if (window.innerHeight)
	viewportH = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
	viewportH = document.body.clientHeight;	

if (window.innerWidth)
	viewportW = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
	viewportW = document.body.clientWidth;
	
var save = function (evt){			
	var nameCheck = dojo.byId("namecheck");
	nameCheck.style.zIndex = 99;
	console.log("saving");

	generate();
	domStyle.set(dojo.byId("namecheck"), "display", "block");
	domStyle.set(dojo.byId("namecheck"), "top", "100px");
}

var fabu = function (value){
	var cardNameValue = dojo.byId("cardsnametext").value;
	var tagTxt = dojo.byId("tagstext").value;
	var category = dojo.query('input[name="Category"]').filter('input[checked]')[0].value;
	var category1 = dojo.byId("Category1").value;
	var ex = dojo.byId("EX").value;
	cardsid = document.getElementById('cardsid').value;
	// uploadPic(imageData);

	// uploadXML(words);

	var blob = dataURLtoBlob(imageData);
	var xmlhttp;
	if ( window.XMLHttpRequest ){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
			picPath = xmlhttp.responseText+"";
			doc = document.implementation.createDocument(null, "paixuCard", null);
			doc.documentElement.setAttribute("snapshot", picPath);
			var segments = doc.createElement("segments");
			for (var i = 0; i < words.length; i++) {
				var segment = doc.createElement("segment");
				var data = doc.createTextNode(words[i]);
				segment.appendChild(data);
				segments.appendChild(segment);
			}

			doc.documentElement.appendChild( segments );
			var str = (new XMLSerializer()).serializeToString(doc);
			str = str.replace(/xmlns(\S+)/g,"");
			console.log(str);

            
            request.post("/inc/source.php?style=18&InstanceName="+cardNameValue+"&TemplateID=24&CardsID="+cardsid+"&Tags="+tagTxt+"&userID=3&Category="+category+"&Category1="+category1+"&EX="+ex, {
                data: {
                	xml:str,
                },
            }).then(function(text){
            	window.location.href='/cards/'+cardsid;
                console.log("The server returned: ", text);
            });


			console.log("loaded");

		}
	}
	xmlhttp.open("POST","/inc/source.php?style=11&InstanceName=ceshi&TemplateID=24&CardsID="+cardsid+"&Tags=1&userID=3&Category=3&Category1=2&EX=3");
	xmlhttp.setRequestHeader('Content-Type', 'application/upload');
	xmlhttp.send( blob );



    //cardsid = document.getElementById('cardsid').value;
    // request.post("/inc/source.php?style=18&InstanceName="+cardNameValue+"&TemplateID=24&CardsID="+cardsid+"&Tags="+tagTxt+"&userID=3&Category="+category+"&Category1="+category1+"&EX="+ex, {
    //     data: {
    //     	xml:str,
    //     },
    // }).then(function(text){
    //     console.log("The server returned: ", text);
    // });
									
	console.log("saved");
	domStyle.set(dojo.byId("namecheck"), "display", "none");
	domStyle.set(dojo.byId("namecheck"), "top", "0px");
	
}

function createSavePanel(){
	savePanel = new Dialog({
	 	title:"save Pane",
	});

	var firstSection = domConstruct.create("div",{

	},savePanel);

	addControl(savePanel);
	savePanel.show();

	console.log("done");
}

function addControl (savePanel) {
	var OK = domConstruct.create("button",{
		value:"OK",

	},savePanel);

	var cancel = domConstruct.create("button",{
		value:"Cancel"
	},savePanel);
}

function uploadXML(segmentsData){
	console.log(segmentsData);
	doc = document.implementation.createDocument(null, "paixuCard", null);
	doc.documentElement.setAttribute("snapshot", picPath);
	var segments = doc.createElement("segments");
	for (var i = 0; i < segmentsData.length; i++) {
		var segment = doc.createElement("segment");
		var data = doc.createTextNode(segmentsData[i]);
		segment.appendChild(data);
		segments.appendChild(segment);
	}

	doc.documentElement.appendChild( segments );
	console.log(doc);
}

function generate(){
	console.log("generating");
	answer = "";
	var str = dojo.byId("content").value.trim();
	var re = /\n+/;  
	words = str.split( re );
	if( words.length == 1 ){
		re = /\s+/;
		words = str.split( re );
		isSentence = true ; 
	}
	var len = words.length;
	for(var i=0; i<len; i++){
		answer += words[i] + ",#@";
	}
	var needArray = buildRandomSequence3( len );
	console.log( needArray );
	
	createDisorderedContainer( words, needArray, len);
	createOrderContainer();
	createTools();
	createContainer();
	createRight();
	createWrong();
	containerAddElement( disorderedContainer );
	containerAddElement( orderedContainer );
	containerAddElement( tools );
	
	var body = document.getElementById("myapp");
	domConstruct.place(container, body);

	html2canvas(container, {
		onrendered: function(canvas) {
			imageData = canvas.toDataURL("image/png");
			// domStyle.set(container, "display", "none");
			domConstruct.destroy(container);
		}
	});	

	console.log("generated");
}		

function getPicDataURL(container){
	html2canvas(container, {
		onrendered: function(canvas) {
			imageData = canvas.toDataURL("image/png");
		}
	});			
}

function uploadPic (imageData) {
	var blob = dataURLtoBlob(imageData);
	var xmlhttp;
	if ( window.XMLHttpRequest ){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ){
			picPath = xmlhttp.responseText+"";
			console.log("loaded");
		}
	}
	xmlhttp.open("POST","/inc/source.php?style=11&InstanceName=ceshi&TemplateID=24&CardsID="+cardsid+"&Tags=1&userID=3&Category=3&Category1=2&EX=3");
	xmlhttp.setRequestHeader('Content-Type', 'application/upload');
	xmlhttp.send( blob );
}

function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
	mime = arr[0].match(/:(.*?);/)[1],
	bstr = atob(arr[1]), 
	n = bstr.length, 
	u8arr = new Uint8Array(n);

	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type:mime});
}

function createRight(){
	var right = domConstruct.create("img",{
		src:"right.png"
	});

	var width =  right.width;
	
	rightContainer = domConstruct.create("div",{
		id:"rightContainer",
		class:"imgContainer",
		style:{
			display:"none",
			position:"fixed",
			top:"45%",
			left:"45%"
		}
	});
	
	domConstruct.place(right, rightContainer);
}

function createWrong(){
	wrongContainer = domConstruct.create("div",{
		id:"wrongContainer",
		class:"imgContainer",
		style:{
			display:"none",
			position:"fixed",
			top:"45%",
			left:"45%"
		}
	});
	
	domConstruct.create("img",{
		src:"wrong.png"
	},wrongContainer);
}

function createContainer(){
	container = domConstruct.create("div",{
		id:"picSnap",
		class:"picSnap",
		style:{
			position:"fixed",
			left:"0px",
			top:"0px",
			height:"636px",
			width:"700px",
			"z-index":-3,
			"background-color":"white",
			"border-radius":"30px 30px 30px 30px",
			"box-shadow":"2px 2px 5px gray",
		}
	});
}

function containerAddElement( ele ){
	domConstruct.place(ele, container);
}

function dialogAddElement( ele ) {
	dialog.set("content", container);
}

function createDialog(){
	dialog = new Dialog({
	 	title:"word sequence",
	 	id:"picDialog",
	 	visible:"visible",
	 	style:{
	 		top:"0px",
	 	}
	});
}

function createTools(){
	tools = domConstruct.create("div",{
		id:"tools",
		class:"tools",
		style:{
			height:"20%"
		},
	});
	
	domConstruct.create("button",{
		id:"check",
		innerHTML:"OK",
		style:{
			"margin-right":"12px"
		},
	},tools);
	
	domConstruct.create("button",{
		id:"reset",
		innerHTML:"Reset",
		style:{
			"margin-right":"12px",
		}
	},tools);			
	
	
	domConstruct.create("button",{
		id:"hidden",
		value:answer,
		innerHTML:type,
		style:{
			"margin-right":"12px",
			display:"none"
		}
	},tools);
	
	domConstruct.create("button",{
		id:"user",
		innerHTML:"User",
		style:{
			"margin-right":"12px",
			display:"none"
		}
	},tools);
}

function createOrderContainer(){
	orderedContainer  = domConstruct.create("div",{
		id:"order",
		class:"order",
		name:"container",
		style:{
			height:"40%",
			border:"1px solid red"
		}
	});
	
	domConstruct.create("p",{
		style:{
			display:"none"
		}
	},orderedContainer);
}

function  createDisorderedContainer( words,  needArray, len ){
	disorderedContainer  = domConstruct.create("div",{
		id:"disorder",
		class:"disorder",
		name:"container",
		style:{
			height:"40%",
		}
	});

	type = 0;
	createCandidates(words, disorderedContainer, len, needArray, "button");
}

function createCandidates(words, disorderedContainer, len, needArray, type){
	for(var i=0; i<len; i++){
		var sentence = domConstruct.create( type,{
			title:"0",
			value:"0",
			name:"candidate",
			style:{
				margin:"10px",
			},
			innerHTML:words[needArray[i]],
		});
		domConstruct.place(sentence, disorderedContainer);
	}			
}

function  buildRandomSequence3( length ){
    var  array = [];
    for (var  i = 0; i < length; i++) {
        array.push(i);
    }
    var  x = 0, tmp = 0;
    for (var  i = length-1;  i > 0;  i--) {
        x = parseInt((i + 1)*Math.random());
        tmp = array[i];
        array[i] = array[x];
        array[x] = tmp;
    }
    return array;
}

on(dojo.byId("OK"),"click",fabu);
on(dojo.byId("save"),"click",save);