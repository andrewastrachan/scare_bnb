json.listing @listing
json.owner do
	json.id @listing.user.id
	json.name @listing.user.name 
end
json.reservations @listing.reservations.where(status: 'APPROVED') do |reservation| 
	json.start_date reservation.start_date
	json.end_date reservation.end_date
end