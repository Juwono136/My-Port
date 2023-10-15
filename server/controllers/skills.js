import Skill from "../models/skill.js"

export const getSkills = async (req, res) => {
    try {
        const userSkills = await Skill.find(req.user)

        const getSkillsInfo = userSkills.map(skill => ({
            id: skill._id,
            skill_name: skill.skill_name,
            level: skill.level,
        }))

        res.json(getSkillsInfo)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createSkill = async (req, res) => {
    try {
        const { skill_name, level } = req.body

        if (skill_name === "" || level === "") return res.status(400).json({ message: "Please add in all fields." })

        if (skill_name && skill_name.length > 40) return res.status(400).json({ message: "Skill name cannot exceed 40 characters." });

        const skill = await Skill.create({
            skill_name,
            level,
            userId: req.user.id
        })

        res.json(skill)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id)
        const { skill_name, level } = req.body

        if (!skill) return res.status(400).json({ message: "Skill not found." })

        if (!req.user) return res.status(401).json({ message: "User not found." })

        if (skill_name && skill_name.length > 40) return res.status(400).json({ message: "Skill name cannot exceed 40 characters." });

        if (skill_name === "") return res.status(400).json({ message: "Skill name cannot be empty." });

        const updateSkill = {
            skill_name,
            level
        }

        await Skill.findByIdAndUpdate(req.params.id, updateSkill)
        res.json({ message: "Skill updated." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id)

        res.json({ message: "Skill Deleted." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}