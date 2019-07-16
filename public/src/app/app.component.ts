import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // title = 'Task';
    tasks = [];
    taskDescription = [];
    requested = false;

    constructor(private _httpService: HttpService) { }
    ngOnInit() {
        // this.getTasksFromService();
    }

    getTasksFromService() {
        let taskObservable = this._httpService.getTasks()
        taskObservable.subscribe(
            data => {
                console.log('Got your tasks:', data);
                this.tasks = data.data
            }
        )
    }

    getTaskDescription(id) {
        // let taskObservable = this._httpService.getDescription(id)
        // taskObservable.subscribe(
            // data => {
                this.taskDescription = this.tasks[id];
                console.log(this.taskDescription);

                this.requested = true;
                console.log("It's true!")
            }
        // )
    }
// }
