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
import {red800, red500} from 'material-ui/styles/colors';
import { Grid, Col, Row } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      listContent: '',
      editedContent: '',
      leftItems: 0,
      category: 'All'
    }

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.setPreviousId = this.setPreviousId.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.toggleEditView = this.toggleEditView.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.categoryList = this.categoryList.bind(this);
    this.updateCategoryfilter = this.updateCategoryfilter.bind(this);
  }

  categoryList(list, filterVal){
      if(filterVal === 'Completed') {
        return list.filter((todo) => todo.completed === true);
      } else if (filterVal === 'Active') {
        return list.filter((todo) => todo.completed === false);
      } else {
        return list;
      }
  }

  updateCategoryfilter(filterVal){
    this.setState({category: filterVal});
  }

  removeItem(id){
    var todoList = this.state.todoList.filter(item => item.id !== id);

    this.setState({
      todoList: todoList
    });
  }

  setPreviousId(){
    const { todoList } = this.state;

    return todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
  }

  addItem(event){
    event.preventDefault();
    const { listContent, leftItems } = this.state;


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

  onSearchChange(event) {
    this.setState({ listContent: event.target.value });
  }

  onEditChange(event) {
    this.setState({ editedContent: event.target.value });
  }

  toggleCompletion(item, i) {
    const {todoList, leftItems} = this.state;
    todoList[i].completed = !todoList[i].completed;
    let completed = todoList[i].completed ? leftItems - 1 : leftItems + 1;

    this.setState({
      todoList: todoList,
      editedContent: item.content,
      leftItems: completed
    });
  }

  toggleEditView(item,i) {
    let todoList = this.state.todoList;
    todoList[i].beingEdited = !todoList[i].beingEdited;

    this.setState({
      todoList: todoList,
      editedContent: item.content
    });
  }

  updateItem(event, item, i) {
    event.preventDefault();

    let todoList = this.state.todoList;
    todoList[i].content = this.state.editedContent;
    todoList[i].beingEdited = false;

    this.setState({
      todoList: todoList
    });
  }

  render() {
    const {
      todoList,
      listContent,
      editedContent,
      leftItems,
      category
    } = this.state;

    const filteredList = this.categoryList(todoList, category) || [];

    return (
      <MuiThemeProvider>
        <Grid className="App">

          <Row className="show-grid">
            <Col xs={12} md={6} mdOffset={3}>
              <Paper zDepth={1}>
                <TodoInput addItem={this.addItem} listContent={listContent}   onSearchChange={this.onSearchChange} />

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
                  <FlatButton label="All" onClick={() => this.updateCategoryfilter("All")}/>

                  <FlatButton label="Active" onClick={() => this.updateCategoryfilter("Active")}/>

                  <FlatButton label="Completed" onClick={() => this.updateCategoryfilter("Completed")}/>
                </footer>
              </Paper>
            </Col>
          </Row>
        </Grid>
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

const TodoInput = ({addItem,
                    listContent,
                    onSearchChange}) =>
  <form onSubmit={addItem}>
    <TextField
      id="text-field-controlled"
      type="text"
      value={listContent}
      onChange={onSearchChange}
      multiLine={true}
      rows={1}
      rowsMax={4}
    />
    <FlatButton type="submit" label="SUBMIT" primary={true}/>
  </form>

export default App;
