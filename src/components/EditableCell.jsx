import { useState } from "react"
import { useDispatch } from "react-redux"

export const EditableCell = ({ cell, company, functionEdit }) => {
    const [redactField, setRedactField] = useState(false)
    const [value, setValue] = useState(company[cell])

    const dispatch = useDispatch()

    const editHandler = (e) => {
        setValue(e.target.value)
    }

    const saveEditedHandler = (e) => {
        setRedactField(false)
        dispatch(functionEdit({ id: company.id, value: value, field: e.target.name }))
    }
    return (
        <>
            {!redactField ?
                <td onClick={() => setRedactField(true)}>{value}</td>
                :
                <td className="redact-field">
                    <input name={cell} autoFocus={true} value={value} onChange={(e) => editHandler(e)} onBlur={(e) => saveEditedHandler(e)}></input>
                </td>

            }
        </>
    )
}