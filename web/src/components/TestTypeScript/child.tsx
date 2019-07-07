import * as React from 'react';

export interface TsProps {
    size: number
}

export interface TsState {
    visible: boolean
}

class TestChild extends React.Component<TsProps, TsState> {
    state = {
        visible: false
    }
    private name: string
    render() {
        this.name = 'jkl'
        return (
            <span>test react.component -> {this.name},{this.props.size}</span>
        )
    }
}

export default TestChild;