import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
    ListGroupItem,
    Checkbox,
    Glyphicon
} from 'React-Bootstrap';

@observer
class Task extends Component {

    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit(id) {
        this.props.store.editTask(id);
    }

    render() {
        const task = this.props.store.tasks.find(task => (task.taskId === this.props.id));
        return (
            <ListGroupItem>
                <Checkbox
                    inline
                    value={task.completed}
                    checked={task.completed}
                    onChange={() => (task.completed = !task.completed)}
                >
                    {task.text}
                </Checkbox>
                <Glyphicon
                    glyph="pencil"
                    className="pull-right"
                    onClick={() => this.onEdit(task.taskId)}
                />
            </ListGroupItem>
        );
    }
}

export default Task;