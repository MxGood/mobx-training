import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ProgressBar } from 'React-Bootstrap';

@observer
class Progress extends Component {

    isCompleted(taskList, id) {
        const arr = taskList.filter(task => task.categoryId === id);
        if (arr.length === 0) {
            return true;
        }
        const notCompleted = arr.filter(task => task.completed === false);
        if (notCompleted.length === 0) {
            return true;
        }
        return false;
    }

    getProgress(taskList, categoryList) {
        const total = categoryList.length;
        let completed = 0;
        const categoryIds = categoryList.map(item => item.categoryId);
        categoryIds.forEach(id => {
            if (this.isCompleted(taskList, id)){
                completed++;
            }
        });
        return (completed / total) * 100;
    }

    render() {
        const progress = this.getProgress(this.props.TaskStore.allTasks, this.props.CategoryStore.allCategories);
        return (
            <ProgressBar
                striped
                bsStyle="info"
                now={progress}
            />
        );
    }
}

export default Progress;