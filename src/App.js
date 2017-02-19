import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [
        {
          'id': 1,
          'content': 'do something really urgent',
          'completed': false
        },
        {
          'id': 2,
          'content': 'do something else',
          'completed': false
        }
      ],
      listContent: ''
    }

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setPreviousId = this.setPreviousId.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  removeItem(id){
    var todoList = this.state.todoList.filter(item => item.id !== id);

    this.setState({
      todoList: todoList
    });
  }

  setPreviousId(){
    const { todoList } = this.state;

    return todoList[todoList.length - 1].id + 1;
  }

  addItem(event){
    event.preventDefault();
    const { listContent } = this.state;


    let item = {
      'id': this.setPreviousId(),
      'content': listContent,
      completed: false
    }

    this.setState(previousState => ({
        todoList: [...previousState.todoList, item]
      })
    );
  }

  onSearchChange(event) {
    this.setState({ listContent: event.target.value });
  }

  toggleCompletion(i) {
    let todoList = this.state.todoList;
    todoList[i].completed = !todoList[i].completed;

    this.setState({
      todoList: todoList
    });
  }

  render() {
    const {
      todoList,
      listContent
    } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.addItem}>
          <input
            type="text"
            value={listContent}
            onChange={this.onSearchChange}
          />
          <button type="submit">
            SAVE
          </button>
        </form>
        <ul>
          {todoList.map((item,i) =>
            <li key={item.id}>
              {item.content} |
               <button onClick={() => this.toggleCompletion(i)}>
                 {item.completed ? 'completed' : 'incomplete' }
               </button> |
               <button onClick={ () => this.removeItem(item.id)}>
                 x
               </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
