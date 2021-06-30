import React from 'react';
import { Duck } from './Demo';

interface Props {
    duck: Duck;
    ind:number;
}

export default function DuckItem({duck, ind}:Props) {
    return (
        <div key={ind}>
            <p>{duck.name}</p>
            <button onClick={() => duck.makeSound(duck.name)}>Say Your Name</button>
        </div>
    )
}