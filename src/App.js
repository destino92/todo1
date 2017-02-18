import React, { Component } from 'react';
import './App.css';

const TodoList = [
  {
    'id': 'list1',
    'content': 'do something really urgent'
  },
  {
    'id': 'list2',
    'content': 'do something else'
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          {TodoList.map(item =>
            <li key={item.id}>
              {item.content}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
