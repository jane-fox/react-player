import React from 'react';
import "./data.js";



class Visualizer extends React.Component {

	constructor(props) {
		super(props);

		this.draw = this.draw.bind(this);

	}

	// Change size of canvas
	size_player() {

		var vis_width = window.innerWidth;
		var vis_height = 100;

		/*
		audioSource = audioCtx.createMediaElementSource(audio);
		audioSource.connect(analyser);
		audioSource.connect(audioCtx.destination);

		*/
		var canvas = document.getElementById("visualizer");

		canvas.height = vis_height;
		canvas.width = vis_width;
	} // size_player()


	// Draw visualizer
	draw(props) {

		var canvas = document.getElementById("visualizer");
		var ctx = canvas.getContext("2d");
		var bufferLength, dataArray;

		//ctx.clearRect(0, 0, vis_width, vis_height);
		ctx.clearRect(0, 0, 200, 80);

		var analyser = props.audioCtx.createAnalyser();
		analyser.fftsize = 256;

		bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		analyser.getByteFrequencyData(dataArray);

		var barWidth = 1;
		//var barWidth = (10 / bufferLength) * 2.5;
		var barHeight;
		var x = 0;



		for(var i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i]/2;

			//ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
			ctx.fillStyle = '#FF5f00';
			ctx.fillRect(x, 0, barWidth, barHeight/2 );

			x += barWidth + 1;
		}

		requestAnimationFrame(this.draw);

	} // draw()

render() {
	return (
		<div>
			<canvas id="visualizer"></canvas>
		</div>
		);
}

	componentDidMount() {
		//this.draw();
	}

}

export default Visualizer;
