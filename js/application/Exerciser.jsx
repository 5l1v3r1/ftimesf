import React from 'react';

import Paper from 'material-ui/Paper';

import { HexNum, HexNumField, digits } from './HexNum';

const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default class Exerciser extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        last: null,
        answer: '',
      },
      this.createExercise()
    );
  }

  createExercise() {
    const a = choice(digits);
    const b = choice(digits);

    return {
      a, b,
      operation: '×',
      result: a * b,
    }
  }

  onChange(event) {
    event.stopPropagation();

    this.setState({ answer: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const {
      a, b,
      operation,
      result,
      answer,
    } = this.state;

    const last = {
      a, b,
      operation,
      result,
      status: parseInt(answer, 16) === result ? 'correct' : 'incorrect',
    };

    this.setState(Object.assign(
      {
        last,
        answer: '',
      },
      this.createExercise()
    ));
  }

  render() {
    const {
      last,
      a, b,
      operation,
      answer,
    } = this.state;

    return (
      <div className="container">
        <h1>Multiplication Test</h1>
        {last && (
          <Paper
          key={`${last.a}-${last.b}-${last.operation}-${last.result}`}
          className={'answer ' + last.status}
            >
            <span className="exercise">
            <HexNum value={last.a} />
            <i className="operator">{last.operation}</i>
            <HexNum value={last.b} />
            <i className="operator">=</i>
            <HexNum value={last.result} />
            </span>
            </Paper>
        )}
        <h1 className="exercise">
          <form onSubmit={this.onSubmit.bind(this)}>
            <HexNum value={a} />
            <i className="operator">{operation}</i>
            <HexNum value={b} />
            <i className="operator">=</i>
            <HexNumField
              name="answer"
              className="shortinput"
              pattern={'^[0-9a-fA-F]{1,3}$'}
              value={answer}
              required
              onChange={this.onChange.bind(this)}
            />
          </form>
        </h1>
      </div>
    );
  }
}
