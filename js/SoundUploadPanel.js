'use strict';
let isRecording = false;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext;
let stream , track;
let data = [];
let audioArray = [];
let index = 0;
let audioItemContainer = $('#SoundUploadPanel').children()[4];
let audioStream = null;
let mediaRecorder = null;
let hasUserData = false;

function init(){
	isRecording = false;
	AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext;
	stream , track;
	data = [];
	audioArray = [];
	index = 0;	
	audioStream = null;
}

// window.navigator = window.navigator || {};
navigator.getUserMedia = navigator.getUserMedia       ||
                      	 navigator.webkitGetUserMedia ||
                      	 navigator.mozGetUserMedia    ||
                      	 null;
if ( navigator.getUserMedia === null) {
	window.alert('Your browser does not support the navigator');
}

let createSrc = window.URL ? window.URL.createObjectURL : function(stream) {return stream;};
let audioContext = window.AudioContext 		 ||
				   window.webkitAudioContext ||
				   null;

if (audioContext === null) {
	window.alert('your browse does not support the audioContext');
}

$('button.soundUploadXButton').click( function(){
	$(audioItemContainer).empty();

	$('#mask').css('display','none');
	$("#SoundUploadPanel").css('visibility','hidden');	
});

$('div.recordControl').click( function( event ){
	if( isRecording ){
		isRecording = false;
		$(this).css('background-image','url(assets/mainIcon/start_record.png)') ;
		mediaRecorder.stop();
		console.log(mediaRecorder.state);
		// if ( track.enabled ) {
		// 	track.stop();
		// 	track.enabled = false;
		// 	saveWAV();
		// 	addAudioItem();
		// }
	}else{
		isRecording = true;
		$(this).css('background-image','url(assets/mainIcon/stop_record.png)') ;		
		if ( !hasUserData ) {
			navigator.getUserMedia({
				video: false,
				audio : true
			}, function(e){
				hasUserData = true;
				data = [];

	    		mediaRecorder = new MediaRecorder( e );
				mediaRecorder.ondataavailable = function(stream) {
					data.push( stream.data);
					// console.log( stream.data );
				}

				mediaRecorder.onstop = function(){
					let blob = new Blob(data,{'type':'audio/ogg; codecs=opus'});
					$('audio.recordSoundAudio').prop('src', URL.createObjectURL(blob) );
				}

				mediaRecorder.start();
				// track = e.getTracks()[0]; 
				
				// mediaRecorder.ondataavailable(); 
				// data = [];
				// // let p = 0;
				// track = e.getTracks()[0]; 
				// stream = context.createMediaStreamSource( e );
				// let recorder = context.createScriptProcessor(1024,1,1);
				// recorder.onaudioprocess = function(e){
				// 	if( isRecording ){
				//     	data.push( e.inputBuffer.getChannelData(0) );
				// 	}
				// };
				// stream.connect(recorder);
				// recorder.connect(context.destination);	
			}, function(error){
				console.log('audio capture error' + error.code );
			});
		}else{
			data = [];
			mediaRecorder.start();
		}
	}
});

function saveWAV(){
	let frequency = context.sampleRate; //采样频率
	let pointSize = 16; //采样点大小
	let channelNumber = 1; //声道数量
	let blockSize = channelNumber*pointSize/8; //采样块大小
	let wave = []; //数据
	for(let i=0; i<data.length; i++)
		for(let j=0; j<data[i].length; j++)	
			wave.push( data[i][j]*0x8000|0 );

	let length = wave.length*pointSize/8; //数据长度
	let buffer = new Uint8Array(length+44); //wav文件数据
	let view = new DataView(buffer.buffer); //数据视图
	buffer.set(new Uint8Array([0x52,0x49,0x46,0x46])); //"RIFF"
	view.setUint32(4,data.length+44,true); //总长度
	buffer.set(new Uint8Array([0x57,0x41,0x56,0x45]),8); //"WAVE"
	buffer.set(new Uint8Array([0x66,0x6D,0x74,0x20]),12); //"fmt "
	view.setUint32(16,16,true); //WAV头大小
	view.setUint16(20,1,true); //编码方式
	view.setUint16(22,1,true); //声道数量
	view.setUint32(24,frequency,true); //采样频率
	view.setUint32(28,frequency*blockSize,true); //每秒字节数
	view.setUint16(32,blockSize,true); //采样块大小
	view.setUint16(34,pointSize,true); //采样点大小
	buffer.set(new Uint8Array([0x64,0x61,0x74,0x61]),36); //"data"
	view.setUint32(40,length,true); //数据长度
	buffer.set(new Uint8Array(new Int16Array(wave).buffer),44); //数据
	//打开文件
	let blob = new Blob([buffer],{type:"audio/wav"});
	// open(URL.createObjectURL(blob));	
	// $('audio.recordSoundAudio').prop('src', URL.createObjectURL(blob) );
	audioArray.push( URL.createObjectURL(blob) );
}

function addAudioItem(){
	let template = $('#soundUploadItem');
	let content = $($($(template)[0].content).children()[0]).clone();
	$(content).prependTo( audioItemContainer );
	let audioName = $( $(content).children()[0]).children()[0];
	let audioTag = $( $(content).children()[2]).children()[0];
	let playButton = $(content).children()[1];
	$(audioName).focus( function(){
		$(this).prop('value','');
	});

	$(audioTag).focus( function(){
		$(this).prop('value','');
	});

	$(playButton).attr('index', index++);
	$(playButton).click(function(e){
		let i = $(this).attr('index');
		console.log(i);
		$('audio.recordSoundAudio').prop('src',  audioArray[i]);
	});
}

init();