import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import pokedex from '../images/pokedex_logo.png';
import pokeball from '../images/pokeball.png';

import 'react-simple-flex-grid/lib/main.css';
import './Home.css'

class Home extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	generationList: [],
	  	pokemonList: [],
	  	pokemonDetail: {}
	  };
	}

	componentWillMount() {
		this.getGenerationList()
		this.getPokemonList()
	}

	async getGenerationList() {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/generation')
			const data = await response.json()
			this.setState({
				generationList: data.results
			})
		} catch(error) {
			console.log(error)
		}
	}

	async getPokemonList() {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=18')
			const data = await response.json()
			this.setState({
				pokemonList: data.results
			})
		} catch(error) {
			console.log(error)
		}
	}

	getPokemonDetail() {

	}

	render() {
		const { generationList, pokemonList } = this.state
		console.log('generationList', pokemonList)
		return(
			<div className="container">
				<div>
					<img src={pokedex} />
				</div>
				<Row>
					{generationList.map((item, index) => {
						return(
							<Col span={3}>
								<p>
									{item.name.toUpperCase()}
								</p>
							</Col>
						)
					})}
				</Row>
				<Row gutter={40}>
					{pokemonList.map((item, index) => {
						return(
							<Col span={2}>
						    {item.name.toUpperCase()}
							</Col>
						)
					})}
				</Row>
			</div>
		)
	}
}

export default Home;