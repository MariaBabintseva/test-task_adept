import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, removeCompany, selectCompany, selectSelectedCompanies } from "../../app/slices/companiesSlice";
import { CompaniesList } from "./CompaniesList";

export const Companies = () => {
    const selectedCompanies = useSelector(selectSelectedCompanies)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [showBlockAdd, setShowBlockAdd] = useState(false)

    const dispatch = useDispatch()

    const addCompanyHandler = () => {
        const dataCompany = {
            name: name,
            amountEmployees: 0,
            address: address
        }
        dispatch(addCompany(dataCompany))

        setName('')
        setAddress('')
        setShowBlockAdd(false)
    }

    const removeHandler = () => {
        dispatch(removeCompany(selectedCompanies))
        dispatch(selectCompany([]))
    }
    return (
        <>
            <div className="table">
                <div className="toolbar">
                    <button className="btn-action btn-add" onClick={() => setShowBlockAdd(!showBlockAdd)}>Добавить</button>
                    <button className="btn-action btn-remove" disabled={selectedCompanies.length === 0} onClick={removeHandler}>Удалить</button>

                    {showBlockAdd &&
                        <div className="block-add">
                            <div className="block_enter-data">
                                <input type='text' placeholder='Название компании' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <input type='text' placeholder='Адрес' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            </div>

                            <button className="btn-action btn-save" onClick={addCompanyHandler}>Сохранить</button>
                        </div>
                    }
                </div>

                <CompaniesList />
            </div>

        </>
    )
}