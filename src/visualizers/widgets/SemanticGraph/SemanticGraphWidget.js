/*globals define, WebGMEGlobal*/

/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Mon Jul 22 2019 15:40:44 GMT-0700 (PDT).
 */

define([
    'widgets/EasyDAG/EasyDAGWidget',
    './lib/elk.bundled',
    './SelectionManager',
    './Connection',
    'underscore',
    'text!./templates/edge_prompt.html.ejs',  // example loading text w/ requirejs
    'css!./styles/SemanticGraphWidget.css',
    'css!./styles/hierarchy-select.min.css',
    './styles/hierarchy-select.min',
], function (
    EasyDAGWidget,
    ELK,
    SelectionManager,
    Connection,
    _,
    edgePromptTemplate,
    cssText,
    cssHr,
    jsHr,
) {
    'use strict';

    const elk = new ELK()
    const WIDGET_CLASS = 'semantic-graph';
    const ConnectionColors = [
        '#9e9e9e',  // grey
        '#ff8a65',  // deep-orange
        '#7986cb',  // indigo
        '#e57373',  // red
        '#e91e63',  // pink
    ];
    const ConnectionDashes = [ null, '4', '4 1', '4 1 2' ];
    const ConnectionStyles = ConnectionDashes
        .map(d => ConnectionColors.map(c => [c, d]))
        .reduce((l1, l2) => l1.concat(l2), []);

    function SemanticGraphWidget(logger, container) {
        EasyDAGWidget.apply(this, arguments);
        this.connectionStyles = {};
    }

    SemanticGraphWidget.prototype = Object.create(EasyDAGWidget.prototype);

    SemanticGraphWidget.prototype.SelectionManager = SelectionManager;
    SemanticGraphWidget.prototype.Connection = Connection;

    SemanticGraphWidget.prototype.initSvgDefs = function () {
        EasyDAGWidget.prototype.initSvgDefs.call(this);
        const defs = this._$svg.select("defs");

        // Define connection markers for each color
        ConnectionColors.forEach(color => {
            defs.append("marker")
                .attr("id", `arrowhead-${color}`)
                .attr('fill', color)
                .attr("refX", 5.25)
                .attr("refY", 2)
                .attr("markerWidth", 6)
                .attr("markerHeight", 4)
                .attr("orient", "auto")
                .append("path")
                        .attr("d", "M 0,0 V 4 L6,2 Z");
        });
    };

    SemanticGraphWidget.prototype.startConnectionFrom = function (item) {
        const validPairs = this.getConnectableNodes(item.id);
        this.startConnection(item, validPairs);
    };

    SemanticGraphWidget.prototype.startConnectionTo = function (item) {
        const validPairs = this.getConnectableNodes(item.id);
        this.startConnection(item, validPairs, true);
    };

    SemanticGraphWidget.prototype.startConnection = function (src, dsts, reverse) {
        var onClick = (clicked, conns) => {
                var srcId = !reverse ? src.id : clicked.id,
                    dstId = !reverse ? clicked.id : src.id;

                d3.event.stopPropagation();
                this.resetConnectingState();

                var all_connections = this.getAllConnectionTypes();
                // preparing connections to be shown
                var conns_dict = {};
                for (var i = 0; i < all_connections.length; i++) {
                    var cur_con = all_connections[i];
                    if (!conns_dict.hasOwnProperty(cur_con.base)) {
                        conns_dict[cur_con.base] = [];
                    }
                    conns_dict[cur_con.base].push(cur_con.name);                        
                }
                function prepareConsDict(conns_dict, key, level) {
                    var prepared_cons = [];
                    prepared_cons.push([key, level]);
                    if (!conns_dict.hasOwnProperty(key)) {
                        return prepared_cons;
                    }
                    var cur_list = conns_dict[key];
                    for (var i = 0; i < cur_list.length; i++) {
                        var lower_list = prepareConsDict(conns_dict, cur_list[i], level + 1);
                        prepared_cons.push(...lower_list);
                    }
                    return prepared_cons;
                }
                var prepared_cons = [];
                var first_dict = conns_dict["Edge"];
                for (var i = 0; i < first_dict.length; i++) {
                    prepared_cons.push(...prepareConsDict(conns_dict, first_dict[i], 1));
                }
                // TODO: exclude author and such

                var edgePrompt = _.template(edgePromptTemplate)({edge_types: prepared_cons});
                var edgePromptDOM = $(edgePrompt);
                edgePromptDOM.find('#relation-dropdown').hierarchySelect({
                    width: 459
                });
                edgePromptDOM.find("#select-button").click(() => {
                    var selected_name = $(".selected-label").text();
                    var conn_id = conns.find(x => x.name === selected_name).id;
                    // TODO: this does not create the connection!
                    this.connectNodes(srcId, dstId, conn_id);
                    edgePromptDOM.on('hidden.bs.modal', function (e) {
                        edgePromptDOM.remove();
                    });
                    edgePromptDOM.modal("hide");
                });
                edgePromptDOM.find("#add-new-button").click(() => {
                    var selected_name = $(".selected-label").text();
                    var newConnId = this.createConnectionType($("#new-relation").val(), selected_name);
                    this.connectNodes(srcId, dstId, newConnId);
                    edgePromptDOM.on('hidden.bs.modal', function (e) {
                        edgePromptDOM.remove();
                    });                
                    edgePromptDOM.modal("hide");
                });
                edgePromptDOM.modal("show");
            },
            pairs = dsts.map(pair => [this.items[pair.node.id], pair.conns]);

        this.resetConnectingState();
        this._connectionSrc = src;
        const tuples = pairs.map(pair => {
            var item = pair[0],
                connIds = pair[1];

            return [
                item,
                connIds,
                item.showIcon({
                    x: 0.5,
                    y: !reverse ? 0 : 1,
                    icon: 'chevron-bottom'
                })
            ];
        });

        tuples.forEach(pair => pair[2].on('click', () => onClick(pair[0], pair[1])));

        // Create the 'create-new' icon for the src
        const srcIcon = src.showIcon({
            x: 0.5,
            y: !reverse ? 1 : 0,
            icon: 'plus'
        });
        srcIcon.on('click', () => {
            d3.event.stopPropagation();
            this.resetConnectingState();
            this.onAddButtonClicked(src, reverse);
        });

        this._connectionOptions = tuples.map(tuple => [tuple[0], tuple[2]]);
        this._connectionSrc = [src, srcIcon];

        this._connecting = true;
    };

    SemanticGraphWidget.prototype.refreshScreen = function () {
        if (!this.active) {
            return;
        }

        // WRITE UPDATES
        // Update the locations of all the nodes

        const nodes = Object.values(this.items)
            .map(item => _.pick(item, ['id', 'width', 'height']));
        const edges = Object.values(this.connections)
            .map(conn => ({id: conn.id, sources: [conn.src], targets: [conn.dst]}));

        const graph = {
            id: "root",
            layoutOptions: {
                'elk.algorithm': 'mrtree',
                'elk.spacing.nodeNode': 50,
            },
            children: nodes,
            edges: edges
        };

        return elk.layout(graph)
            .then(graph => {
                this.queueFns([
                    this.setConnectionStyles.bind(this),
                    this.updateTranslation.bind(this),
                    this.refreshItems.bind(this, graph),
                    this.refreshConnections.bind(this, graph),
                    this.selectionManager.redraw.bind(this.selectionManager),
                    this.updateContainerWidth.bind(this),
                    this.refreshExtras.bind(this)
                ]);
            });
    };

    SemanticGraphWidget.prototype.updateTranslation = function () {
        var zoom = this._zoomValue || 1,
            shift = {};

        if (!this.centerContent) {
            return;
        }

        // Make sure it is shifted at least 20 px in each direction
        shift.x = 0;  // This is a hack...
        //shift.x = Math.max(TOP_LEFT_MIN_MARGIN, this._getTranslation('x'));
        shift.y = Math.max(20, this._getTranslation('y'));

        // Divide actual width by zoom value
        this._logger.debug(`Updating translation: ${shift.x}, ${shift.y}`);
        console.log(`Updating translation: ${shift.x}, ${shift.y}`);
        this.$svg
            .attr('transform', `translate(${shift.x},${shift.y}) scale(${zoom})`);
    };

    SemanticGraphWidget.prototype.setConnectionStyles = function () {
        // Remove styles for unused types (if we switch projects or something)
        const currentTypes = this.getAllConnectionTypes();
        const prevTypes = Object.keys(this.connectionStyles);
        const oldTypes = _.difference(prevTypes, currentTypes);
        oldTypes.forEach(type => delete this.connectionStyles[type]);

        const usedStyles = Object.values(this.connectionStyles);
        const remainingStyles = _.difference(ConnectionStyles, usedStyles);

        currentTypes.map(data => data.name)
            .forEach(type => {
                if (!this.connectionStyles[type]) {
                    if (remainingStyles.length === 0) {
                        console.warn('Used all existing styles. Reusing styles for edges.');
                        remainingStyles = ConnectionStyles.slice();
                    }

                    this.connectionStyles[type] = remainingStyles.shift();
                }
            });
    };

    SemanticGraphWidget.prototype.refreshExtras = function () {
        this.updateEmptyMsg();
        // TODO: Refresh the legend
    };

    SemanticGraphWidget.prototype.refreshConnections = function (graph) {
        const connIds = Object.keys(this.connections);
        this._logger.debug(`Refreshing ${connIds.length} connections`);

        for (let i = graph.edges.length; i--;) {
            const id = graph.edges[i].id;
            if (!graph.edges[i].sections && graph.edges[i].sources[0] === graph.edges[i].targets[0]) {
                console.warn(`Unable to render edge ${id}. Self-connections not supported by current layout.`);
                continue;
            }

            const conn = this.connections[id];
            conn.points = graph.edges[i].sections
                .map(sec => sec.endPoint);

            conn.points.unshift(graph.edges[i].sections[0].startPoint);

            const style = this.connectionStyles[conn.desc.baseName];
            conn.setStyle.apply(conn, style);
            conn.redraw();
        }
    };

    SemanticGraphWidget.prototype.refreshItems = function (graph) {
        this._logger.info(`Redrawing ${graph.children.length} nodes`);
        for (let i = graph.children.length; i--;) {
            const id = graph.children[i].id;
            const item = this.items[id];
            item.x = graph.children[i].x + item.width/2;
            item.y = graph.children[i].y + item.height/2;
            item.redraw(this._zoomValue);
        }
    };

    return SemanticGraphWidget;
});
