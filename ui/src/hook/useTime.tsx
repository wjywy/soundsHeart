// 倒计时的hook
import React, {
    useEffect,
    useRef,
    useState
} from 'react';

export const useTime = (calnumber: number) => {
    let [count, setCount] = useState<number>(calnumber)
    let timerRef = useRef<NodeJS.Timer>()
    useEffect(() => {
        console.log(count)
        timerRef.current = setInterval(() => {
            setCount((count) => count - 1)
        }, 1000)
        return () => {
            clearInterval(timerRef.current)
        }
    }, [])
    useEffect(() => {
        if ( count === 0 ) {
            clearInterval(timerRef.current)
        }
    },[count])
    return {count}
};
// export default useTime;