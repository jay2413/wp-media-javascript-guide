(function($) {
	$(document).ready( function() {
		$('.js--example-1--render-region').click( function( event ) {
			event.preventDefault();

			// A region requires a parent view to live inside.
			var RegionParentViewConstructor = wp.Backbone.View.extend({
				// When the view is initialized, bind events to callbacks.
				initialize: function() {
					// Regions trigger events on their parent views, which
					// the parent view should bind callbacks for.

					// When the region is created:
					// Events triggered: {region-id}:create and {region-id}:create:{mode}
					this.on( 'region-1:create', this.onCreateRegion, this );

					// When the region is rendered:
					// Events triggered: {region-id}:render and {region-id}:render:{mode}
				},

				/**
				 * On the "create" event, the region controller is passed as an
				 * argument.
				 *
				 * This is the time to create a view on the region.
				 */
				onCreateRegion: function( region ) {
					// Create a basic view constructor that binds to a template.
					var RegionViewConstructor = wp.Backbone.View.extend({
						// assign a compiled template function.
						template: wp.template( 'example-1-view-1' )
					});
					// Create the view for the region, which is automatically
					// rendered later.
					region.view = new RegionViewConstructor();
				}
			});
			// Create an instance of the RegionParentView.
			var RegionParentView = new RegionParentViewConstructor({
				// Tie the view to an existing DOM element.
				el: '.example-1--region-parent-view'
			});
			// Render the region parent view.
			RegionParentView.render();

			// Create a new region
			var RegionOne = new wp.media.controller.Region({
				// Unique identifier.
				id: 'region-1',
				// The region's parent view.
				view: RegionParentView,
				// The selector for the element in the parent view's markup
				// that represents the region.
				selector: '.region-1'
			});
			// Render a mode on the region to trigger the {region}:create
			// event on the parent view.
			RegionOne.render( 'some-mode' );
		});
	});

	$(document).ready( function() {
		// A region requires a parent view to live inside.
		var RegionParentViewConstructor = wp.Backbone.View.extend({
			// When the view is initialized, bind events to callbacks.
			initialize: function() {
				// Regions trigger events on their parent views, which
				// the parent view should bind callbacks for.

				// When the region is created:
				// Events triggered: {region-id}:create and {region-id}:create:{mode}
				this.on( 'region-1:create:a-mode', this.onCreateRegionInAMode, this );
				this.on( 'region-1:create:b-mode', this.onCreateRegionInBMode, this );

				// When the region is rendered:
				// Events triggered: {region-id}:render and {region-id}:render:{mode}
			},

			/**
			 * On the "region-1:create:a-mode" event, the region controller is passed as an
			 * argument.
			 *
			 * This is the time to create a view on the region.
			 *
			 * Callback for rendering the region in "A mode".
			 */
			onCreateRegionInAMode: function( region ) {
				// Create a basic view constructor that binds to a template.
				var RegionViewConstructor = wp.Backbone.View.extend({
					// assign a compiled template function.
					template: wp.template( 'example-2-view-1' )
				});
				// Create the view for the region, which is automatically
				// rendered later.
				region.view = new RegionViewConstructor();
			},

			/**
			 * Callback for rendering the region in "B mode".
			 */
			onCreateRegionInBMode: function( region ) {
				// Create a basic view constructor that binds to a template.
				var RegionViewConstructor = wp.Backbone.View.extend({
					// assign a compiled template function.
					template: wp.template( 'example-2-view-2' )
				});
				// Create the view for the region, which is automatically
				// rendered later.
				region.view = new RegionViewConstructor();
			}
		});
		// Create an instance of the RegionParentView.
		var RegionParentView = new RegionParentViewConstructor({
			// Tie the view to an existing DOM element.
			el: '.example-2--region-parent-view'
		});
		// Render the region parent view.
		RegionParentView.render();

		// Create a new region
		var RegionOne = new wp.media.controller.Region({
			// Unique identifier.
			id: 'region-1',
			// The region's parent view.
			view: RegionParentView,
			// The selector for the element in the parent view's markup
			// that represents the region.
			selector: '.region-1'
		});
		$('.js--example-2--switch-region-to-a-mode').click( function( event ) {
			event.preventDefault();
			// Trigger a mode change on the region, which will hit callbacks
			// on the RegionParentView ( RegionParentView.onCreateRegionInAMode() ).
			RegionOne.mode( 'a-mode' );
		});
		$('.js--example-2--switch-region-to-b-mode').click( function( event ) {
			event.preventDefault();
			RegionOne.mode( 'b-mode' );
		});
	});
})(jQuery);