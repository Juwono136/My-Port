import React from 'react'
import Layout from './Layout'
import EditPortfolio from '../components/Dashboard/EditPortfolio'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'

const DashboardPortfolio = () => {
    UseDocumentTitle("Portfolio")
    return (
        <Layout>
            <EditPortfolio />
        </Layout>
    )
}

export default DashboardPortfolio