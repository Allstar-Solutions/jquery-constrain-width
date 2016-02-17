// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

	// Allow multiple instances
	var instanceId = 0;

		// Create the defaults once
		var pluginName = "constrainWidth",
			defaults = {};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {

				init: function () {
						this.constrainWidth();
						$(window).resize(this.constrainWidth);
				},
				constrainWidth: function() {
					var $this = $(this.element);
					var $parent = $this.parent();

					if($this.width() > $parent.width()) {
						$this.width($parent.width());
					}
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// allowing multiple instantiations.
		$.fn.constrainWidth = function ( options ) {
			var args = arguments;

	        // Is the first parameter an object (options), or was omitted,
	        // instantiate a new instance of the plugin.
	        if (options === undefined || typeof options === 'object') {
	            return this.each(function () {

	                // Only allow the plugin to be instantiated once,
	                // so we check that the element has no plugin instantiation yet
	                if (!$.data(this, 'plugin_' + pluginName)) {

	                    // Set the instance Id.
	                    $.data(this, 'plugin_' + pluginName + '_instanceId', instanceId);
	                    instanceId++;

	                    // if it has no instance, create a new one,
	                    // pass options to our plugin constructor,
	                    // and store the plugin instance
	                    // in the elements jQuery data object.
	                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
	                }
	            });

	        // If the first parameter is a string and it doesn't start
	        // with an underscore or "contains" the `init`-function,
	        // treat this as a call to a public method.
	        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

	            // Cache the method call
	            // to make it possible
	            // to return a value
	            var returns;

	            this.each(function () {
	                var instance = $.data(this, 'plugin_' + pluginName);

	                // Tests that there's already a plugin-instance
	                // and checks that the requested public method exists
	                if (instance instanceof Plugin && typeof instance[options] === 'function') {

	                    // Call the method of our plugin instance,
	                    // and pass it the supplied arguments.
	                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
	                }

	                // Allow instances to be destroyed via the 'destroy' method
	                if (options === 'destroy') {
	                  $.data(this, 'plugin_' + pluginName, null);
	                }
	            });

	            // If the earlier cached method
	            // gives a value back return the value,
	            // otherwise return this to preserve chainability.
	            return returns !== undefined ? returns : this;
	        }
		};

})( jQuery, window, document );
