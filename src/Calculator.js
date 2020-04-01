import React from 'react';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: '',
      input1: null,
      operation: null,
      input2: null,
      result: null
    }
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleEqualsClick = this.handleEqualsClick.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.clear = this.clear.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if ((this.state.temp & this.state.temp !== prevState.temp) || 
    (this.state.input1 !== prevState.input1) || (this.state.result !== prevState.result)) {
      this.renderScreen();
    }
    if (this.state.input2 !== prevState.input2) {
      this.performOperation();
    }
  }

  handleDigitClick(e) {
    const clickValue = e.target.value;
    this.setState(prevState => ({
      temp: `${prevState.temp}${clickValue}`
    }));
  }

  handleOperationClick(e) {
    const input1 = this.state.temp;
    this.setState({
      temp: '',
      input1: input1,
      operation: e.target.value
    });
  }

  handleEqualsClick() {
    const input2 = this.state.temp;
    this.setState({
      temp: '',
      input2: input2
    });
  }

  performOperation() {
    const input1 = this.state.input1;
    const input2 = this.state.input2;
    const operation = this.state.operation;
    let result = null;
    if (operation === 'add') {
      result = input1 + input2;
    } else if (operation === 'subtract') {
      result = input1 - input2;
    } else if (operation === 'multiply') {
      result = input1 * input2;
    } else if (operation === 'divide') {
      result = input1 / input2;
    }
    this.setState({ result });
  }

  clear() {
    this.setState({
      temp: '',
      input1: null,
      operation: null,
      input2: null,
      result: null
    });
  }

  renderScreen() {
    if (this.state.result) {
      return this.state.result;
    } else if (this.state.temp) {
      return this.state.temp;
    } else if (this.state.input1) {
      return this.state.input1;
    }
      return 0;
  }
  
  render() {
    return (
      <div className='body'>
        <div className='container'>
          <div className='calculator'>
            <div className='screenContainer'><p className='screen'>
              {this.renderScreen()}</p>
            </div>
            <button className='clear button'
              onClick={this.clear}>
                clear
            </button>
            <button className='operation divide'
              value='divide'
              onClick={this.handleOperationClick}>
                /
            </button>
            <button className='digit seven'
              value='7'
              onClick={this.handleDigitClick}>
              7
            </button>
            <button className='digit eight'
              value='8'
              onClick={this.handleDigitClick}>
              8
            </button>
            <button className='digit nine'
              value='9'
              onClick={this.handleDigitClick}>
              9
            </button>
            <button className='operation multiply'
              value='multiply'
              onClick={this.handleOperationClick}>
                x
            </button>
            <button className='digit four'
              value='4'
              onClick={this.handleDigitClick}>
              4
            </button>
            <button className='digit five'
              value='5'
              onClick={this.handleDigitClick}>
              5
            </button>
            <button className='digit six'
              value='6'
              onClick={this.handleDigitClick}>
              6
            </button>
            <button className='operation subtract'
              value='subtract'
              onClick={this.handleOperationClick}>
                -
            </button>
            <button className='digit one'
              value='1'
              onClick={this.handleDigitClick}>
              1
            </button>
            <button className='digit two'
              value='2'
              onClick={this.handleDigitClick}>
              2
            </button>
            <button className='digit three'
              value='3'
              onClick={this.handleDigitClick}>
              3
            </button>
            <button className='operation add'
              value='add'
              onClick={this.handleOperationClick}>
                +
            </button>
            <button className='digit zero'
              value='0'
              onClick={this.handleDigitClick}>
              0
            </button>
            <button className='operation equals'
              value='='
              onClick={this.handleEqualsClick}>
                =
            </button>
          </div>
        </div>   
      </div>  
    );
  }
  
}

export default Calculator;
