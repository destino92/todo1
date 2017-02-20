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
          'completed': false,
          'beingEdited': false
        },
        {
          'id': 2,
          'content': 'do something else',
          'completed': false,
          'beingEdited': false
        }
      ],
      listContent: '',
      editedContent: ''
    }

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.setPreviousId = this.setPreviousId.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.toggleEditView = this.toggleEditView.bind(this);
    this.renderItemOrEditField = this.renderItemOrEditField.bind(this);
    this.updateItem = this.updateItem.bind(this);
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
      completed: false,
      beingEdited: false
    }

    this.setState(previousState => ({
        todoList: [...previousState.todoList, item],
        listContent: ''
      })
    );
  }

  onSearchChange(event) {
    this.setState({ listContent: event.target.value });
  }

  onEditChange(event) {
    this.setState({ editedContent: event.target.value });
  }

  toggleCompletion(i) {
    let todoList = this.state.todoList;
    todoList[i].completed = !todoList[i].completed;

    this.setState({
      todoList: todoList
    });
  }

  toggleEditView(i) {
    let todoList = this.state.todoList;
    todoList[i].beingEdited = !todoList[i].beingEdited;

    this.setState({
      todoList: todoList
    });
  }

  updateItem(event, item, i) {
    event.preventDefault();
    let todoList = this.state.todoList;
    todoList[i].content = this.state.editedContent;
    todoList[i].beingEdited = false;

    this.setState({
      todoList: todoList,
      editedContent: ''
    });
  }

  renderItemOrEditField(item, i){
    if ( item.beingEdited ) {
      return(
        <li key={item.id}>
          <form onSubmit={(event) => this.updateItem(event,item,i)}>
            <input type="text" value={this.state.editedContent} onChange={this.onEditChange}/>
            <button type="submit">Update</button>
          </form>
        </li>
      );
    } else {
      return (
        <li key={item.id}>
          {item.content}
          <button onClick={() => this.toggleEditView(i)}>Edit</button>|
          <button onClick={() => this.toggleCompletion(i)}>
            {item.completed ? 'completed' : 'incomplete' }
          </button> |
          <button onClick={ () => this.removeItem(item.id)}>
            x
          </button>
       </li>
      );
    }
  }

  render() {
    const {
      todoList,
      listContent,
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
            this.renderItemOrEditField( item, i )
          )}
        </ul>
      </div>
    );
  }
}

export default App;
