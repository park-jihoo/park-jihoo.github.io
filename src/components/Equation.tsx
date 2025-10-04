'use client'
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import React, { useEffect, useRef } from 'react';

export default function Equation({ equation, ...props }: { equation: string, props: React.HTMLAttributes<HTMLDivElement> }) {
    const katexRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (katexRef.current) {
            renderMathInElement(katexRef.current, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true},
                ]
            })
        }
    }, [equation])

    return <span className='katex' ref={katexRef} {...props} >{equation}</span>
}