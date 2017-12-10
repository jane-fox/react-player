import React from 'react';
import './css/controls.css';





class Controls extends React.Component {

	render() {
		let button = null;
		let byline = "";

		// Decide whether to show pause or play button
		if (this.props.audio.paused) {
			button = <PlayButton play={this.props.play} />;
		} else {
			button = <PauseButton pause={this.props.pause} />;
		}

		// Make sure we have an artist before showing "by"
		if (this.props.current_song.artist) {
			byline = " - by " + this.props.current_song.artist;
		}


		return (
			<section>
				<h2 className="above-bar">Now Playing</h2>

				<div className="stripe">

					{button}

					<p className="current-song">
						{this.props.current_song.title}
						{byline}
					</p>

					<Volume audio={this.props.audio} />

				</div>

			</section>
		);
	}


} 


function PlayButton(props) {
	return (
		<button className="play-button" onClick={props.play}>
			<i className="mi mi-play-circle-outline"></i>
		</button>
	);
}

function PauseButton(props) {
	return (
		<button className="play-button" onClick={props.pause}>
			<i className="mi mi-pause-circle-outline"></i>
		</button>
	);	
}





class Volume extends React.Component {

	constructor(props) {
		super(props);


		this.state = {
			open: false,
		};
	}

	open() {
		this.setState({open: true});
	}

	close() {
		this.setState({open: false});
	}

	render() {
		let slider = null;
		let volume = this.props.audio.volume;
		//console.log(this.props.audio);
		//console.log(this.props.audio.volume);

		// Decide whether to show pause or play button
		if (!this.state.open) {
			slider = <VolumeSlider />;
		}



		return (
			<div className="open-volume">
				<div><i className="mi mi-volume-up"></i></div>
				{slider}
			</div>
		);
	}


} 


// Input to control value, with hint icons
function VolumeSlider() {
	return (
		<div className="volume-slider">
			<i className="mi mi-volume-up"></i>
			<input 
				defaultValue="1"
				type="range" 
				min="0" 
				max="1" 
				step=".01"
			/>
			<i className="mi mi-volume-down"></i>
		</div>
	);
}


export default Controls;


