    import {React, useState, useEffect} from 'react';
    import Header from '../../components/Header/index';
    import {db} from '../../services/firebase';
    import firebase from 'firebase';

    import TextField from '@material-ui/core/TextField';
    import { Button } from "@material-ui/core";
    import TodoListItem from '../../pages/ListTodos/TodoListItem';

    import styles from '../../styles/main.module.scss';


    const HomePage = () => {

    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    const getTodos = () => {
        db.collection("todos").onSnapshot(function(querySnapshot){
        setTodos( 
            querySnapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            inprogress: doc.data().inprogress,
        }))
        );
        });
    }

    const addTodo = (e) => {
        e.preventDefault();

        db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
        });
        setTodoInput("");
    }

    useEffect (() => {
        getTodos();
    },[])

    return (
        <div className={styles.container}>

        <Header />

        <form className={styles.boxTodos}>
        <TextField 
        id="standard-basic" 
        label="Escreva sua tarefa"
        style={{ width: "90vw", maxWidth: "500px" }}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        />

        <Button
        type="submit"
        variant="contained"
        onClick={addTodo} 
        style={{ display: "none" }}
        >
            Default
        </Button>
        </form>
        
        <div className={styles.wrapperTodos}>
        {todos.map((todo) => (
            <TodoListItem 
                todo={todo.todo}
                inprogress={todo.inprogress}
                id={todo.id}
            />
            ))}
        </div>
    </div>
    )
}


export default HomePage