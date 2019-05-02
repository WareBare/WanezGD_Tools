/**
 * Created by WareBare on 4/2/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

libWZ.Core.WND = {};

module.exports = {
    cBase: libWZ.Core.WND.cBase = require(`./cBase`),
    cWindow: libWZ.Core.WND.cWindow = require(`./cWindow`),
    cNotify: libWZ.Core.WND.cNotify = require(`./cNotify`),
    cDialog: libWZ.Core.WND.cDialog = require(`./cDialog`)
};

