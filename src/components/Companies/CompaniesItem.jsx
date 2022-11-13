import { useDispatch, useSelector } from "react-redux"
import { editCompany, selectCompany, selectSelectedCompanies } from "../../app/slices/companiesSlice"
import { EditableCell } from "../EditableCell"

export const CompaniesItem = ({ company }) => {

    const selectedCompanies = useSelector(selectSelectedCompanies)
    const dispatch = useDispatch()

    const handleChecked = (e) => {

        let selected = [...selectedCompanies];

        if (e.target.checked) {
            selected.push(company.id);
        } else {
            selected.splice(selected.indexOf(company.id), 1);
        }

        dispatch(selectCompany(selected));
    }

    const isActive = selectedCompanies.includes(company.id)

    return (
        <tr className={isActive ? 'active' : ''}>
            <td>
                <input type='checkbox' name="company" checked={selectedCompanies.includes(company.id)} onChange={handleChecked}></input>
            </td>
            <EditableCell functionEdit={editCompany} cell="name" company={company} />
            <td className="amount">{company.amountEmployees}</td>
            <EditableCell functionEdit={editCompany} cell="address" company={company} />

        </tr>
    )
}
