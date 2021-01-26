'use strict';

class Todos {
    todos;
    taskKeyId
    task;
    radioVal;
    addTaskBtn;
    dispTodo;
    inptTask;
    dispRadio;
    dispRadioAll;
    dispRadioMnt;
    dispRadioCmp;
    constructor() {
        this.todos = [];
        this.taskKeyId = 0;
        this.task = '';
        this.radioVal = '';
        this.addTaskBtn = document.getElementById('add_new_task_val');
        this.dispTodo = document.getElementById('disp_todos');
        this.inptTask = document.getElementById('input_new_task_val');
        this.dispRadio = document.getElementById('disp_radio_wrap');
        this.dispRadioAll = this.dispRadio[0];
        this.dispRadioMnt = this.dispRadio[1];
        this.dispRadioCmp = this.dispRadio[2];
    }
    setNewTask() {
        this.addTaskBtn.addEventListener('click', () => { 
            if (!this.inptTask.value) {
                return;
            } else {
                this.task = this.inptTask.value;
                this.taskKeyId += 1;
                this.todo = {
                    id: '',
                    taskKey: this.taskKeyId,
                    task: this.task,
                    state: '実行中',
                }
                this.todos.push(this.todo);
                this.inptTask.value = '';
                if (this.dispRadioCmp.checked || this.dispRadioMnt.checked) {
                    this.sortDispTodos(this.todos);
                } else { 
                    this.dispShowTask(this.todos);
                }
            }
        })
    }
    dispShowTask(todos) {
        this.dispTodo.innerHTML = '';
        todos.forEach((todo, taskId) => {
            todo.id = taskId += 1;
            const id = todo.id;
            const taskName = todo.task;
            const state = todo.state;

            const tr = document.createElement('tr');
            const stateTd = document.createElement('td');
            const stateBtn = document.createElement('button');
            stateBtn.innerHTML = state;
            const delTd = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '削除';

            const idspan = document.createElement('span');
            idspan.innerHTML = id;
            const idspanTd = document.createElement('td');
            idspanTd.append(idspan);

            const taskspan = document.createElement('span');
            const taskspantd = document.createElement('td');
            taskspan.innerHTML = taskName;
            taskspantd.append(taskspan);

            stateTd.appendChild(stateBtn);
            delTd.appendChild(deleteBtn);

            tr.appendChild(idspanTd);
            tr.appendChild(taskspantd);
            tr.appendChild(stateTd);
            tr.appendChild(delTd);

            this.dispTodo.appendChild(tr);
            this.delTask(deleteBtn, todo);
            this.changeStateTask(stateBtn, todo);
        })
    }
    delTask(deleteBtn, todo) { 
        deleteBtn.addEventListener('click', () => {
            const sortTodos = this.todos.filter((todos) => todos.taskKey !== todo.taskKey);
            this.todos = [];
            this.todos = sortTodos;
            if (this.dispRadioCmp.checked || this.dispRadioMnt.checked) {
                this.sortDispTodos(this.todos);
            } else {
                this.dispShowTask(this.todos);
            }
        })
    }
    changeStateTask(stateBtn, todo) { 
        stateBtn.addEventListener('click', () => { 
            todo.state = todo.state !== '実行中' ? '実行中' : '完了';
            stateBtn.innerHTML = todo.state;
            if (this.dispRadioCmp.checked || this.dispRadioMnt.checked) {
                this.sortDispTodos(this.todos);
            } else { 
                return;
            }
        })
    }
    setDispRadioVal() {
        if (!this.todos) {
            return;
        } else {
            this.dispRadio.addEventListener('change', () => {
                if (this.dispRadioAll.checked) {
                    this.radioVal = this.dispRadioAll.value;
                } else if (this.dispRadioMnt.checked) {
                    this.radioVal = this.dispRadioMnt.value;
                } else if (this.dispRadioCmp.checked) {
                    this.radioVal = this.dispRadioCmp.value;
                } else { 
                    return;
                };
                this.sortDispTodos(this.todos);
            })
        }
    }
    sortDispTodos(todos) {
        let sortValue = [];
        if (this.radioVal === this.dispRadioMnt.value) {
            sortValue = todos.filter((todos) => todos.state !== '完了');
        } else if (this.radioVal === this.dispRadioCmp.value) {
            sortValue = todos.filter((todos) => todos.state !== '実行中');
        } else if(this.radioVal === this.dispRadioAll.value) { 
            sortValue = this.todos;
        }
        this.dispShowTask(sortValue);
     }
}

const todos = new Todos();
todos.setNewTask();
todos.setDispRadioVal();
