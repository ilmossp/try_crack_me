import React, { useEffect, useRef, useState } from 'react'
import useInterval from 'use-interval';


const characters= `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const min_stream_size = 5;
const max_stream_size = 50;
const probability = 0.05;

const getRandomSize = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const getRandomChar = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

const getRandomStream = () => {
    const streamSize = getRandomSize(min_stream_size, max_stream_size);
    const array = new Array(streamSize);
    for (let i = 0; i < streamSize; i++) {
      array[i] = getRandomChar();
    }
    return array;
  } 

const getMutatedStream = (stream: string[]) => {
	const newStream = [];
	for (let i = 1; i < stream.length; i++) {
		if (Math.random() < probability) {
			newStream.push(getRandomChar());
		} else {
			newStream.push(stream[i]);
		}
	}
	newStream.push(getRandomChar());
	return newStream;
};

const Matrix = () => {
  
    const [stream, setStream] = useState<string[]>([]);
    const [topPadding, setTopPadding] = useState(stream.length * -50);
  
    useEffect(() => {
      setStream(getRandomStream());
    }, []);
    
    useInterval(() => {
        if (topPadding > window.innerHeight) {
            setTopPadding(stream.length * -50);
        } else {
            setTopPadding(topPadding + 44);
            setStream(stream => getMutatedStream(stream));
        }
        }, 100);
       
    

    return (
        <div className="font-[matrixFont] text-myGreen text-5xl text-shadow-green"
        style={{
            marginTop: topPadding, 
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            whiteSpace: 'nowrap',
            userSelect: 'none',
        }}>{stream.map((char: string, index: number) => (
            <a 
            style={{
                color: index === stream.length -1 ? '#fff' : undefined,
                opacity: index < 6 ? 0.1 + index * 0.15 : 1,
                textShadow: index === stream.length - 1 ? '0px 0px 20px rgba(255, 255, 255, 1)' : undefined,
                marginTop: -12,
            }}>{char}</a>
        )
        )}</div>
    )
 }

 export default Matrix;
