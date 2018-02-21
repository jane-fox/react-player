import React from "react";
import "./css/controls.css";

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

					<Volume
						audio={this.props.audio}
						change_volume={this.props.change_volume}
					/>
				</div>
			</section>
		);
	}
}

function PlayButton(props) {
	return (
		<button className="play-button" onClick={props.play}>
			<i className="mi mi-play-circle-outline" />
		</button>
	);
}

function PauseButton(props) {
	return (
		<button className="play-button" onClick={props.pause}>
			<i className="mi mi-pause-circle-outline" />
		</button>
	);
}

class Volume extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

		this.toggle = this.toggle.bind(this);
		this.render = this.render.bind(this);
	}

	// Open / Close the volume slider
	toggle() {
		if (this.state.open) {
			this.setState({ open: false });
		} else {
			this.setState({ open: true });
		}
	}

	render() {
		let slider = null;
		let icon = null;
		let volume = this.props.audio.volume;
		let open_class = null;

		// Decide whether to show pause or play button
		if (this.state.open) {
			slider = (
				<VolumeSlider
					change={this.props.change_volume}
					audio={this.props.audio}
				/>
			);
			open_class = "open";
		}

		if (volume <= 0) {
			icon = <i className="mi mi-volume-off" />;
		} else if (volume <= 0.5) {
			icon = <i className="mi mi-volume-down" />;
		} else {
			icon = <i className="mi mi-volume-up" />;
		}

		return (
			<div className={"volume-container " + open_class}>
				<button onClick={this.toggle}>{icon}</button>

				{slider}
			</div>
		);
	}
}

// Input to control value, with hint icons
function VolumeSlider(props) {
	return (
		<div className="volume-slider">
			<i className="mi mi-volume-mute" />
			<input
				defaultValue={props.audio.volume}
				type="range"
				min="0"
				max="1"
				step=".01"
				onChange={props.change}
			/>
			<i className="mi mi-volume-up" />
		</div>
	);
}

export default Controls;
