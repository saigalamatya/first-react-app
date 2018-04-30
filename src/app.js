import React from 'react';
import ReactDOM from 'react-dom';

import AddOption from './components/AddOption';
import Options from './components/Options';
import Header from './components/Header';
import Action from './components/Action';

class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.state = {
			options: []
		};
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch(e) {
			// Do nothing at null
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}

	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}

	handlePick() {
		this.setState(() => {
			const randomNum = this.state.options[Math.floor(Math.random() * this.state.options.length)];
			alert(randomNum);
		});
	}

	handleAddOption(option) {
		if (!option) {
			return 'Enter valid value to add item!';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists!';
		}

		this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
	}

	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header
					subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					hasHandlePick={this.handlePick} />
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}

// const User = (props) => {
// 	return (
// 		<div>
// 			<p>Name: { props.name }</p>
// 			<p>Age: { props.age } </p>
// 		</div>
// 	);
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));