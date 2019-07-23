
define([
], function(
) {
    const Actions = {};

    Actions.SubGraph = [
        {
            name: 'Add Paper',
            icon: 'add',
            action: function() {
                console.log('Bring up the dialog for creating new papers!');
            }
        }
    ];

    return Actions;
});
