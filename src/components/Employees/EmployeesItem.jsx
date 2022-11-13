import { useDispatch, useSelector } from "react-redux"
import { editEmployee, selectEmployee, selectSelectedEmployees } from "../../app/slices/employeesSlice"
import { EditableCell } from "../EditableCell"


export const EmployeesItem = ({ employee }) => {

    const selectedEmployees = useSelector(selectSelectedEmployees)
    const dispatch = useDispatch()

    const handleChecked = (e) => {

        let selected = [...selectedEmployees];

        if (e.target.checked) {
            selected.push(employee);
        } else {
            selected.splice(employee.indexOf(employee), 1);
        }

        dispatch(selectEmployee(selected));
    }

    const isActive = selectedEmployees.includes(employee)

    return (
        <tr className={isActive ? 'active' : ''}>
            <td>
                <input type='checkbox' name="employee" checked={isActive} onChange={handleChecked}></input>
            </td>
            <EditableCell functionEdit={editEmployee} cell="surname" company={employee} />
            <EditableCell functionEdit={editEmployee} cell="name" company={employee} />
            <EditableCell functionEdit={editEmployee} cell="position" company={employee} />
        </tr>
    )
}
