import React from 'react';


class DisplayControl extends React.Component {

	constructor(props) {
		super(props);
		this.render = this.render.bind(this);
	}


	change_channel(click) {

		// Get the data-id of the clicked channel
		var channel = click.currentTarget.getAttribute("data-id");

		// Use parent function to update channel state
		this.props.change_channel(channel);

	}

	render() {

		if ( typeof(this.props.current_channel) !== undefined ) {

			return (
				<section className="">
					<p>
						Currently showing songlist. <span onClick={this.toggle_display}>Show channels</span>
					</p>
				</section>
				);
		}

	} // render

}

export default DisplayControl;
