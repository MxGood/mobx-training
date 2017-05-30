import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Col,
    Header,
    Body,
    Footer,
    Button,
    FieldGroup,
    FormControl,
    Checkbox,
    Panel
} from 'React-Bootstrap';

@observer
export default class TaskEditor extends Component {

    constructor(props) {
        super(props);
        this.state = this.getParameters();
        this.handleChangeTaskText = this.handleChangeTaskText.bind(this);
        this.handleChangeTaskCompleted = this.handleChangeTaskCompleted.bind(this);
        this.handleChangeTaskDescription = this.handleChangeTaskDescription.bind(this);
        this.handleChangeTaskCategoryId = this.handleChangeTaskCategoryId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getParameters() {
        this.task = this.props.store.getEditedTask();
        if (this.task) {
            return { ...this.task };
        }
        return null;
    }

    handleChangeTaskText(event) {
        this.setState({ text: event.target.value });
    }

    handleChangeTaskCompleted(event) {
        this.setState({ completed: event.target.checked });
    }

    handleChangeTaskDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleChangeTaskCategoryId(event) {
        this.setState({ categoryId: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const text = this.textInput.props.value.trim();
        const categoryId = this.task.categoryId;
        if (!text) {
            return false;
        }
        this.task.text = text;
        this.task.completed = this.checkInput.props.checked;
        this.task.description = this.areaInput.props.value;
        this.task.categoryId = this.props.store.taskHolder;
        this.props.store.editedTask = null;
        this.props.store.taskHolder = null;
        this.props.store.showTaskList(categoryId);
    }

    render() {
        if (!this.state) {
            return false;
        }
        return (
            <Panel>
                <form onSubmit={this.handleSubmit}>
                    <Col
                        sm={10}
                        xs={12}
                        className="vertical-space"
                    >
                        <Button
                            bsStyle="primary"
                            className="pull-right"
                            type="submit"
                        >
                            Save changes
                        </Button>
                    </Col>
                    <Col
                        sm={2}
                        xs={12}
                        className="vertical-space"
                    >
                        <Button
                            className="pull-right"
                            onClick={() => this.props.store.editedTask = null}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col
                        xs={6}
                        className="vertical-space"
                    >
                        <FormControl
                            type="text"
                            placeholder="Enter task text"
                            onChange={this.handleChangeTaskText}
                            value={this.state.text}
                            ref={input => this.textInput = input}
                        />
                    </Col>
                    <Col
                        className="vertical-space"
                        xs={12}>
                        <Checkbox
                            onChange={this.handleChangeTaskCompleted}
                            checked={this.state.completed}
                            ref={input => this.checkInput = input}
                        >
                            Done
                        </Checkbox>
                    </Col>
                    <Col xs={12}>
                        <FormControl
                            componentClass="textarea"
                            rows="8"
                            placeholder="Description"
                            onChange={this.handleChangeTaskDescription}
                            value={this.state.description}
                            ref={input => this.areaInput = input}
                        />
                    </Col>
                </form>
            </Panel>
        );
    }
}