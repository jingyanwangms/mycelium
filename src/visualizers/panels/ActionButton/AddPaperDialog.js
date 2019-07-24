/*globals define, $, d3, _*/
define([
    'q',
    'text!./templates/AddPaperDialog.html.ejs',
    'css!./styles/AddPaperDialog.css',
], function(
    Q,
    AddPaperTemplate,
) {
    'use strict';
    var DEFAULT_OPTS = {
        cols: 6,
        emptyMsg: 'No valid nodes'

    };

    var AddPaperDialog = function(opts) {
        this.opts = _.extend({}, DEFAULT_OPTS, opts);
        this._template = _.template(this.opts.html || AddPaperTemplate);
        this._dialog = null;
    };

     AddPaperDialog.prototype.show = function(schema) {
         // Populate the template
        var content,
            noNodeMsg;

        // Create the dialog and add the nodes
        const title = `Create new ${schema.type}`;

        content = this._template({
            options: this.opts,
            schema,
            title
        });

        this._dialog = $(content);
        const btn = this._dialog.find('.create');
        btn.on('click', () => {
            const data = {};
            schema.attributes.forEach(attr => {
                data[attr.name] = this._dialog.find(`#attr-${attr.name}`).val();
            });

            if (data.name) {
                this.onCreate(data);
                this._dialog.modal('hide');
            }
        });

        this._dialog.modal('show');
    }; 

    AddPaperDialog.prompt = function(node, opts) {
        var deferred = Q.defer();

        // Create the modal view with all possible subsequent nodes
        const schema = AddPaperDialog.getSchema(node);
        const dialog = new AddPaperDialog(opts);
        dialog.show(schema);
        dialog.onCreate = pair => {
            console.log('data is', pair);
            if (pair) {
                deferred.resolve(pair);
            }
        };
        return deferred.promise;
    };

    AddPaperDialog.getSchema = function(node) {
        const schema = {
            type: node.getAttribute('name'),
            attributes: [],
        };

        node.getValidAttributeNames()
            .forEach((name) => {
                var meta = node.getAttributeMeta(name),
                    type;

                if (meta) {  // skip meta-invalid properties
                    type = meta.type;
                    schema.attributes.push({
                        name: name,
                        type: type,
                        values: meta.enum,
                        value: node.getAttribute(name)
                    });
                }
            });

        return schema;
    };

    return AddPaperDialog;
});
