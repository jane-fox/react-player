import React from "react";
import "./css/channels.css";

class CurrentChannel extends React.Component {
	constructor(props) {
		super(props);
		this.render = this.render.bind(this);
	}

	render() {
		if (typeof this.props.current_channel !== undefined) {
			return (
				<section className="current-channel">
					<h2 className="title">
						You're tuned in to {this.props.current_channel.title} on
						&nbsp;
						<a
							href="http://somafm.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							SomaFM
						</a>
					</h2>

					<p className="above-bar">Now Playing</p>
				</section>
			);
		}
	} // render
}

export default CurrentChannel;
