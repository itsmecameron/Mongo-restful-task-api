import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'public';
    constructor(private _httpService: HttpService) { }
    getAllTask() {
        let taskObservable = this._httpService.getTasks()
        taskObservable.subscribe(
            data => {
                console.log('Got your tasks:', data);
                this.tasks = data['tasks']
            }
        )
    }
}
