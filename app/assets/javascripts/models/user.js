ScareBnb.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	
	signOut: function(){
		var that = this;
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(resp){
					var that = ScareBnb.Collections.users.currentUser();
					that.set({logged_in: false});
					that.fetch();
					toastr.success("logged out");
        }
	  });
	},
});