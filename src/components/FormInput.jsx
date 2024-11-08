import { forwardRef } from "react";
import React from 'react'

const FormInput = forwardRef((
    {type, placeholder, onChange, onBlur, name, label, error, children}, ref
)=>{
    const errorClassLabel = error?"p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400":"p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    const errorClassInput = error?"p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300":"p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"

    return(
        <div className="mb-6">
            <label htmlFor="email" className={errorClassLabel}>{label}</label>
            <input type={type} placeholder={placeholder} ref={ref} onChange={onChange} onBlur={onBlur} name={name} className={errorClassInput} />
            {children}
        </div>
    )
})

export default FormInput