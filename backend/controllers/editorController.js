const User = require('../model/Editor');
const mongoose = require('mongoose');

const getAllEditors = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

/*
const deleteEditor = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}


const updateEditor = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id}).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    const editor = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    res.status(200).json(editor)
}
*/

const updateEditor = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not a valid id'})
    }

    try {
        const editor = await User.findByIdAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(editor)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteEditor = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not a valid id'})
    }

    try {
        const editor = await User.findByIdAndDelete({_id: id})
        res.status(200).json(editor)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getEditor = async (req, res) => {
    if (!req?.params?.username) return res.status(400).json({ "message": 'User name required' });
    const user = await User.findOne({ username: req.params.username }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllEditors,
    deleteEditor,
    updateEditor,
    getEditor
}