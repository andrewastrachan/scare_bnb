json.array! @listings do |listing|
	json.title listing.title
	json.latitude listing.latitude
	json.longitude listing.longitude
	json.price listing.price
	json.room_type listing.room_type
	json.owner listing.user, :name, :id
	json.reservations listing.reservations.where(status: 'APPROVED') do |reservation| 
		json.start_date reservation.start_date
		json.end_date reservation.end_date
	end
end