import React from 'react';
import ReactDOM from 'react-dom';

import "./data.js";



class Visualizer extends React.Component {

	constructor(props) {
		super(props);



		var new_analyser = props.audioCtx.createAnalyser();
		new_analyser.fftsize = 256;

		var bufferLength = new_analyser.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);
		new_analyser.getByteTimeDomainData(dataArray);


    var audioSource = props.audioCtx.createMediaElementSource(props.audio);
		audioSource.connect(new_analyser);
		audioSource.connect(props.audioCtx.destination);

		this.state = {
			analyser: new_analyser,
			bufferLength: bufferLength,
			dataArray: dataArray
		};
			
		this.draw = this.draw.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

	}

	// Runs after rendering
	componentDidMount() {

		var new_canvas = ReactDOM.findDOMNode(this.refs.canvas);

		this.setState({canvas: new_canvas});

		this.draw();

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
	draw() {

		var canvas = this.state.canvas;

		if (canvas) {
			
			var ctx = canvas.getContext("2d");

			//ctx.clearRect(0, 0, vis_width, vis_height);
			ctx.clearRect(0, 0, 200, 80);

			var barWidth = 1;
			//var barWidth = (10 / bufferLength) * 2.5;
			var barHeight;
			var x = 0;


			this.state.analyser.getByteFrequencyData(this.state.dataArray);


			for(var i = 0; i < this.state.bufferLength; i++) {
				barHeight = this.state.dataArray[i]/2;

				//ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
				ctx.fillStyle = '#FF5f00';
				ctx.fillRect(x, 0, barWidth, barHeight );

				x += barWidth + 1;
			}

		}

		requestAnimationFrame(this.draw);

	} // draw()

	render() {
		return (
			<div>
				<canvas ref="canvas"></canvas>
			</div>
			);
	}



}

export default Visualizer;
