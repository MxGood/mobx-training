import React, { Component, PropTypes } from 'react';
import CategoryStore from '../../stores/CategoryStore';
import ModalStore from '../../stores/ModalStore';
import {
    Col,
    Modal,
    Header,
    Body,
    Footer,
    Button,
    Form,
    FieldGroup,
    FormGroup,
    ControlLabel,
    FormControl
} from 'React-Bootstrap';
import {
    ADD_CATEGORY_MODAL,
    EDIT_CATEGORY_MODAL
} from './constants';

class CategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.getParameters(props.mode, props.id);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getParameters(mode, id) {
        switch (mode) {
            case ADD_CATEGORY_MODAL:
                return {
                    title: `Add new category`,
                    button: `Add`,
                    action: (value) => CategoryStore.create(value, id),
                    value: ''
                };
                return '';
            case EDIT_CATEGORY_MODAL:
                return {
                    title: `Edit category ${id}`,
                    button: `Update`,
                    action: (value) => CategoryStore.update(value, id),
                    value: CategoryStore.getById(id).title
                };
            default:
                break;
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const value = this.formInput.props.value.trim();
        if (value === '') {
            return;
        }
        this.state.action(value);
        ModalStore.closeModal();
        this.setState({ value: '' });
        CategoryStore.showCategoryList();
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={10}>
                        </Col>
                        <Col sm={12}>
                            <FormControl
                                type="text"
                                placeholder="Enter new category title"
                                onChange={this.handleChange}
                                value={this.state.value}
                                ref={input => this.formInput = input}
                            />
                        </Col>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" type="submit">{this.state.button}</Button>
                    <Button onClick={() => ModalStore.closeModal()}>Cancel</Button>
                </Modal.Footer>
            </Form>
        );
    }
}

export default CategoryForm;