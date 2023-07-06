'use strict';
var noteController = require('../../controllers/note.controller.js');
var express = require('express');
var router = express.Router();

/* Get All Notes */
router.get('/', noteController.getAllNotes);

/* Create New Note */
router.all('/new-note', noteController.createNote);

/* Get Note Detail */
router.get('/note/:id/detail', noteController.getNote);

/* Edit Note. */
router.all('/note/:id/edit', noteController.editNote);

/* Delete Note. */
router.all('/note/:id/delete', noteController.deleteNote);

module.exports = router;