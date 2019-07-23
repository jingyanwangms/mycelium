
define([
    'decorators/EllipseDecorator/EasyDAG/EllipseDecorator.EasyDAGWidget',
    'css!./SemanticNodeDecorator.EasyDAGWidget.css',
    'd3'
], function (
    EllipseDecorator
) {

    'use strict';

    const SemanticNodeDecorator = function (options) {
        EllipseDecorator.apply(this, arguments);
    };

    SemanticNodeDecorator.prototype = Object.create(EllipseDecorator.prototype);

    SemanticNodeDecorator.prototype.getDisplayName = function() {
        if (this._node.attributes.hasOwnProperty("display_name")) {
            var display_name = this._node.attributes.display_name.value;
            if (display_name) {
                return display_name;
            }
        }
        if (this._node.attributes.name.value.length > 20) {
            return this._node.attributes.name.value.slice(0, 20) + "...";
        }
        return this._node.attributes.name.value;
    };

    SemanticNodeDecorator.prototype.expand =  SemanticNodeDecorator.prototype.condense;

    return SemanticNodeDecorator;
});
