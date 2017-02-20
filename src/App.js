import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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

  render() {
    const {
      todoList,
      listContent,
      editedContent
    } = this.state;

    return (
      <MuiThemeProvider>
        <div className="App">
            <TodoInput addItem={this.addItem} listContent={listContent}   onSearchChange={this.onSearchChange} />
            <ul>
              {todoList.map((item,i) =>
                <TodoItem
                  item={item}
                  index={i}
                  key={item.id}
                  updateItem={this.updateItem} editedContent={editedContent} onEditChange={this.onEditChange}
                  toggleEditView={this.toggleEditView}
                  toggleCompletion={this.toggleCompletion}
                  removeItem={this.removeItem}/>
              )}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}

const TodoItem = ({ item,
                    index,
                    updateItem,
                    editedContent,
                    onEditChange,
                    toggleEditView,
                    toggleCompletion,
                    removeItem
                  }) => {
  if ( item.beingEdited ) {
    return(
      <li>
        <form onSubmit={(event) => updateItem(event,item,index)}>
          <TextField id="text-field-controlled" type="text" value={editedContent} onChange={onEditChange}/>
          <FlatButton label="Update" primary={true} type="submit"/>
        </form>
      </li>
    );
  } else {
    return (
      <li>
        {item.content}
        <button onClick={() => toggleEditView(index)}>Edit</button>|
        <button onClick={() => toggleCompletion(index)}>
          {item.completed ? 'completed' : 'incomplete' }
        </button> |
        <button onClick={ () => removeItem(item.id)}>
          x
        </button>
     </li>
    );
  }
}

const TodoInput = ({addItem,
                    listContent,
                    onSearchChange}) =>
  <form onSubmit={addItem}>
    <TextField
      id="text-field-controlled"
      type="text"
      value={listContent}
      onChange={onSearchChange}
    />
    <button type="submit">
      SAVE
    </button>
  </form>

export default App;
