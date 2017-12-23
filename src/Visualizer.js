import React from 'react';
import ReactDOM from 'react-dom';

import "./data.js";



class Visualizer extends React.Component {

	constructor(props) {
		super(props);

		var AudioContext = window.AudioContext || window.webkitAudioContext;

		var ctx = new AudioContext();

		var new_analyser = ctx.createAnalyser();
		new_analyser.fftsize = 256;

		var bufferLength = new_analyser.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);
		new_analyser.getByteTimeDomainData(dataArray);


    	var audioSource = ctx.createMediaElementSource(props.audio);
		audioSource.connect(new_analyser);
		audioSource.connect(ctx.destination);

		this.state = {
			analyser: new_analyser,
			bufferLength: bufferLength,
			dataArray: dataArray,
			width: window.innerWidth,
			height: 150
		};
			
		this.draw = this.draw.bind(this);
		this.size_player = this.size_player.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

	}

	// Runs after rendering
	componentDidMount() {

		var new_canvas = ReactDOM.findDOMNode(this.refs.canvas);

		this.setState({canvas: new_canvas});

		this.size_player();

		this.draw();

	}

	// Change size of canvas
	size_player() {


		var canvas = ReactDOM.findDOMNode(this.refs.canvas);

		if (canvas) {

			var container = ReactDOM.findDOMNode(this.refs.container);
			
			// Make the visualizer just a tiny bit shorter than container
			var new_width = parseInt(container.offsetWidth, 10);
			//console.log(new_width);

			canvas.height = 150;
			canvas.width = new_width;

			this.setState({
				height: 150,
				width: new_width
			})
		}


	} // size_player()


	// Draw visualizer
	draw() {

		var canvas = this.state.canvas;

		if (canvas) {
			
			var ctx = canvas.getContext("2d");

			//ctx.clearRect(0, 0, vis_width, vis_height);
			ctx.clearRect(0, 0, this.state.width, this.state.height);

			var barWidth = 1;
			if (this.state.bufferLength.length < this.state.width) {
				barWidth = 3;
			}
			//var barWidth = (10 / bufferLength) * 2.5;
			var barHeight;
			var x = 0;
			var spacing = 1;


			this.state.analyser.getByteFrequencyData(this.state.dataArray);



			for(var i = 0; i < this.state.bufferLength; i++) {
				barHeight = this.state.dataArray[i]/2 ;

				//ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
				ctx.fillStyle = '#6050f0';
				ctx.fillRect(x, 0, barWidth, barHeight );

				x += barWidth + spacing;
			}

		}

		requestAnimationFrame(this.draw);

	} // draw()

	render() {
		return (
			<div ref="container">
				<canvas ref="canvas"></canvas>
			</div>
		);
	}


}

export default Visualizer;
