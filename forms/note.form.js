'use strict';
let forms = require('forms');
let fields = forms.fields;
let widgets = forms.widgets;

let noteForm = forms.create({
  subject: fields.string({
    widget: widgets.text({
      classes: ['form-control note-editor__subject-input'],
      required: true
    }),
    cssClasses: {
      label: ['note-editor__input-label']
    }
  }),
  detail: fields.string({
    widget: widgets.textarea({
      classes: ['form-control note-editor__detail-input'],
      rows: 12,
      cols: 20
    }),
    cssClasses: {
      label: ['note-editor__input-label']
    }
  })
});

module.exports = noteForm;