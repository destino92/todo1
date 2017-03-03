import React from 'react';
import ListItem from 'material-ui/List';

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

export default TodoItem;
