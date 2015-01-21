window.ScareBnb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		new ScareBnb.Routers.Router({$rootEl: $(".root-container")});
		Backbone.history.start();
  }
};

$(document).ready(function(){
  ScareBnb.initialize();
});