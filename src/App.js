import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import { Grid, Col, Row } from 'react-bootstrap';
import {red800, red500} from 'material-ui/styles/colors';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [
        {
          'id': 1,
          'content': 'do something really urgent ishosics sisisucsi iscus isos ic sioc sicis csiocsiocsc pscpsco osciscoisp csposciscos pcsp csocispoc scos csocps cicop scios cso soc scosp csocs cosp cos cosc opsipos cospocs csios cscipsoc socsocs csp cspocsociscpsc oospc scos pcos cps spoc sicspo',
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

    return todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
  }

  addItem(event){
    event.preventDefault();
    const { listContent } = this.state;


    let item = {
      'id': this.setPreviousId() || 1,
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
        <Grid className="App">
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <TodoInput addItem={this.addItem} listContent={listContent}   onSearchChange={this.onSearchChange} />
            </Col>
          </Row>

            <List>
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
            </List>
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
            <TextField id="text-field-controlled" type="text" value={editedContent} onChange={onEditChange}
            multiLine={true}
            rows={1}
            rowsMax={4}/>
            <FlatButton label="Update" primary={true} type="submit"/>
          </form>
        </ListItem>
        <Divider />
      </div>
    );
  } else {
    return (
      <div>
        <ListItem rightIcon={<IconButton children={<IconDelete color={red500} hoverColor={red800} />} onClick={ () => removeItem(item.id)} />} >
          <div style={styles.block}>
            <Checkbox style={styles.checkbox} onClick={() => toggleCompletion(index)}/>
          </div>
          <div onDoubleClick={() => toggleEditView(index)}>{item.content}</div>

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
