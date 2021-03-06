import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	};
	handleDeleteOptions = this.handleDeleteOptions;
	handlePick = this.handlePick;
	handleAddOption = this.handleAddOption;
	handleDeleteOption = this.handleDeleteOption;

	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
	}

	handleClearSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }));
	}

	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}

	handlePick = () => {
		this.setState(() => {
			const randomNum = this.state.options[Math.floor(Math.random() * this.state.options.length)];
			// alert(randomNum);
			// use setState ot set selectedOption
			this.setState({ 
				selectedOption: randomNum
			 })
		});
	}

	handleAddOption = (option) => {
		if (!option) {
			return 'Enter valid value to add item!';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists!';
		}

		this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
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

	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header
					subtitle={subtitle}
				/>
				<div className="container">
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
				<OptionModal 
					selectedOption = { this.state.selectedOption }
					handleClearSelectedOption = { this.handleClearSelectedOption }
				/>
			</div>
		);
	}
}