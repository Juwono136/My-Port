import Portfolio from "../models/portfolio.js";

export const getPortfolios = async (req, res) => {
    try {
        const userPortfolio = await Portfolio.find(req.user)

        const getPortfolios = userPortfolio.map(portfolio => ({
            id: portfolio._id,
            project_title: portfolio.project_title,
            project_desc: portfolio.project_desc,
            project_link: portfolio.project_link,
            tags: portfolio.tags,
            project_image: portfolio.project_image
        }))

        res.json(getPortfolios)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createPortfolio = async (req, res) => {
    try {
        const { project_image, project_title, project_desc, project_link, tags } = req.body

        if (project_title === "" || project_desc === "" || project_link === "" || tags === "" || project_image === "") return res.status(400).json({ message: "Please add in all fields." })

        if (project_title && project_title.length > 250) return res.status(400).json({ message: "Project title is too long." })

        const portfolio = await Portfolio.create({
            userId: req.user.id,
            project_title,
            project_desc,
            project_link,
            tags,
            project_image
        })

        res.json(portfolio)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id)
        const { project_image, project_title, project_desc, project_link, tags } = req.body

        if (!portfolio) return res.status(400).json({ message: "Project not found." })

        if (!req.user) return res.status(401).json({ message: "User not found." })

        if (project_title === "" || project_desc === "" || project_link === "" || tags === "" || project_image === "") return res.status(400).json({ message: "Please add in all fields." })

        if (project_title && project_title.length > 150) return res.status(400).json({ message: "Project title is too long." })

        const updatePortfolio = {
            project_title,
            project_desc,
            project_link,
            tags,
            project_image
        }

        await Portfolio.findByIdAndUpdate(req.params.id, updatePortfolio)

        res.json({ message: "Portfolio updated." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePortfolio = async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id)

        res.json({ message: "Portfolio deleted." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}