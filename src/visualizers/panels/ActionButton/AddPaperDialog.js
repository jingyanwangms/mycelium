/*globals define, $, d3, _*/
define([
    'q',
    'text!./AddPaperDialog.html.ejs',
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
        this.containers = [];
        this.types = [  {
            "type": "Paper",
            "attributes": [
              {
                "name": "name",
                "type": "string",
                "value": "P2"
              },
              {
                "name": "displayName",
                "type": "string",
                "value": ""
              },
              {
                "name": "description",
                "type": "string",
                "value": ""
              }
            ]
          },
          {
            "type": "SubGraph",
            "attributes": [
              {
                "name": "name",
                "type": "string",
                "value": "SubGraph"
              }
            ]
          },
          {
            "type": "Person",
            "attributes": [
              {
                "name": "name",
                "type": "string",
                "value": "Some Researcher"
              }
            ]
          }
        ]
    };

     AddPaperDialog.prototype.show = function(title, pairs) {
         // Populate the template
        var container,
            content,
            noNodeMsg;

        // Create the dialog and add the nodes
        //this.containers = this.types.map(p => new Container(p));
        this.opts.tabs = this.types;
        content = this._template({
            options: this.opts,
            title
        });

        this._dialog = $(content);
        container = this._dialog.find('#node-container');

        if (this.types.length) {
            if (this.opts.tabs) {
                this._addTabbed(container);
            } else {
                this._addBasic(container);
            }

/*             this.containers
                .forEach(node => {
                    node.html.onclick = this.onNodeClicked.bind(this, node.pair);
                }); */
        } else {
            noNodeMsg = $('<div>', {class: 'empty-msg'});
            noNodeMsg.text(this.opts.emptyMsg);
            container.append(noNodeMsg);
        } 
        this._dialog.modal('show');
    }; 

    AddPaperDialog.prototype._addTabbed = function(container) {
        var pane,
            containersByTab = {},
            className;

        this.opts.tabs.forEach((tab, i) => {
            className = 'tab-pane';
            if (i === 0) {
                className += ' active';
            }

            pane = $('<div>', {
                id: tab,
                class: className,
            });

            // Add the nodes to the pane
/*             containersByTab[tab] = this.containers
                .filter(cntr => this.opts.tabFilter(tab, cntr.pair));

            containersByTab[tab].forEach(cntr => pane.append(cntr.html)); */
            pane.append('<form>');
            tab.attributes.forEach(attr => {
                pane.append('<div class="form-group">');
                pane.append('<label>' + attr.name + '</label>');
                pane.append('<input type="' + attr.type + '" class="form-control">');
                pane.append('</div>');
            });
            pane.append('</form>');

            container.append(pane);
        });

        // Update the sizes of nodes in the first tab
/*         this._dialog.on('shown.bs.modal', () =>
            containersByTab[this.opts.tabs[0]].forEach(cntr => cntr.updateSize())
        ); */

        this._dialog.on('hide.bs.modal', () => this.empty());
        this._dialog.on('hidden.bs.modal', () => this._dialog.remove());
        

/*         this._dialog.on('shown.bs.tab', 'a[data-toggle="tab"]', (event) => {
            var tabName = event.target.getAttribute('href').substring(1);
            containersByTab[tabName].forEach(cntr => cntr.updateSize());
        }); */
    };


    AddPaperDialog.prompt = function(nodes, opts) {
        var deferred = Q.defer();

        // Create the modal view with all possible subsequent nodes
        var dialog = new AddPaperDialog(opts);
        dialog.show(null, nodes);
        dialog.onSelect = pair => {
            if (pair) {
                deferred.resolve(pair);
            }
        };
        return deferred.promise;
    };
    return AddPaperDialog;
});