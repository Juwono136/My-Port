import React from 'react'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'
import Layout from './Layout'
import EditResume from '../components/Dashboard/EditResume'

const DashboardResume = () => {
    UseDocumentTitle("Resume")
    return (
        <Layout>
            <EditResume />
        </Layout>
    )
}

export default DashboardResume