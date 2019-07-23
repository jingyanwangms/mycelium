
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
        // TODO: Access the attributes via `this._node`. For example,
        // the value of the name attribute can be retrieved using:
        //
        //       this._node.attributes.name.value
        //
        return this._node.attributes.name.value;
    };

    return SemanticNodeDecorator;
});
