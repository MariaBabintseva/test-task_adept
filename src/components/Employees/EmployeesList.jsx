import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedCompanies } from "../../app/slices/companiesSlice"
import { fetchEmployees, selectEmployee, selectEmployees, selectSelectedEmployees } from "../../app/slices/employeesSlice"
import { EmployeesItem } from "./EmployeesItem"


export const EmployeesList = () => {
    const employees = useSelector(selectEmployees)
    const selectedEmployees = useSelector(selectSelectedEmployees)
    const selectedCompanies = useSelector(selectSelectedCompanies)

    const [filteredEmployees, setFilteredEmployees] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(false)
    const limit = 15

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    useEffect(() => {
        setFilteredEmployees(employees.filter((employee) => selectedCompanies.includes(employee.idCompany)).slice(0, currentPage * limit))
    }, [employees, selectedCompanies, currentPage, limit])

    useEffect(() => {
        if (fetching) {
            setCurrentPage(prev => prev + 1)
            setFetching(false)
        }
    }, [fetching])

    const checkedAllHandler = (e) => {
        let selected;

        if (e.target.checked) {
            selected = [...filteredEmployees];
        } else {
            selected = []
        }

        dispatch(selectEmployee(selected));
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        const pageHeight = e.target.documentElement.scrollHeight
        const currentScroll = e.target.documentElement.scrollTop
        const visibleHeight = window.innerHeight

        if (pageHeight - (currentScroll + visibleHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <>
            <table>
                <thead className="table-head">
                    <tr>
                        <td className="cell-checkbox">
                            <input type='checkbox' checked={selectedEmployees.length !== 0 && selectedEmployees.length === filteredEmployees.length} onChange={checkedAllHandler}></input>
                        </td>
                        <td>Фамилия</td>
                        <td>Имя</td>
                        <td>Должность</td>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.map((employee, index) =>
                        <EmployeesItem key={employee.id} indexCompany={index} employee={employee} />
                    )}
                </tbody>

            </table>

        </>
    )
}