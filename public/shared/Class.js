(function () {

var _ = (_ !== 'undefined') ? _ : null;

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    _ = require('underscore');
}

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * Deep copying of properties added by Zach Johnson
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
        // Deep copy
        for (var p in this) {
			if (this[p] && typeof (this[p]) == 'object') {
			    if (Object.prototype.toString.call(this[p]) === '[object Array]') {
			        this[p] = [].concat(this[p]);
			        
			    } else {
			        this[p] = _.extend({}, this[p]);
			    }
			}
		}

        // All construction is actually done in the init method
        if (!initializing && this.init) {
          this.init.apply(this, arguments);
        }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
    module.exports = Class;
    
} else {
    window.Class = Class;
}

}());