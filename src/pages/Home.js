import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import pokedex from '../images/pokedex_logo.png';
import PokeCard from '../components/PokeCard';
import PokemonDetail from '../components/PokemonDetail';
import Modal from 'react-modal';

import 'react-simple-flex-grid/lib/main.css';
import './Home.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Home extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	offset: 0,
	  	generationList: [],
	  	pokemonList: [],
	  	pokemonDetail: {},
	  	modalShown: false,
	  	activeIndex: null
	  };
	}

	componentWillMount() {
		this.getGenerationList()
		this.getPokemonList()
	}

	componentDidMount() {
	  document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
	  document.removeEventListener('scroll', this.trackScrolling);
	}

	isBottom(el) {
	  return el.getBoundingClientRect().bottom <= window.innerHeight;
	}

	trackScrolling = () => {
		const { offset } = this.state
		let newOffset = offset
		newOffset = newOffset + 18
	  const wrappedElement = document.getElementById('header');
	  if (this.isBottom(wrappedElement)) {
	  	this.setState({
	  		offset: newOffset
	  	}, () => {
	    	this.getPokemonList()
	  	})
	    // document.removeEventListener('scroll', this.trackScrolling);
	  }
	};

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
		const { offset, pokemonList } = this.state
		let pokemons = pokemonList
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=18`)
			const data = await response.json()
			pokemons = await pokemons.concat(data.results)
			this.setState({
				pokemonList: pokemons
			})
		} catch(error) {
			console.log(error)
		}
	}

	async getPokemonDetail(pokemonName) {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
			const data = await response.json()
			console.log('data', data)
			this.setState({
				pokemonDetail: data
			})
		} catch(error) {
			console.log(error)
		}
	}

	async getFilteredPokemonList(url, index) {
		this.setState({
			activeIndex: index
		})
		try {
			const response = await fetch(`${url}`)
			const data = await response.json()
			this.setState({
				pokemonList: data.pokemon_species
			})
			document.removeEventListener('scroll', this.trackScrolling);
		} catch(error) {
			console.log(error)
		}
	}

	showPokemonDetail(pokemonName) {
		this.setState({
			modalShown: true
		}, () => {
			this.getPokemonDetail(pokemonName)
		})
	}

	resetState() {
		this.setState({
			offset: 0,
	  	generationList: [],
	  	pokemonList: [],
	  	pokemonDetail: {},
	  	activeIndex: null
		}, () => {
			this.getGenerationList()
			this.getPokemonList()
			document.addEventListener('scroll', this.trackScrolling);
		})
	}

	render() {
		const { 
			generationList, 
			pokemonList, 
			pokemonDetail, 
			modalShown,
			activeIndex 
		} = this.state

		return(
			<div className="container" id="header">
				<div>
					<img src={pokedex} onClick={() => this.resetState()}/>
				</div>
				<Row gutter={10} justify="center">
					{generationList.map((item, index) => {
						return(
							<Col xs={12} sm={6} md={4} lg={3} xl={1} key={index}>
								<p onClick={() => this.getFilteredPokemonList(item.url, index)} className={`${index == activeIndex ? "active" : "inactive"}`}>
									{item.name.toUpperCase()}
								</p>
							</Col>
						)
					})}
				</Row>
				<Row gutter={40}>
					{pokemonList.map((item, index) => {
						return(
							<Col xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
								<PokeCard item={item} handleClick={() => this.showPokemonDetail(item.name)} />
							</Col>
						)
					})}
				</Row>
				<Modal isOpen={modalShown}>
					<PokemonDetail pokemonDetail={pokemonDetail} closeModal={() => this.setState({pokemonDetail: {}, modalShown: false})}/>
        </Modal>
			</div>
		)
	}
}

export default Home;