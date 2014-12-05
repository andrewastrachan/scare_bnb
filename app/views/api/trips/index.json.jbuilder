json.array! @trips do |trip|
	json.id trip.id
	json.start_date trip.start_date
	json.end_date trip.end_date
	json.status trip.status
	json.listing_image trip.listing.images[0].url
	json.listing_title trip.listing.title
	json.listing_id trip.listing.id
	json.owner trip.listing.user, :name, :gravatar_url
end
