/*globals define*/

define([
    'widgets/EasyDAG/Buttons',
    'webgme-easydag/Icons',
    'text!./templates/node_modal.html.ejs',
], function(
    Buttons,
    Icons,
    nodeModalTemplate,
) {
    // TODO: Make a "show more" button

    const ShowMore = function(params) {
        Buttons.ButtonBase.call(this, params);
    };

    ShowMore.prototype = Object.create(Buttons.ButtonBase.prototype);
    ShowMore.prototype.BTN_CLASS = 'show-more';
    ShowMore.SIZE = 10;
    ShowMore.BORDER = 1;

    ShowMore.prototype._render = function() {
        const lineRadius = ShowMore.SIZE - ShowMore.BORDER,
            btnColor = '#90caf9';

        if (this.disabled) {
            btnColor = '#e0e0e0';
        }

        this.$el
            .append('circle')
            .attr('r', ShowMore.SIZE)
            .attr('fill', btnColor);

        // Show the 'code' icon
        Icons.addIcon('fullscreen-enter', this.$el, {
            radius: lineRadius
        });
    };

    ShowMore.prototype._onClick = function(item) {
        // TODO: display things like, authors, conference, etc. 
        // once they are added to item.desc
        var nodeModal = _.template(nodeModalTemplate)({node: item.desc});
        $(nodeModal).modal("show");
    };

    return {
        DeleteOne: Buttons.DeleteOne,
        ShowMore,
    };
});
