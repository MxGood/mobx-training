import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Navbar,
    FormGroup,
    FormControl,
    Button,
    Checkbox,
    InputGroup
} from 'React-Bootstrap';

@observer
export default class Filter extends Component {

    clear() {
        this.props.store.filter = '';
    }

    filter(e) {
        this.props.store.filter = e.target.value;
    }

    getCompleted(e) {
        this.props.store.filterCompleted = e.target.checked;
    }

    render() {
        const { filter, filterCompleted } = this.props.store;
        return (
            <Navbar.Form pullRight>
                <FormGroup>
                    <Checkbox
                        onChange={this.getCompleted.bind(this)}
                        checked={filterCompleted}
                    >
                        {' '}
                        Show done
                    </Checkbox>
                    {' '}
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="search"
                            value={filter}
                            onChange={this.filter.bind(this)}
                        />
                        <InputGroup.Button>
                            <Button
                                type="button"
                                onClick={this.clear.bind(this)}
                            >
                                clear
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
                {' '}
            </Navbar.Form>
        );
    }
}
