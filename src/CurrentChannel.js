import React from 'react';
import './css/channels.css';


class CurrentChannel extends React.Component {

	constructor(props) {
		super(props);
		this.render = this.render.bind(this);
	}


	render() {

		if ( typeof(this.props.current_channel) !== undefined ) {

			return (
				<section className="current-channel">

					<h3>You are currently tuned into</h3>

					<div className="">

						<img 
							src={this.props.current_channel.image}
							alt={this.props.current_channel.title}
						/>
						<h4>{this.props.current_channel.title}</h4>
						<p>{this.props.current_channel.description}</p>
						<p>{this.props.current_channel.genre}</p>
						<div className="clearfix"> </div>
					</div>

				</section>
				);
		}

	} // render

}

export default CurrentChannel;
