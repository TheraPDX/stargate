var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
// var mic = require('mic');
//
// var micInstance = mic({
// 	'rate': '16000',
// 	'channels': '1',
// 	'debug': false,
// 	'exitOnSilence': 6
// });
//
// var micInputStream = micInstance.getAudioStream();
// micInstance.start();

export default [
	{
		'url': '/video/cam',
		'type': 'get',
		'dep': ['webcamRunning', 'io'],
		'call': function(...args){
			if(!this.webcamRunning){
				args[1].status(404);
				args[1].end();
			}
			else{

				// micInputStream.on('data', (data) => {
				// 	this.io.emit('audio', data);
				// });

				return new MjpegProxy('http://localhost:8081').proxyRequest(...args);
			}
		}
	},
	// {
	// 	'url': '/video/audio',
	// 	'type': 'get',
	// 	'call': function(req, res){
	// 		micInputStream.pipe(res);
	// 	}
	// },
];