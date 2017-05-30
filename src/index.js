import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import {
    Router,
    Route,
    Redirect,
    browserHistory
} from 'react-router';
import Home from './pages/Home';
import CategoryStore from './stores/CategoryStore';
import ModalStore from './stores/ModalStore';
import TaskStore from './stores/TaskStore';

const root = document.getElementById('root');

render(
    <Provider
        CategoryStore={CategoryStore}
        ModalStore={ModalStore}
        TaskStore={TaskStore}
    >
        <Home/>
    </Provider>, root);