import React from 'react';
import './css/display-control.css';


class DisplayControl extends React.Component {

	constructor(props) {
		super(props);
		this.render = this.render.bind(this);
	}


	render() {

		var message = null;

		if ( this.props.display === "songs" ) {
			message = <p>
				Currently showing songlist. 
				<span className="toggle-link" onClick={this.props.toggle_display}>
					Show channels.
				</span>
			</p>
		} else {
			message = <p>
				Currently showing all channels. 
				<span className="toggle-link" onClick={this.props.toggle_display}>
					Show songs for current channel.
				</span>
			</p>
		}

		return (
			<section className="display-control">
				{message}
			</section>
		);

	} // render

}

export default DisplayControl;
