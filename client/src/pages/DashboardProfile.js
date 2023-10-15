import React from 'react'
import Layout from './Layout'
import EditProfile from '../components/Dashboard/EditProfile'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'

const DashboardProfile = () => {
    UseDocumentTitle("Profile")
    return (
        <Layout>
            <EditProfile />
        </Layout>
    )
}

export default DashboardProfile