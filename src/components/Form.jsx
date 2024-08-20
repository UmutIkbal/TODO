'use client'

import { useState } from "react"
import Image from 'next/image'
import Plus from '@public/plus.svg'
import Cancel from '@public/remove.svg'


const Form = ({ type, post, setPost, submit, handleSubmit }) => {

    const [inputs, setinputs] = useState([" "])

    const addInputs = () => {
        setinputs([...inputs, '']);
    };

    const removeInputs = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setinputs(newInputs);
    };

    const handleTextChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setinputs(newInputs);
        setPost({ ...post, todo: newInputs });
    };

    return (
        <div className="flex content-center justify-center border-2">
            <form
                onSubmit={handleSubmit}
                className="w-auto flex justify-center flex-col ">
                {inputs.map((text, index) => (
                    <div key={index} className="flex items-center">
                        <textarea
                            value={text}
                            className="text_areas"
                            onChange={(e) => handleTextChange(index, e.target.value, post)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removeInputs(index)}>
                            <Image
                                src={Cancel}
                                alt="sasd"
                                width={25}
                                className="hover:text-red-500" />
                        </button>
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        onClick={addInputs}
                        className="transform active:scale-75 hover:opacity- transition-all">
                        <Image
                            src={Plus}
                            alt="asd"
                            width={25} />
                    </button>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submit}
                        className="nav-bg p-1 rounded-xl text-white text-[0.75rem]">
                        {submit ? `${type}ing...` : type}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form