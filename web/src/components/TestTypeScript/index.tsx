import * as React from 'react';
import Child from './child';
import count from './test';

export interface TestTypeProps {
    compiler: string;
    framework: number;
}

export default function TestType({ compiler, framework }: TestTypeProps) {
    console.warn(count(1, 98));
    return (
        <div>
            <h3>Hello from {compiler} and {framework}!</h3>
            <Child size={30} />
        </div>
    );
}
