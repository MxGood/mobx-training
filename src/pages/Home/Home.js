import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
    Row,
    Col,
    Grid,
    Navbar
} from 'React-Bootstrap';

import TodoModal from '../../components/TodoModal/TodoModal';
import CategoryStore from '../../stores/CategoryStore';
import TaskStore from '../../stores/TaskStore';
import CategoryList from '../../components/CategoryList';
import TaskList from '../../components/TaskList';
import TaskEditor from '../../components/TaskEditor';
import Filter from '../../components/Filter';
import Progress from '../../components/ProgressBar';

@inject('TaskStore')
@observer
class Home extends Component {

    componentDidMount() {
        this.props.TaskStore.loadTaskList();
        CategoryStore.loadCategoryList();
    }

    getTaskComponent(id) {
        if (id) {
            return (
                <TaskEditor store={TaskStore}/>
            )
        }
        return (
            <TaskList store={TaskStore}/>
        )
    }

    getTitle(id) {
        if (id) {
            return this.props.TaskStore.getById(id).text;
        }
        return 'Mobx ToDo 📝';
    }

    getFilter(id) {
        if (id) {
            return false;
        }
        return (<Filter store={TaskStore}/>);
    }

    getProgress(id) {
        if (id) {
            return false;
        }
        return (
            <Progress
                TaskStore={TaskStore}
                CategoryStore={CategoryStore}
            />);
    }

    render() {
        const id = this.props.TaskStore.editedTask;
        const taskComponent = this.getTaskComponent(id);
        const title = this.getTitle(id);
        const filter = this.getFilter(id);
        const progress = this.getProgress(id);
        return (
            <Grid bsClass="fluid">
                <Row>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                {title}
                            </Navbar.Brand>
                        </Navbar.Header>
                        {filter}
                    </Navbar>
                </Row>
                <Row className="progress-container">
                    {progress}
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <CategoryList />
                    </Col>
                    <Col xs={12} md={8}>
                        {taskComponent}
                    </Col>
                </Row>
                <TodoModal/>
            </Grid>
        );
    }
}

export default Home;
