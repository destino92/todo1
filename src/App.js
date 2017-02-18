import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TodoList: [
        {
          'id': 1,
          'content': 'do something really urgent'
        },
        {
          'id': 2,
          'content': 'do something else'
        }
      ]
    }

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id){
    var TodoList = this.state.TodoList.filter(item => item.id !== id);

    this.setState({
      TodoList: TodoList
    });
  }

  render() {
    const {
      TodoList
    } = this.state;

    return (
      <div className="App">
        <ul>
          {TodoList.map(item =>
            <li key={item.id}>
              {item.content} | <button onClick={ () => this.removeItem(item.id)}>x</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
