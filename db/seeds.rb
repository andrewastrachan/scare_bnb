# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do
users = User.create!(
	[
		{name: 'Patrick', email: 'patrickbateman2014rd@outlook.com', password: "password", gravatar_url: "http://apocalypstick.com/wp-content/uploads/2013/04/patrick-bateman.gif"},
	{name: 'Jack', email: 'jack@jack.com', password: "password", gravatar_url: "http://www.audienceseverywhere.net/wp-content/uploads/2014/04/Jack-Torrance.jpg"},
	{name: 'Dracula', email: 'dracula@dracula.com', password: "password", gravatar_url: "http://parade.com/wp-content/uploads/2013/10/gary-oldman-dracula-ctr.jpg"},
	{name: 'Hannibal', email: 'hannibal@hannibal.com', password: "password", gravatar_url: "http://upload.wikimedia.org/wikipedia/sr/c/ca/Hannibal_Lecter.jpg"}
	]
	)

listings = Listing.create!(
	[
		{owner_id: 1, title: "NY Pad", description: "There is a moment of sheer panic when I realize that Paul's apartment overlooks the park... And is obviously more expensive than mine.", summary: "Luxury Apartment in Downtown, NY -- very modern", address: "New York, NY", max_guests: 4, room_type: "entirePlace", price: 400}, 
		{owner_id: 2, 
		title: "Overlook Hotel", 
		description: "Lorem ipsum dolor sit amet, ex veniam disputationi mel, sit et ubique maiestatis. Ut vel habeo appetere expetenda. Et purto choro est, novum mundi percipitur sed cu, ea delectus quaestio concludaturque sed. Mei soleat adversarium at, an mel aperiam lucilius, et sit erat alterum voluptaria.", summary: "You'll never want to leave", address: "Estes Park, CO", max_guests: 3, room_type: "entirePlace", price: 300},
		{owner_id: 3, 
		title: "Luxury Coffin", 
		description: "Lorem ipsum dolor sit amet, ex veniam disputationi mel, sit et ubique maiestatis. Ut vel habeo appetere expetenda. Et purto choro est, novum mundi percipitur sed cu, ea delectus quaestio concludaturque sed. Mei soleat adversarium at, an mel aperiam lucilius, et sit erat alterum voluptaria.", summary: "Cozy coffin in the heart of San Francisco", address: "San Francisco, CA", max_guests: 1, room_type: "entirePlace", price: 100},
		{owner_id: 4, 
		title: "Beautiful Space", 
		description: "Lorem ipsum dolor sit amet, ex veniam disputationi mel, sit et ubique maiestatis. Ut vel habeo appetere expetenda. Et purto choro est, novum mundi percipitur sed cu, ea delectus quaestio concludaturque sed. Mei soleat adversarium at, an mel aperiam lucilius, et sit erat alterum voluptaria.", summary: "Fly, fly, fly... ", address: "1061 Market Street San Francisco, CA", max_guests: 4, room_type: "entirePlace", price: 300}
	]
	)

images = Image.create!(
	[
		{url: "https://orringrey.files.wordpress.com/2014/10/univ_psycho_frame_a.jpg", listing_id: 4}, 
	{url: "http://the.hitchcock.zone/files/gallery/org/4040.jpg", listing_id: 4},
	{url: "http://scriptshadow.net/wp-content/uploads/2014/10/The-Overlook-Hotel-movie-version.jpg", listing_id: 2},
	{url: "http://2.bp.blogspot.com/-tuySIy1TZjg/UGltkuo7TBI/AAAAAAAAKJM/dFRoJdRrG2M/s1600/100_1588.JPG", listing_id: 3},
	{url:"http://media-cache-ec0.pinimg.com/originals/f2/af/6c/f2af6c11760d79a99bddb0da32236608.jpg", listing_id: 1}
	]
	)

end