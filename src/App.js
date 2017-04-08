import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import Toggle from 'material-ui/Toggle';
import {red800, red500} from 'material-ui/styles/colors';
import { Grid, Col, Row } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    // App state
    this.state = {
      todoList: [],
      listContent: '',
      editedContent: '',
      leftItems: 0,
      isAllCompleted: false
    }

    // App component methods to be passed as props in child component
    this.onTextChange = this.onTextChange.bind(this);
    this.setPreviousId = this.setPreviousId.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggleEditView = this.toggleEditView.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.categorisedList = this.categorisedList.bind(this);
  }

  setPreviousId(){
    const { todoList } = this.state;
    return todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
  }

  // add a todo to todoList
  addItem(event){
    event.preventDefault();
    const { listContent, leftItems } = this.state;

    if(listContent === '') {
      return 1;
    }

    let item = {
      'id': this.setPreviousId() || 1,
      'content': listContent,
      completed: false,
      beingEdited: false
    }

    this.setState(previousState => ({
        todoList: [...previousState.todoList, item],
        listContent: '',
        leftItems: leftItems + 1
      })
    );
  }

  // toggle todo completion status
  toggleCompletion(item) {
    const { leftItems } = this.state;
    // used to verify that all items are completed or not
    let completionTruth;

    item.completed = !item.completed;

    let totalItemCompleted = item.completed ? leftItems - 1 : leftItems + 1;

    if(item.completed === false) {
      completionTruth = false;
    }

    this.setState({
      leftItems: totalItemCompleted,
      isAllCompleted: completionTruth
    });
  }

  // toggle a todo to a text field when double clicked
  toggleEditView(item,i) {
    let todoList = this.state.todoList;
    todoList[i].beingEdited = !todoList[i].beingEdited;

    this.setState({
      todoList: todoList,
      editedContent: item.content
    });
  }

  // method to update todo item
  updateItem(event, item, i) {
    event.preventDefault();

    let todoList = this.state.todoList;

    if(this.state.editedContent === ''){
      todoList[i].beingEdited = false;
      return 1;
    }

    todoList[i].content = this.state.editedContent;
    todoList[i].beingEdited = false;

    this.setState({
      todoList: todoList
    });
  }

  // Delete an item
  removeItem(id){
    let {leftItems} = this.state;

    var todoList = this.state.todoList.filter(item => item.id !== id);

    this.setState({
      todoList: todoList,
      leftItems: leftItems === 0 ? 0 : leftItems - 1
    });
  }

  // toggle all todos completion status
  toggleAll(){
    let { todoList, isAllCompleted } = this.state;

    if(isAllCompleted){
      todoList = todoList.map((todo) => {todo.completed = false; return todo;});
    } else {
      todoList = todoList.map((todo) => {todo.completed = true; return todo;});
    }

    isAllCompleted = !isAllCompleted;

    this.setState({
      todoList: todoList,
      isAllCompleted: isAllCompleted,
      leftItems: isAllCompleted ? 0 : todoList.length
    })
  }

  // Update todoList based on url params
  categorisedList(list, filterVal){
      if(filterVal === '#/completed') {
        return list.filter((todo) => todo.completed === true);
      } else if (filterVal === '#/active') {
        return list.filter((todo) => todo.completed === false);
      } else {
        return list;
      }
  }

  // Delete all completed items
  clearCompleted(){
    let { todoList, isAllCompleted, leftItems } = this.state;

    todoList = todoList.filter((todo) => todo.completed === false);

    this.setState({
      todoList: todoList,
      leftItems: isAllCompleted ? 0 : leftItems,
      isAllCompleted: false
    });
  }

  // controlled input method
  onTextChange(event) {
    this.setState({ listContent: event.target.value });
  }

  // controlled input method
  onEditChange(event) {
    this.setState({ editedContent: event.target.value });
  }

  render() {
    // use destructuring to declare state properties as variables
    const {
      todoList,
      listContent,
      editedContent,
      isAllCompleted,
      leftItems
    } = this.state;

    const {routeParamater} = this.props.location;

    const filteredList = this.categorisedList(todoList, routeParamater) || [];

    return (
      <MuiThemeProvider>
        <Grid className="App">
          <Row className="show-grid">
            <Col xs={12} md={6} mdOffset={3}>
              <Paper zDepth={1}>
                <Toggle disabled={ (leftItems === 0 && todoList.length === 0) ? true : false } onToggle={this.toggleAll} toggled={isAllCompleted}/>
                <TodoInput addItem={this.addItem} listContent={listContent}   onTextChange={this.onTextChange} />

                <List>
                  {filteredList.map((item,i) =>
                    <TodoItem
                      item={item}
                      index={i}
                      key={item.id}
                      updateItem={this.updateItem} editedContent={editedContent} onEditChange={this.onEditChange}
                      toggleEditView={this.toggleEditView}
                      toggleCompletion={this.toggleCompletion}
                      removeItem={this.removeItem}/>
                  )}
                </List>

                <footer>
                  {leftItems} items left
                  <FlatButton label="All" href="#/" />

                  <FlatButton label="Active" href="#/active" />

                  <FlatButton label="Completed" href="#/completed" />

                  <FlatButton label="Clear Completed" onClick={this.clearCompleted} />
                </footer>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

// input component
const TodoInput = ({addItem,
                    listContent,
                    onTextChange}) =>
    <form onSubmit={addItem}>
      <TextField
        id="text-field-controlled"
        type="text"
        value={listContent}
        onChange={onTextChange}
        multiLine={true}
        rows={1}
        rowsMax={4}
      />
      <FlatButton type="submit" label="SUBMIT" primary={true}/>
    </form>

// list item component
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
      <div>
        <ListItem>
            <form onSubmit={(event) => updateItem(event,item,index)}>
              <TextField id="text-field-controlled"
              name="inlineInput"
              type="text"
              value={editedContent}  onChange={onEditChange}
              multiLine={true}
              rows={1}
              rowsMax={4}
              onBlur={(event) => updateItem(event,item,index)}
              autoFocus
            />

              <FlatButton label="Update" primary={true} type="submit"/>
            </form>
        </ListItem>
        <Divider />
      </div>
    );
  } else {
    return (
      <div>
        <ListItem
          rightIcon={<IconButton
                    children={<IconDelete color={red500} hoverColor={red800} />}
                    onClick={ () => removeItem(item.id)} />}
        >
          <Checkbox style={{width:"10%"}} checked={item.completed} onClick={() => toggleCompletion(item, index)} />
          <div onDoubleClick={() =>toggleEditView(item, index)} className={item.completed ? 'completedTodo' : ''}>
            {item.content}
          </div>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default App;
