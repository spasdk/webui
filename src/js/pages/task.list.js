/**
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('spa-component');


/**
 * Development task list implementation.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object}   [config={}]          init parameters (all inherited from the parent)
 * @param {Array}    [config.data=[]]     component data to visualize
 * @param {function} [config.render]      method to build each grid cell content
 * @param {function} [config.navigate]    method to move focus according to pressed keys
 * @param {number}   [config.size=5]      amount of visible items on a page
 * @param {number}   [config.viewIndex=0] move view window to this position on init
 * @param {number}   [config.focusIndex]  list item index to make item focused (move view window to this position)
 * @param {boolean}  [config.cycle=true]  allow or not to jump to the opposite side of a list when there is nowhere to go next
 * @param {boolean}  [config.scroll=null] associated ScrollBar component link
 */
function TaskList ( config ) {
    // current execution context
    //var self = this;

    // sanitize
    config = config || {};

    console.assert(typeof this === 'object', 'must be constructed via new');

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
        // init parameters checks
        if ( config.className && typeof config.className !== 'string' ) { throw new Error(__filename + ': wrong or empty config.className'); }
        if ( config.type      && Number(config.type) !== config.type  ) { throw new Error(__filename + ': config.type must be a number'); }
    }

    // set default className if classList property empty or undefined
    config.className = 'taskList ' + (config.className || '');

    // parent constructor call
    Component.call(this, config);

    this.filterText = '';

    // component setup
    this.init(config);
}


// inheritance
TaskList.prototype = Object.create(Component.prototype);
TaskList.prototype.constructor = TaskList;


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
TaskList.prototype.defaultEvents = {

};


/**
 * Init or re-init of the component inner structures and HTML.
 *
 * @param {Object} config init parameters (subset of constructor config params)
 */
TaskList.prototype.init = function ( config ) {
    var self = this;

    if ( DEVELOP ) {
        if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
    }

    Object.keys(config.data).forEach(function ( name ) {
        var item = document.createElement('div');

        item.className = 'item' + (config.data[name].running ? ' running' : '');
        item.innerText = name;
        
        self.$node.appendChild(item);
    });
};


TaskList.prototype.matchFilter = function ( node ) {
    return !(this.filterText && node.innerText.indexOf(this.filterText) === -1);
};


TaskList.prototype.applyFilter = function () {
    var nodes = this.$body.children,
        length, item;

    // prepare
    length = nodes.length - 1;
    // check
    while ( length-- ) {
        item = nodes[length];

        item.style.display = this.matchFilter(item) ? 'block' : 'none';
    }
};


TaskList.prototype.add = function ( data ) {
    var self = this,
        item = document.createElement('div'),
        info = document.createElement('div');

    item.className = 'item';

    data.tags = data.tags || [];
    data.tags.push(data.type);
    data.tags.forEach(function ( tag ) {
        var div = document.createElement('div');

        div.className = 'tag';
        div.innerText = tag;

        item.appendChild(div);

        // if ( ['info', 'warn', 'fail'].indexOf(tag) !== -1 ) {
        //     item.classList.add(tag);
        // }

        div.addEventListener('click', function ( event ) {
            if ( event.ctrlKey ) {
                self.excludeTags.push(tag);
                window.pageMainTagsExclude.value = window.pageMainTagsExclude.value + (window.pageMainTagsExclude.value ? ' ' : '') + tag;
            } else {
                self.includeTags.push(tag);
                window.pageMainTagsInclude.value = window.pageMainTagsInclude.value + (window.pageMainTagsInclude.value ? ' ' : '') + tag;
            }

            self.applyFilter();

            /*var length = window.pageMainTabTargetList.children.length,
             index, node;

             console.log(tag);

             for ( index = 0; index < length; index++ ) {
             node = window.pageMainTabTargetList.children[index];
             //console.log(index, node);
             node.style.display = node.tags.indexOf(tag) === -1 ? 'none' : 'block';
             }*/
        });
    });
    item.classList.add(data.type);
    item.tags = data.tags;

    info.className = 'info';
    console.log(data.data);
    info.innerText = (data.data && 'link' in  data.data ? '+ ' : '- ') + getTime(data.time) + ' :: ' + data.info /*+ (data.data ? ' :: ' + data.data : '')*/;

    item.addEventListener('click', function () {
        //console.log(data.data.link);
        app.wamp.call('getLinkData', {targetId: 128, linkId: data.data.link}, function ( error, data ) {
            console.log(error, data);
        });
    });

    item.appendChild(info);

    //console.log('target message', data);

    if ( !this.matchFilter(item) ) {
        item.style.display = 'none';
    }

    this.$body.appendChild(item);
};


// public
module.exports = TaskList;
