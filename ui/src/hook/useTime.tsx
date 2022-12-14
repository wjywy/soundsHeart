// 倒计时的hook
import React, {
    useEffect,
    useState
} from 'react';

export const useTime = (calnumber: number) => {
    let [count, setCount] = useState<number>(calnumber)
    let timeRef: any
    useEffect(() => {
        timeRef = setInterval(() => {
            setCount((count) => count - 1)
        }, 1000)
        return () => {
            clearInterval(timeRef)
        }
    }, [])
    useEffect(() => {
        if ( count === 0 ) {
            clearInterval(timeRef)
        }
    },[count])
    return [count]
};
// export default useTime;