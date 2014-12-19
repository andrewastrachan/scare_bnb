ScareBnb.Collections.Users = Backbone.Collection.extend({
	model: ScareBnb.Models.User,
	
  currentUser: function(){
    return this.findWhere({ logged_in: true }) || null
  }

});

ScareBnb.Collections.users = new ScareBnb.Collections.Users()