import React from 'react'
import Layout from './Layout'
import DashboardPage from '../components/Dashboard/DashboardPage'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'

const Dashboard = () => {
    UseDocumentTitle("Dashboard")
    return (
        <Layout>
            <DashboardPage />
        </Layout>
    )
}

export default Dashboard