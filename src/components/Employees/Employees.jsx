import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCompanies } from "../../app/slices/companiesSlice";
import { addEmployee, fetchEmployees, removeEmployee, selectEmployee, selectEmployees, selectSelectedEmployees } from "../../app/slices/employeesSlice";
import { EmployeesList } from "./EmployeesList";

export const Employees = () => {
    const companies = useSelector(selectCompanies)
    const selectedEmployees = useSelector(selectSelectedEmployees)

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('');
    const [showBlockAdd, setShowBlockAdd] = useState(false)

    const dispatch = useDispatch()

    /*     useEffect(() => {
            dispatch(fetchEmployees())
        }, [dispatch]) */


    const addEmployeeHandler = () => {
        const dataEmployee = {
            surname: surname,
            name: name,
            idCompany: +selectedCompany,
            position: position
        }
        dispatch(addEmployee(dataEmployee))

        setSurname('')
        setName('')
        setPosition('')
    }

    const removeHandler = () => {
        dispatch(removeEmployee(selectedEmployees))
        dispatch(selectEmployee([]));
    }

    const selectHandler = (e) => {
        setSelectedCompany(e.target.value)
    }

    return (
        <>
            <div className="table">


                <div className="toolbar">
                    <button className="btn-action btn-add" onClick={() => setShowBlockAdd(!showBlockAdd)}>Добавить</button>
                    <button className="btn-action btn-remove" disabled={selectedEmployees.length === 0} onClick={removeHandler}>Удалить</button>

                    {showBlockAdd &&
                        <div className="block-add">
                            <div className="block_enter-data">
                                <input type='text' placeholder='Фамилия' value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                                <input type='text' placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <select className="select-company" value={selectedCompany} onChange={selectHandler}>
                                    <option>Выберете компанию</option>
                                    {companies.map((item) =>
                                        <option value={item.id}>{item.name}</option>
                                    )}

                                </select>
                                <input type='text' placeholder='Должность' value={position} onChange={(e) => setPosition(e.target.value)}></input>
                            </div>

                            <div>
                                <button className="btn-action btn-save" onClick={addEmployeeHandler}>Сохранить</button>
                            </div>

                        </div>
                    }
                </div>

                <EmployeesList />
            </div>

        </>
    )
}