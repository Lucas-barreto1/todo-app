import React from "react";
import { db } from "../../services/firebase";

import { ListItem, ListItemText, Button } from "@material-ui/core";
import { GoTrashcan } from 'react-icons/go';
import {BsCheckBox} from 'react-icons/bs';
import {AiOutlineUndo} from 'react-icons/ai';

import styles from '../ListTodos/TodoList.module.scss';



const TodoListItem = ({todo, inprogress, id}) => {

    const toggleInProgress = () => {
        db.collection("todos").doc(id).update({
            inprogress: !inprogress,
        });
    }
    
    const deleteTodo = () => {
        db.collection("todos").doc(id).delete();
    }

    return(
        <div className={styles.wrapperTodos}>
        <ListItem>
            <ListItemText
            primary={todo}
            secondary={inprogress ? "Em progresso" : "Completo"}
            />
        </ListItem>

        <Button onClick={toggleInProgress}>
        {inprogress ? <BsCheckBox color={'#00a000'} size={25}/> : <AiOutlineUndo color={'#ffb515'} size={25}/>}
        </Button>
        <Button onClick={deleteTodo}>
            <GoTrashcan color={"#b81414"} size={25} />
        </Button>
    </div>
    )
}

export default TodoListItem