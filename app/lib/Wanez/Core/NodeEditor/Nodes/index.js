/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

libWZ.Core.NodeEditor.Nodes = {};
libWZ.Nodes = libWZ.Core.NodeEditor.Nodes;

module.exports = {
    cBase: libWZ.Core.NodeEditor.Nodes.cBase = require('./cBase'),
    cMergerSetup: libWZ.Core.NodeEditor.Nodes.cMergerSetup = require('./cMergerSetup')
};
