
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

    return SemanticNodeDecorator;
});
