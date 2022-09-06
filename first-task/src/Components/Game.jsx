import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Game = () => {
    const [sizeArr, setSizeArr] = useState([])
    const [obj, setObj] = useState({})
    const [buttonColor, setButtonColor] = useState('')
    const [count, setCount] = useState('')
    const countries = {
        germany: 'berlin',
        india: 'delhi',
        canada: 'ottawa'
    }
    let testing_arr = [];
    var size = Object.entries(obj).flat().sort(() => Math.random() - 0.5);

    useEffect(() => {
        setObj(countries)
    }, [])


    useEffect(() => {

        setSizeArr(size)

    }, [obj])


    // console.log(sizeArr)


    const compare = (item) => {
        
        testing_arr.push(item)

        if (testing_arr.length === 2) {
            var objKeys = Object.keys(obj)
            console.log(testing_arr)
            console.log(objKeys)

            for (var i = 0; i < objKeys.length; i++) {
                if (objKeys[i] === testing_arr[0]) {
                    if (obj[objKeys[i]] === testing_arr[1]) {
                        console.log("yes")
                        delete obj[objKeys[i]]

                        setObj((prev) => ({
                            ...prev
                        }))
                    }
                } else if (obj[objKeys[i]] === testing_arr[0]) {
                    if (objKeys[i] === testing_arr[1]) {
                        console.log('yes')
                        delete obj[objKeys[i]]

                        setObj((prev) => ({
                            ...prev
                        }))
                    }
                }
            } 
        }

        else {
            
            if (testing_arr.length === 3) {
                testing_arr = [];
            }
     
            console.log('click again')
        }
    }

    return (
        <div>

            {sizeArr.length > 0 ?
                sizeArr.map((item, index) => {
                    return (
                        <div key={index} >
                            <button onClick={() => compare(item)} className={`btn btn-dark ms-4 mt-4 ${buttonColor === item ? "pressed" : ""}`}>{item}</button>
                            <p>{count}</p>
                        </div>
                    )
                }) : (<>{<h1>Congratulations</h1>}</>)

            }

        </div>
    )
}

export default Game