/*globals define, WebGMEGlobal*/

/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Mon Jul 22 2019 15:40:44 GMT-0700 (PDT).
 */

define([
    'widgets/EasyDAG/EasyDAGWidget',
    'text!./styles/SemanticGraphWidget.css',  // example loading text w/ requirejs
    'css!./styles/SemanticGraphWidget.css'
], function (
    EasyDAGWidget,
    cssText
) {
    'use strict';

    var WIDGET_CLASS = 'semantic-graph';

    function SemanticGraphWidget(logger, container) {
        EasyDAGWidget.apply(this, arguments);
    }

    SemanticGraphWidget.prototype = Object.create(EasyDAGWidget.prototype);

    /*
    SemanticGraphWidget.prototype.refreshScreen = function () {
        if (!this.active) {
            return;
        }

        // WRITE UPDATES
        // Update the locations of all the nodes

        // TODO: Compute the layout then call the following function
        this.queueFns([
            this.updateTranslation.bind(this),
            this.refreshItems.bind(this),
            this.refreshConnections.bind(this),
            this.selectionManager.redraw.bind(this.selectionManager),
            this.updateContainerWidth.bind(this),
            this.refreshExtras.bind(this)
        ]);
    };

    SemanticGraphWidget.prototype.refreshConnections = function () {
        const connIds = Object.keys(this.connections);
        this._logger.debug(`Refreshing ${connIds.length} connections`);
        for (let i = connIds.length; i--;) {
            // TODO: set the points
            //this.connections[connIds[i]].points = [];
            this.connections[connIds[i]].redraw();
        }
    };

    SemanticGraphWidget.prototype.refreshItems = function () {
        // Redraw items
        const nodeIds = Object.keys(this.items);
        this._logger.info(`Redrawing ${nodeIds.length} nodes`);
        for (let i = nodeIds.length; i--;) {
            // TODO: Set the x, y value for the item
            //this.items[nodeIds[i]].x = ;
            //this.items[nodeIds[i]].y = ;
            this.items[nodeIds[i]].redraw(this._zoomValue);
        }

    };
    */

    return SemanticGraphWidget;
});
