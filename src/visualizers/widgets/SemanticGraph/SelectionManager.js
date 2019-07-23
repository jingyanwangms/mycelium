/*globals define*/

define([
    'widgets/EasyDAG/SelectionManager',
    './Buttons',
], function(
    ManagerBase,
    Buttons
) {

    const SelectionManager = function() {
        ManagerBase.apply(this, arguments);
    };

    SelectionManager.prototype = Object.create(ManagerBase.prototype);

    SelectionManager.prototype.createActionButtons = function(width, height) {
        ManagerBase.prototype.createActionButtons.call(this, width, height);

        // Check that the base type
        const btn = new Buttons.ShowMore({
            $pEl: this.$selection,
            context: this._widget,
            title: 'View details',
            item: this.selectedItem,
            x: width,
            y: 0
        });

        return btn;
    };

    return SelectionManager;
});
