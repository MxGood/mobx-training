import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import {
    Col,
    ListGroupItem,
    Glyphicon
} from 'React-Bootstrap';
import CategoryStore from '../../stores/CategoryStore';
import ModalStore from '../../stores/ModalStore';
import {
    ADD_CATEGORY_MODAL,
    EDIT_CATEGORY_MODAL,
    DELETE_CATEGORY_MODAL
} from '../TodoModal/constants';

@inject('TaskStore')
@observer
class Category extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(category) {
        CategoryStore.selectCategory(category.categoryId);
        this.props.TaskStore.showTaskList(category.categoryId);
        category.expanded = !category.expanded;
        CategoryStore.showCategoryList();
    }

    showGeneration(gen) {
        let arr = [];
        const elem = (index) => (
            <Glyphicon
                key={index}
                glyph="chevron-right"
            />
        );
        for (let i = 0; i < gen; i++) {
            arr = [elem(i), ...arr];
        }
        return arr;
    }

    render() {
        const category = CategoryStore.categories.find(category => (category.categoryId === this.props.id));
        const isEdit = this.props.TaskStore.editedTask;
        const isHolder = this.props.TaskStore.taskHolder === category.categoryId;
        const editButton = isEdit ? false : (
                <Glyphicon
                    glyph="pencil"
                    onClick={() => ModalStore.callModal(EDIT_CATEGORY_MODAL, category.categoryId)}
                />);
        const moveButton = isHolder || !isEdit ? false : (
                <Glyphicon
                    glyph="arrow-left"
                    className="pull-right"
                    onClick={() => this.props.TaskStore.taskHolder = category.categoryId}
                />
            );
        const addRemoveButton = isEdit ? false : (
                <Col className="pull-right">
                    <Glyphicon
                        glyph="trash"
                        onClick={() => ModalStore.callModal(DELETE_CATEGORY_MODAL, category.categoryId)}
                    />
                    <Glyphicon
                        glyph="plus"
                        onClick={() => ModalStore.callModal(ADD_CATEGORY_MODAL, category.categoryId)}
                    />
                </Col>
            );

        const isSelected = category.categoryId === CategoryStore.selectedCategory;

        return (<ListGroupItem
                className={isSelected ? 'active' : ''}>
                    <span
                        className="category-title"
                        onClick={() => this.onSelect(category)}
                    >
                        {this.showGeneration(category.generation)}
                        {category.title}
                    </span>
                {' '}
                {editButton}
                {addRemoveButton}
                {moveButton}
            </ListGroupItem>
        );
    }
}

export default Category;