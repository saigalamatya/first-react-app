'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AddOption = require('./components/AddOption');

var _AddOption2 = _interopRequireDefault(_AddOption);

var _Options = require('./components/Options');

var _Options2 = _interopRequireDefault(_Options);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Action = require('./components/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp(props) {
		_classCallCheck(this, IndecisionApp);

		var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

		_this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
		_this.handlePick = _this.handlePick.bind(_this);
		_this.handleAddOption = _this.handleAddOption.bind(_this);
		_this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
		_this.state = {
			options: []
		};
		return _this;
	}

	_createClass(IndecisionApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			try {
				var json = localStorage.getItem('options');
				var options = JSON.parse(json);

				if (options) {
					this.setState(function () {
						return { options: options };
					});
				}
			} catch (e) {
				// Do nothing at null
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.options.length !== this.state.options.length) {
				var json = JSON.stringify(this.state.options);
				localStorage.setItem('options', json);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			console.log('componentWillUnmount');
		}
	}, {
		key: 'handleDeleteOptions',
		value: function handleDeleteOptions() {
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: 'handleDeleteOption',
		value: function handleDeleteOption(optionToRemove) {
			this.setState(function (prevState) {
				return {
					options: prevState.options.filter(function (option) {
						return optionToRemove !== option;
					})
				};
			});
		}
	}, {
		key: 'handlePick',
		value: function handlePick() {
			var _this2 = this;

			this.setState(function () {
				var randomNum = _this2.state.options[Math.floor(Math.random() * _this2.state.options.length)];
				alert(randomNum);
			});
		}
	}, {
		key: 'handleAddOption',
		value: function handleAddOption(option) {
			if (!option) {
				return 'Enter valid value to add item!';
			} else if (this.state.options.indexOf(option) > -1) {
				return 'This option already exists!';
			}

			this.setState(function (prevState) {
				return { options: prevState.options.concat([option]) };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var subtitle = 'Put your life in the hands of a computer';

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_Header2.default, {
					subtitle: subtitle }),
				_react2.default.createElement(_Action2.default, {
					hasOptions: this.state.options.length > 0,
					hasHandlePick: this.handlePick }),
				_react2.default.createElement(_Options2.default, {
					options: this.state.options,
					handleDeleteOptions: this.handleDeleteOptions,
					handleDeleteOption: this.handleDeleteOption
				}),
				_react2.default.createElement(_AddOption2.default, {
					handleAddOption: this.handleAddOption
				})
			);
		}
	}]);

	return IndecisionApp;
}(_react2.default.Component);

// const User = (props) => {
// 	return (
// 		<div>
// 			<p>Name: { props.name }</p>
// 			<p>Age: { props.age } </p>
// 		</div>
// 	);
// };

_reactDom2.default.render(_react2.default.createElement(IndecisionApp, null), document.getElementById('app'));
