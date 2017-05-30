import { computed, observable } from 'mobx';
import data from '../mock/dataProvider'

class Task {
    @observable text;
    @observable categoryId;
    @observable completed;
    @observable description;

    constructor(text, categoryId, description = '') {
        this.text = text;
        this.taskId = Date.now();
        this.categoryId = categoryId;
        this.completed = false;
        this.description = description;
    }
}

export class TaskStore {
    @observable tasks = [];
    @observable allTasks = [];
    @observable editedTask = null;
    @observable taskHolder = null;
    @observable filter = '';
    @observable filterCompleted = false;

    @computed get filteredTasks() {
        const matchesFilter = new RegExp(this.filter, 'i');
        const result = this.tasks.filter(task => !this.filter || matchesFilter.test(task.text));
        if(this.filterCompleted) {
            return result.filter(task => task.completed)
        }
        return result;
    }

    editTask(id) {
        this.editedTask = id;
        this.taskHolder = this.getById(id).categoryId;
    }

    getEditedTask() {
        if (this.editedTask) {
            return this.getById(this.editedTask);
        }
        return null;
    }

    getById(id) {
        return this.allTasks.find(task => task.taskId === id);
    }

    create(text, categoryId) {
        this.allTasks = [new Task(text, categoryId), ...this.allTasks];
        this.showTaskList(categoryId);
    }

    loadTaskList() {
        this.allTasks = data.taskListData;
    }

    showTaskList(id) {
        if (id) {
            this.tasks = this.allTasks.filter(task => (task.categoryId === id));
        }
    }
}

export default new TaskStore;