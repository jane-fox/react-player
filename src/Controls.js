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

		this.toggle = this.toggle.bind(this);

	}

	// Open / Close the volume slider
	toggle() {

		if (this.state.open) {
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}

	}


	render() {
		let slider = null;
		let icon = null;
		let volume = this.props.audio.volume;
		let open_class = null;


		// Decide whether to show pause or play button
		if (this.state.open) {
			slider = <VolumeSlider />;
			open_class = "open";
		}


		if ( volume <= 0) {
			icon = <i className="mi mi-volume-off"></i>
		} else if ( volume >= 50 ) {
			icon = <i className="mi mi-volume-down"></i>
		} else {
			icon = <i className="mi mi-volume-up"></i>
		}


		return (
			<div className={"volume-container " + open_class}>
				<button onClick={this.toggle}>
					{icon}
				</button>
				
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


