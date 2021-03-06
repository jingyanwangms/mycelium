// DO NOT EDIT THIS FILE
// This file is automatically generated from the webgme-setup-tool.
'use strict';


var config = require('webgme/config/config.default'),
    validateConfig = require('webgme/config/validator');

// The paths can be loaded from the webgme-setup.json
config.visualization.layout.basePaths.push(__dirname + '/../node_modules/webgme-chflayout/src/layouts');
config.visualization.decoratorPaths.push(__dirname + '/../src/decorators');
config.visualization.decoratorPaths.push(__dirname + '/../node_modules/webgme-easydag/src/decorators');
config.seedProjects.basePaths.push(__dirname + '/../src/seeds/SemanticGraph');
config.seedProjects.basePaths.push(__dirname + '/../src/seeds/SemanticGraph-test');



config.visualization.panelPaths.push(__dirname + '/../node_modules/webgme-easydag/src/visualizers/panels');
config.visualization.panelPaths.push(__dirname + '/../node_modules/webgme-fab/src/visualizers/panels');
config.visualization.panelPaths.push(__dirname + '/../node_modules/webgme-autoviz/src/visualizers/panels');
config.visualization.panelPaths.push(__dirname + '/../src/visualizers/panels');




// Visualizer descriptors
config.visualization.visualizerDescriptors.push(__dirname + '/../src/visualizers/Visualizers.json');
// Add requirejs paths
config.requirejsPaths = {
  'CHFLayout': 'node_modules/webgme-chflayout/src/layouts/CHFLayout',
  'EllipseDecorator': 'node_modules/webgme-easydag/src/decorators/EllipseDecorator',
  'AutoViz': 'panels/AutoViz/AutoVizPanel',
  'FloatingActionButton': 'panels/FloatingActionButton/FloatingActionButtonPanel',
  'EasyDAG': 'panels/EasyDAG/EasyDAGPanel',
  'panels': './src/visualizers/panels',
  'widgets': './src/visualizers/widgets',
  'panels/AutoViz': './node_modules/webgme-autoviz/src/visualizers/panels/AutoViz',
  'widgets/AutoViz': './node_modules/webgme-autoviz/src/visualizers/widgets/AutoViz',
  'panels/FloatingActionButton': './node_modules/webgme-fab/src/visualizers/panels/FloatingActionButton',
  'widgets/FloatingActionButton': './node_modules/webgme-fab/src/visualizers/widgets/FloatingActionButton',
  'panels/EasyDAG': './node_modules/webgme-easydag/src/visualizers/panels/EasyDAG',
  'widgets/EasyDAG': './node_modules/webgme-easydag/src/visualizers/widgets/EasyDAG',
  'webgme-easydag': './node_modules/webgme-easydag/src/common',
  'webgme-fab': './node_modules/webgme-fab/src/common',
  'webgme-autoviz': './node_modules/webgme-autoviz/src/common',
  'webgme-chflayout': './node_modules/webgme-chflayout/src/common',
  'mycelium': './src/common'
};

config.visualization.layout.default = 'CHFLayout';
config.mongo.uri = 'mongodb://127.0.0.1:27017/mycelium';
validateConfig(config);
module.exports = config;
