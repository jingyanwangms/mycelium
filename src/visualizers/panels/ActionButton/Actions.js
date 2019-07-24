
define([
    './AddPaperDialog'
], function(
    AddPaperDialog
) {
    const Actions = {};

    Actions.SubGraph = [
        {
            name: 'Add Paper',
            icon: 'add',
            action: function() {
                console.log('Bring up the dialog for creating new papers!');
                // TODO: Get the schema for the node
                const paper = this.client.getAllMetaNodes()
                    .find(node => node.getAttribute('name') === 'Paper');

                AddPaperDialog.prompt(paper)
                    .then(attrs => {
                        const msg = `Create new paper: ${attrs.name}`;
                        this.client.startTransaction(msg);

                        const baseId = paper.getId();
                        const parentId = this._currentNodeId;
                        const nodeId = this.client.createNode({parentId, baseId});

                        Object.keys(attrs).forEach(k => {
                            const val = attrs[k];
                            this.client.setAttribute(nodeId, k, val);
                        });

                        this.client.completeTransaction();
                    });
            }
        }
    ];

    return Actions;
});
