json.listing @listing
json.owner do
	json.id @listing.user.id
	json.name @listing.user.name 
	json.gravatar_url @listing.user.gravatar_url
end
json.reservations @listing.reservations.where(status: 'APPROVED') do |reservation| 
	json.start_date reservation.start_date
	json.end_date reservation.end_date
end
json.images @listing.images do |image|
	json.url image.url
end