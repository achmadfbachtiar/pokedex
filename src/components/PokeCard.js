import React, { Component } from 'react';
import './PokeCard.css'
import pokeball from '../images/pokeball.png';

class PokeCard extends Component {
	render() {
		const { item, handleClick } = this.props
		return(
			<div className="card" onClick={handleClick}>
        <div className="card-top">
          <img className="card-img" src={pokeball} />
        </div>
        <div className="card-bottom">
          <h2 className="card-title">
          	{item.name.toUpperCase()}
          </h2>
        </div>
	    </div>
		)
	}
}

export default PokeCard;