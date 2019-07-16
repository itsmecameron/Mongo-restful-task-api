import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Task';
    tasks = [];
    taskDescription = [];
    newTask: any;
    editTask: any;
    requested = false;
    edit = false;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.newTask = { title: "", description: "" }
        // this.getTasksFromService();
    }

    getTasksFromService() {
        let taskObservable = this._httpService.getTasks()
        taskObservable.subscribe(data => {
            console.log('Got your tasks:', data);
            this.tasks = data.data
        })
    }

    onSubmit() {
        let observable = this._httpService.addTask(this.newTask);
        observable.subscribe(data => {
            console.log('button works', data);
            this.newTask = { title: "", description: "" }
        })
        this.getTasksFromService();
    }

    getTaskDescription(id) {
        let taskObservable = this._httpService.getDescription(id)
        taskObservable.subscribe(data => {
            this.taskDescription = data.data
            console.log("this is the data.data: ", data)
            console.log(this.taskDescription);

            this.requested = true;
            console.log("It's true!")
        })
    }

    deleteTask(id) {
        let observable = this._httpService.deleteTask(id);
        observable.subscribe(data => {
            this.tasks = data.data
        })
        this.getTasksFromService();
    }
    onEdit() {
        let observable = this._httpService.editTask(this.editTask);
        observable.subscribe(data => {
            this.getTasksFromService();
            this.edit = false;
        })
    }

    showEditTask(task) {
        this.editTask = { title: task.title, description: task.description, id: task._id }
        this.edit = true;
    }
}
