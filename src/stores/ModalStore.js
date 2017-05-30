import { computed, observable } from 'mobx';

class ModalStore {
    @observable showModal = false;
    @observable modalMode ='';
    @observable subjectId = null;

    callModal(mode, id) {
        this.showModal = true;
        this.modalMode = mode;
        this.subjectId = id;
    }

    closeModal() {
        this.showModal = false;
        this.modalMode = '';
        this.subjectId = null;
    }
}

export default new ModalStore;