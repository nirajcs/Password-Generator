import { useState } from "react";

export function useForm(initialValues){
    const [values,setValues] = useState(initialValues);

    return [
        values,
        (e)=>{
            setValues({
                ...values,
                [e.target.name]:
                e.target.type === 'checkbox' ? e.target.checked : e.target.value
            })
        }
    ]
}