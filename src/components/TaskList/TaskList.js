import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CategoryStore from '../../stores/CategoryStore';
import TaskStore from '../../stores/TaskStore';
import {
    Panel,
    ListGroup,
    ListGroupItem,
    Form,
    InputGroup,
    Button,
    FormControl
} from 'React-Bootstrap';
import Task from './Task';

@observer
export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const value = this.textInput.props.value.trim();
        if (!value || !CategoryStore.selectedCategory) {
            return false;
        }
        this.props.store.create(value, CategoryStore.selectedCategory);
        this.setState({ value: '' });
    }

    drawTasks(taskList) {
        const data = taskList || [];
        const tasks = data.map((item, index) => {
            return (
                <Task
                    id={item.taskId}
                    key={index}
                    store={TaskStore}
                />
            );
        });
        const noTasks = (
            <ListGroupItem>
                no tasks
            </ListGroupItem>
        );
        return (
            <ListGroup fill className="category-list">
                {tasks.length ? tasks : noTasks }
            </ListGroup>
        );
    }

    header = () => (
        <Form onSubmit={this.handleSubmit}>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Enter task text"
                    onChange={this.handleChange}
                    value={this.state.value}
                    ref={(input) => {
                        this.textInput = input;
                    }}
                />
                <InputGroup.Button>
                    <Button type="submit">Add</Button>
                </InputGroup.Button>
            </InputGroup>
        </Form>
    );

    render() {
        const filtered = this.props.store.filteredTasks;
        const list = this.drawTasks(filtered);
        return (
            <Panel header={this.header()} bsStyle="info">
                {list}
            </Panel>
        );
    }
}