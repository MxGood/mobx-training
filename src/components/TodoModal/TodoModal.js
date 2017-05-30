import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'React-Bootstrap';
import CategoryForm from './CategoryForm';
import CategoryConfirm from './CategoryConfirm';
import ModalStore from '../../stores/ModalStore';
import {
    ADD_CATEGORY_MODAL,
    EDIT_CATEGORY_MODAL,
    DELETE_CATEGORY_MODAL
} from './constants';

@observer
class TodoModal extends Component {

    openModal(mode, id) {
        const props = { mode, id };
        switch (mode) {
            case ADD_CATEGORY_MODAL:
                this.content = (<CategoryForm {...props}/>);
                break;
            case EDIT_CATEGORY_MODAL:
                this.content = (<CategoryForm {...props}/>);
                break;
            case DELETE_CATEGORY_MODAL:
                this.content = (<CategoryConfirm {...props}/>);
                break;
            default:
                break;
        }
    }

    render() {
        this.openModal(ModalStore.modalMode, ModalStore.subjectId);
        return (
            <Modal show={ModalStore.showModal } onHide={() => ModalStore.closeModal()}>
                {this.content}
            </Modal>)
    }
}

export default TodoModal;

