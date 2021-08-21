import React, { useState, useEffect, useRef } from 'react';


const Timer = (props) => {
  const { endTimeForAnswer, limitForTime,endGame ,seeResult} = props
  let [count, setCount] = useState(0);
if(endGame){
  seeResult(count)
}
  useInterval(
    () => {
      setCount(count + 1);
    }, 1000, limitForTime, endTimeForAnswer);

  return <h3 className="timer">{count}</h3>;
}

const useInterval = (callback, delay, limitForTime, endTimeForAnswer) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let counter = 0;
    let intervalId

    function tick() {
      savedCallback.current();
      counter += 1;
      if (counter > 0 && counter === limitForTime) {
        console.log('Done');
        clearInterval(intervalId);
        endTimeForAnswer()
      }
    }

    if (delay !== null) {
      intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }

  }, [delay, endTimeForAnswer, limitForTime]);
}
export default Timer;