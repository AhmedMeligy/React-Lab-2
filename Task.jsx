import React, { Component } from 'react';
import styles from './Tasks.module.css'
import axios from 'axios'

let s = { color: 'green' }

class Task extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         title:"Task_One"
    //     }
    // }

    state = {
        title: "Task_One",
        tasks: [],
        min:0,
        max:5

    }


    //? must be arrow fun

    ChangeTitle = () => {
        this.setState({
            title: "Task_Two"
        })
    }
    componentDidMount() {
        axios.get("http://jsonplaceholder.typicode.com/todos")
            .then(res => {
                console.log(res.data)
                this.setState({ tasks: res.data })
            })
            .catch(err => console.log(err))
    }

    NextTasks=()=>{
        // console.log(this.state.max)
        this.setState({min:this.state.min+5})
        this.setState({max:this.state.max+5})

        if(this.state.max === this.state.tasks.length){
            this.setState({ max: 5 });
            this.setState({ min: 0 });
        }
    }
    PrevTasks=()=>{
        this.setState({min:this.state.min-5})
        this.setState({max:this.state.max-5})

        if(this.state.min === 0){
            this.setState({ max: this.state.tasks.length });
            this.setState({ min: this.state.tasks.length - 5 });
        }
    }
    render() {
        return (
            <div className={styles.header}>
                {/* <h1 style={{color:'blue'}}>Task Component</h1> */}
                <h1 style={s}>Task Component</h1>
                {/* Data Binding */}
                <h1>{this.state.title}</h1>
                <button className='btn btn-dark' onClick={this.ChangeTitle}>Change Title</button>
                <hr />
                <button className="btn btn-dark w-100 mt-5" onClick={this.NextTasks}>Next</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map((t) => {
                            if(t.id>this.state.min && t.id <= this.state.max){
                            return (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>{t.completed ? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>}</td>
                                </tr>
                            )}else{
                                return null;
                            }
                        })}


                    </tbody>
                </table>
                <button className="btn btn-dark w-100" onClick={this.PrevTasks}>Prev</button>

            </div>

        );
    }
}

export default Task;
// ? https://dummyjson.com/
