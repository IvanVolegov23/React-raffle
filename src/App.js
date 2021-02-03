import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestant: '',
      contestants: [],
      winners: [],
    };
  }

  updateContestant = event => {
    this.setState({
      contestant: event.target.value,
    });
  };

  addContestant = contestant => {
    const lowCaseContestants = this.state.contestants.map(contestant => contestant.toLowerCase());

    if (contestant && !lowCaseContestants.includes(contestant.toLowerCase())) {
      const contestants = this.state.contestants.concat(contestant);
      this.setState({ contestants, contestant: '' });
    }
  };

  drawWinners = contestants => {
    const winners = shuffle(contestants).slice(0, 3);
    this.setState({ winners });
  };

  render() {
    const contestants = this.state.contestants.map(contestant =>
      <li key={contestant}>
        {contestant}
      </li>,
    );

    const winners = this.state.winners.map(winner =>
      <li key={winner} className="winner">
        {winner}
      </li>,
    );

    return (
      <div className="App">
        <h3>Welcome to the Long Island JavaScript Raffle!</h3>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.addContestant(this.state.contestant);
          }}
        >
          <input value={this.state.contestant} onChange={event => this.updateContestant(event)} />

          <button
            type="button"
            id="addBtn"
            onClick={() => this.addContestant(this.state.contestant)}
          >
            Add Contestant
          </button>
        </form>

        <ul>
          {contestants}
        </ul>
        <button id="drawBtn" onClick={() => this.drawWinners(this.state.contestants)}>
          Draw Winners
        </button>

        <ul>
          {winners}
        </ul>
      </div>
    );
  }
}

export default App;

/* 
 * Courtesy of the fisher-yates shuffle algorithm
 * https://www.frankmitchell.org/2015/01/fisher-yates/
 */
export function shuffle(arr) {
  const array = arr.slice();
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
