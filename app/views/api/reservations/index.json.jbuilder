json.array! @reservations do |reservation|
	json.id reservation.id
	json.start_date reservation.start_date
	json.end_date reservation.end_date
	json.listing_image reservation.listing.images[0].url
	json.listing_title reservation.listing.title
	json.listing_id reservation.listing.id
	json.requester reservation.requester, :name, :gravatar_url
end
