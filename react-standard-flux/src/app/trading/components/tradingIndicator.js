'use strict';

var React = require('react');

var TradingIndicator = React.createClass({

	propTypes: {
			spread: React.PropTypes.number.isRequired,
			movement: React.PropTypes.string.isRequired
	},
	
	render: function() {
		return (
			<td style={{width: '20%'}}>
				<table style={{height: '100%'}}>
					<tbody>
					<tr style={{height: '30%'}}>
						<td>
							{ this.props.movement === 'up' ? <div className="upArrow">up</div> : null }
						</td>
					</tr>
					<tr style={{height: '40%'}}>
						<td><span className="highlight" style={{fontSize: '16px', margin: '3px'}}>{this.props.spread}</span></td>
					</tr>
					<tr style={{height: '30%'}}>
						<td>
							{ this.props.movement === 'down' ? <div className="downArrow">down</div> : null }							
						</td>
					</tr>
                                                </tbody>
				</table>
			</td>
		);
	}
});

module.exports = TradingIndicator;