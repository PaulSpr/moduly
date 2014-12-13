/*global jQuery */
/*! 
* moduly.js 0.1
* https://github.com/PaulSpr/moduly
*
* Copyright 2014, Paul Sprangers http://paulsprangers.com
* Released under the WTFPL license 
* http://www.wtfpl.net
*
* Date: Sat Dec 13 11:30:00 2014 +0100
*/

(function( $ ){

    $.fn.moduly = function( options ) {

            defaults = { 
                checkWidthMethod: 'width', // jQuery method to check width, possible values: width, innerWidth, outerWidth
            };

            var $this   = $(this); // store the object
            options     = $.extend( {}, defaults, options ); // merge options
            
            var minWidthPattern = /(\.moduly-min-width-)(\d+)/g;
            var modulyNumberPattern = /(\d+)/;
            var beforeSpacePattern = /([^\s]+)/;
            
            var modulyMap = Array();
            
            // Resize height of the columns
            var resizeEvent = function () {
				
				// 1) loop through elements with data-moduly-min-width
				// 2) check if the width exceeds one of the breakpoints
				// 3) if so, apply class
				// 4) if not, remove that class
				$('[data-moduly-min-width]').each( function(){
					// get element width
					var elWidth = parseInt($(this)[options.checkWidthMethod]());
					
					// get all the min-width breakpoints
					var breakpoints = String($(this).data('moduly-min-width')).split(',');
					
					// loop through and apply moduly classes if applicable
					for( var i = 0; i < breakpoints.length; i++){
						var breakpointWidth = parseInt(breakpoints[i]);
						
						if( elWidth >= breakpointWidth ){
							$(this).addClass('moduly-min-width-'+breakpointWidth);
						}
						else{
							$(this).removeClass('moduly-min-width-'+breakpointWidth);
						}
					}
				});                    
            };
            
            
            // Init method, used to get the CSS and parse the rules
            var init = function () {
	            
	            sheets = document.styleSheets;
				for(var c = 0; c < sheets.length; c++) {
					var rules = sheets[c].rules || sheets[c].cssRules;
					for(var r = 0; r < rules.length; r++) {
						
						var selectorText = String(rules[r].selectorText);
						
						if( selectorText.search(minWidthPattern) > -1){
							// we should treat this rule

							var selectorLastPart = selectorText.replace(minWidthPattern, '');
														
							
							// get the part after the Moduly class selector
							
							// first prepare by replaceing + and > with a space so we can get just the first part.
							var elementSelector = selectorLastPart.replace('+', ' ');
							elementSelector = elementSelector.replace('>', ' ');
							// then match just the first part of the selector
							elementSelector = elementSelector.match(beforeSpacePattern);
							elementSelector = elementSelector[0];
							
							// get just the Moduly width number
							var breakpointWidth = selectorText.match(modulyNumberPattern);
							breakpointWidth = breakpointWidth[0];
							
							// bind data to elements
							if( elementSelector && breakpointWidth ){
								// check if breakpoint is already set on element
								var breakpoints = String($(elementSelector).data('moduly-min-width')).split(',');
								
								if( breakpoints.indexOf(String(breakpointWidth)) == -1 ){

									// make sure undefined isn't included in breakpoint list
									if( breakpoints == 'undefined' ){
										breakpoints[0] = breakpointWidth;
									}
									else{
										breakpoints.push(breakpointWidth);
									}
									// make new value to store in breakpoint
									breakpointsNew = breakpoints.join();
									
									$(elementSelector).attr('data-moduly-min-width', breakpointsNew);
								}
								
							}

						}
						
					}
				}
				
				resizeEvent();
            }

            // Call once to set initially
            init();

            // Call on resize. Opera debounces their resize by default. 
            $(window).resize(resizeEvent);
            
    };

})( jQuery );
