import React from 'react'
import Layout from './Layout'
import EditSkills from '../components/Dashboard/EditSkills'
import UseDocumentTitle from '../components/utils/useDocumentTitle/UseDocumentTitle'

const DashboardSkills = () => {
    UseDocumentTitle("Skill")
    return (
        <Layout>
            <EditSkills />
        </Layout>
    )
}

export default DashboardSkills