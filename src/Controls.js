import React from 'react';
import './css/controls.css';





class Controls extends React.Component {

	render() {
		let button = null;

		if (this.props.audio.paused) {
			button = <PlayButton play={this.props.play} />;
		} else {
			button = <PauseButton pause={this.props.pause} />;
		}

		return (
			<section>
				<h2>Now Playing</h2>
				<div className="stripe">
					{button}
				</div>

			</section>
		);
	}


} 


function PlayButton(props) {
	return (
		<button className="control-button big" onClick={props.play}>
			<i className="mi mi-play-circle-outline"></i>
		</button>
	);
}

function PauseButton(props) {
	return (
		<button className="control-button big" onClick={props.pause}>
			<i className="mi mi-pause-circle-outline"></i>
		</button>
	);	
}

function NowPlaying(props) {
	return (
		<div>
			<div>{props.title}</div>
		</div>
	);
}



export default Controls;


