const express = require('express');
const router = express.Router();
const editorController = require('../../controllers/editorController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Editor), editorController.getAllEditors)
    

router.route('/:username')
    .get(verifyRoles(ROLES_LIST.Editor), editorController.getEditor)
    

router.route('/:id')
    .patch(verifyRoles(ROLES_LIST.Editor), editorController.updateEditor)
    .delete(verifyRoles(ROLES_LIST.Editor), editorController.deleteEditor)
    
module.exports = router;