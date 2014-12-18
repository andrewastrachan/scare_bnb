json.array! @listings do |listing|

	json.id listing.id
	json.title listing.title
	json.latitude listing.latitude
	json.longitude listing.longitude
	json.price listing.price
	json.room_type listing.room_type
	json.max_guests listing.max_guests
	json.owner listing.user, :name, :id, :gravatar_url
	json.reservations listing.reservations.where(status: 'APPROVED') do |reservation| 
		json.start_date reservation.start_date
		json.end_date reservation.end_date
	end
	json.images listing.images do |image|
		json.url image.url
	end
	
	
	
	json.current_user do
		json.id current_user.id
		json.name current_user.name
		json.gravatar_url current_user.gravatar_url
	end
end