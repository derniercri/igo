
'use strict';

const _             = require('lodash');

const AdminUtils    = require('./AdminUtils');
const HtmlRenderer  = require('./HtmlRenderer');


//
module.exports = function(model, options) {

  if (_.isFunction(options.create)) {
    return options.create;
  }

  return function(req, res) {

    let fields = options.edit && options.new.fields ||
        options.form && options.form.fields ||
        options.fields;
    fields = AdminUtils.defaultFields(fields);
    
    AdminUtils.handleParams(fields, req.body);

    model.create(req.body, function(err, object) {
      if (err) {
        // error, return to form
        req.flash('warning', '' + err);
        req.cacheflash(options.name, req.body);
        return res.redirect(options.adminpath + '/' + options.plural + '/new');
      }
      res.redirect(options.adminpath + '/' + options.plural + '/' + object.id);
    });
  }
}
