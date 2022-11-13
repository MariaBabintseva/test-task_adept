import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanies, selectCompanies, selectCompany, selectSelectedCompanies } from "../../app/slices/companiesSlice"
import { CompaniesItem } from "./CompaniesItem"


export const CompaniesList = () => {
    const companies = useSelector(selectCompanies)
    const selectedCompanies = useSelector(selectSelectedCompanies)

    const [companiesList, setCompaniesList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(false)
    const limit = 15

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCompanies())
    }, [dispatch])

    useEffect(() => {
        setCompaniesList(companies.slice(0, currentPage * limit))
    }, [companies, currentPage, limit])

    useEffect(() => {
        if (fetching) {
            setCurrentPage(prev => prev + 1)
            setFetching(false)
        }
    }, [fetching])

    const checkedAllHandler = (e) => {
        let selected;

        if (e.target.checked) {
            selected = companies.map((item) => item.id);
        } else {
            selected = []
        }

        dispatch(selectCompany(selected));
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
                            <input type='checkbox' checked={selectedCompanies.length === companies.length} onChange={checkedAllHandler}></input>
                        </td>
                        <td>Название компании</td>
                        <td className="amount">Количество сотрутников</td>
                        <td>Адрес</td>
                    </tr>
                </thead>

                <tbody>
                    {companiesList.map((company, index) =>
                        <CompaniesItem key={company.id} indexCompany={index} company={company} />
                    )}
                </tbody>

            </table>

        </>
    )
}