'use strict';

// =====================================================
// CONFIGURATION
// =====================================================

var phantom = require('phantom'),
    system  = require('system'),
    path    = require('path'),
    logger  = require('simlog'),
    input   = system.args[2],
    output  = system.args[3];


// =====================================================
// FUNCTIONS
// =====================================================

/**
 * Set the filename properly
 *
 * @method : validString
 * @param  : {String} str
 * @return : {String}
 * @api    : private
 */

var validString = function(str) {
    return str
        .toLowerCase()
        .replace(/\s+|\-+/g, '');
};

/**
 * Set user path
 *
 * @method : setHomePath
 * @return : {String}
 * @api    : private
 */

var setHomePath = function() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
};

/**
 * Render PDF
 *
 * @method : setRender
 * @param  : {String} ph
 * @return : {String}
 * @api    : public
 */

var setRender = function() {
    logger.info('Rendering page... please wait.');
    phantom.create(function(ph) {
        ph.createPage(function(page) {
            page.open(input, function(status) {
                if (status !== 'success') {
                    logger.error('Unable to load the address!');
                    ph.exit();
                } else {
                    var filename = validString(output) + '.pdf';
                    page.render(path.join(setHomePath(), '.pdfify', filename));
                    logger.done('PDF saved!');
                    ph.exit();
                }
            });
        });
    });
};

module.exports = exports = setRender();

