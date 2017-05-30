import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
    Panel,
    ListGroup,
    Form,
    InputGroup,
    Button,
    FormControl
} from 'React-Bootstrap';
import Category from './Category';
import TaskStore from '../../stores/TaskStore';

@inject('CategoryStore')
@observer
export default class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.CategoryStore.showCategoryList();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const value = this.textInput.props.value.trim();
        if (value === '') {
            return;
        }
        this.props.CategoryStore.create(value);
        this.setState({ value: '' });
        this.props.CategoryStore.showCategoryList();
    }

    drawCategories(categoryList) {
        const data = categoryList || [];
        const categories = data.map((item, index) => {
            return (
                <Category
                    id={item.categoryId}
                    key={index}
                />
            );
        });
        return (
            <ListGroup fill className="category-list">
                {categories}
            </ListGroup>
        );
    }

    header = () => (
        <Form onSubmit={this.handleSubmit}>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Enter category title"
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
        const { categories } = this.props.CategoryStore;
        const list = this.drawCategories(categories);
        return (
            <Panel header={this.header()} bsStyle="info">
                {list}
            </Panel>
        );
    }
}