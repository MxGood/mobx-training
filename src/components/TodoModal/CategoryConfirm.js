import React, { Component, PropTypes } from 'react';
import CategoryStore from '../../stores/CategoryStore';
import ModalStore from '../../stores/ModalStore';
import {
    Modal,
    Header,
    Body,
    Footer,
    Button,
    FieldGroup
} from 'React-Bootstrap';

class CategoryConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete() {
        CategoryStore.remove(this.props.id);
        ModalStore.closeModal();
    }

    render() {
        const title = `Are you sure you want to delete category ${this.props.id}`;

        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        bsStyle="danger"
                        type="submit"
                        onClick={this.onDelete}
                    >Delete</Button>
                    <Button onClick={() => ModalStore.closeModal()}>Cancel</Button>
                </Modal.Footer>
            </div>
        );
    }
}

export default CategoryConfirm;