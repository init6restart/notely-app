'use strict';
const noteForm = require('../forms/note.form.js');
const db = require('../models/index.js');
const note = require('../models/note.js');
const noteModel = note(db.sequelize, db.Sequelize.DataTypes);
const date = new Date();

/* Get all notes */
const getAllNotes = function (req, res) {
  noteModel.findAll({
    where: { isDeleted: false }
  }).then(function (notes) {
      res.render(
        
        'index',
        {
          title: 'Note List',
          year: date.getFullYear(),
          notes: notes
        });
    });
};

/* Create a new note */
const createNote = function (req, res) {
  if (req.method === 'POST') {
    noteForm.handle(req, {
      success: function (form) {
        noteModel.create({
          subject: form.data.subject,
          detail: form.data.detail
        });
      }
    });
    res.redirect('/');
  } else {
    res.render(
      'create_note',
      {
      title: 'Create Note',
      year: date.getFullYear(),
      form: noteForm
    });
  }
};

/* Get Note */
const getNote = function (req, res) {
  noteModel.findByPk(req.params.id)
    .then((note) => {
      res.render(
        'note_detail',
        {
          title: 'Note Detail',
          year: date.getFullYear(),
          note: note
        });
    });
};

/* Update Note */
const editNote = function (req, res) {
  if (req.method === 'POST') {

    noteForm.handle(req, {
      success: function (form) {
        noteModel.update({
          subject: form.data.subject,
          detail: form.data.detail
        },
          {
            where: { id: req.params.id }
          });
      }
    });
    res.redirect('/');
  } else {
    noteModel.findByPk(req.params.id)
      .then(note => {
        res.render(
          'edit_note',
          {
            title: 'Edit Note',
            year: date.getFullYear(),
            form: noteForm.bind(note),
            noteId: note.id
          });
      });
  }
};

/* Delete Note */
const deleteNote = function (req, res) {
  noteModel.update({
    isDeleted: true
  },
    {
      where: { id: req.params.id }
    }).then(() => {
      res.redirect('/');
    });
};

/* Exports all methods */
module.exports = {
  getAllNotes: getAllNotes,
  createNote: createNote,
  getNote: getNote,
  editNote: editNote,
  deleteNote: deleteNote
};