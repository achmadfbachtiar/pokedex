import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import './PokemonDetail.css'

class PokemonDetail extends Component {
	render() {
		const { pokemonDetail, closeModal } = this.props

		return(
			<div>
				<p className="close-card" onClick={closeModal}>
					CLOSE
				</p>
				<Row justify="center">
					<Col span={12} align="center">
						<img src={pokemonDetail.sprites && pokemonDetail.sprites.other.dream_world.front_default} className="pokemon-image"/>
					</Col>
					<Col span={12} align="center">
						<h2>
							{pokemonDetail.name && pokemonDetail.name.toUpperCase()}
						</h2>
					</Col>
					<Col span={12}>
						<Row gutter={20}>
							<Col span={4} align="center">
								<h4>
									BASE XP
									<br/>
									{pokemonDetail.base_experience && pokemonDetail.base_experience}
								</h4>
							</Col>
							<Col span={4} align="center">
								<h4>
									HEIGHT
									<br/>
									{pokemonDetail.height && pokemonDetail.height}
								</h4>
							</Col>
							<Col span={4} align="center">
								<h4>
									WEIGHT
									<br/>
									{pokemonDetail.weight && pokemonDetail.weight}
								</h4>
							</Col>
						</Row>
					</Col>
					<Col span={6}>
						<h2>
							STATS
						</h2>
						<Row gutter={20}>
							<Col span={3}>
								{pokemonDetail.stats && pokemonDetail.stats.map((item, index) => {
									return(
										<p>
											{item.stat.name.toUpperCase()}
										</p>
									)
								})}
							</Col>
							<Col span={9}>
								{pokemonDetail.stats && pokemonDetail.stats.map((item, index) => {
									return(
										<p>
											{item.base_stat}
										</p>
									)
								})}
							</Col>
						</Row>
					</Col>
					<Col span={6}>
						<h2>
							ABILITIES
						</h2>
						<Row gutter={20}>
							<Col span={3}>
								{pokemonDetail.abilities && pokemonDetail.abilities.map((item, index) => {
									return(
										<p>
											{item.ability.name.toUpperCase()}
										</p>
									)
								})}
							</Col>
						</Row>
					</Col>
					<Col span={12}>
						<h2>
							MOVES
						</h2>
						<Row gutter={20}>
							{pokemonDetail.moves && pokemonDetail.moves.map((item, index) => {
								return(
									<Col span={3} key={index}>
										<p>
											{item.move.name.toUpperCase()}
										</p>
									</Col>
								)
							})}
						</Row>
					</Col>
				</Row>
			</div>
		)
	}
}

export default PokemonDetail;