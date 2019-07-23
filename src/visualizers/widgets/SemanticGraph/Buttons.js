/*globals define*/

define([
    'widgets/EasyDAG/Buttons',
    'webgme-easydag/Icons',
], function(
    Buttons,
    Icons,
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
        // TODO: Show the modal with the details about the item
        console.log(item);
        console.log('item data is', item.desc);
    };

    return {
        DeleteOne: Buttons.DeleteOne,
        ShowMore,
    };
});
