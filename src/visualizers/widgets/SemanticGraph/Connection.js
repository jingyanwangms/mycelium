define([
    'widgets/EasyDAG/Connection',
], function(
    ConnectionBase
) {

    const lineFn = d3.svg.line()
        .x(d => d.x)
        .y(d => d.y)
        .interpolate('linear');

    const Connection = function() {
        ConnectionBase.apply(this, arguments);
        this.color = 'black';
        this.dasharray = null;
    };

    Connection.prototype = Object.create(ConnectionBase.prototype);

    Connection.prototype.setStyle = function(color, dasharray) {
        this.color = color;
        this.dasharray = dasharray;
    };

    Connection.prototype.redraw = function() {
        this.$path.attr('d', lineFn(this.points))
            .transition()
            .attr('stroke-width', 2)
            .attr('stroke', this.color)
            .attr('fill', 'none')
            .attr('stroke-dasharray', this.dasharray)
            .attr('marker-end', `url(#arrowhead-${this.color})`);

        // Update the x,y,width, height from the points
        this.updateBounds();
    };

    return Connection;
});
