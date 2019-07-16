import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) {
    }
    getTasks() {
        return this._http.get('/tasks');
    }

    addTask(newTask) {
        return this._http.post('/tasks', newTask)
    }

    getDescription(id) {
        return this._http.get('/tasks/' + id);
    }

    deleteTask(id) {
        return this._http.delete('/tasks/' + id)
    }

    editTask(editTask) {
        return this._http.put('/tasks/' + editTask.id, editTask)
    }
}
