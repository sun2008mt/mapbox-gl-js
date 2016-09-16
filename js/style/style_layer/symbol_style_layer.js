'use strict';

var util = require('../../util/util');
var StyleLayer = require('../style_layer');

function SymbolStyleLayer() {
    StyleLayer.apply(this, arguments);
}

module.exports = SymbolStyleLayer;

SymbolStyleLayer.prototype = util.inherit(StyleLayer, {

    getLayoutValue: function(name, globalProperties, featureProperties) {
        if (name === 'text-rotation-alignment' && !this.getLayoutProperty('text-rotation-alignment')) {
            return this.defaultLayoutType(globalProperties, featureProperties);
        } else if (name === 'icon-rotation-alignment' && !this.getLayoutProperty('icon-rotation-alignment')) {
            return this.defaultLayoutType(globalProperties, featureProperties);
        // If unspecified or auto `text-pitch-alignment` inherits `text-rotation-alignment`
        } else if (name === 'text-pitch-alignment' &&
                  (!this.getLayoutProperty('text-pitch-alignment') || this.getLayoutProperty('text-pitch-alignment') === 'auto')) {
            return this.getLayoutValue('text-rotation-alignment');
        } else {
            var layoutValue = StyleLayer.prototype.getLayoutValue.apply(this, arguments);
            if (layoutValue === 'auto') {
                return this.defaultLayoutType(globalProperties, featureProperties);
            }
            return layoutValue;
        }
    },

    defaultLayoutType: function(globalProperties, featureProperties) {
        if (this.getLayoutValue('symbol-placement', globalProperties, featureProperties) === 'line') {
            return 'map';
        } else {
            return 'viewport';
        }
    }

});
