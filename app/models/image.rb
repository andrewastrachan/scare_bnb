class Image < ActiveRecord::Base
	validates :url, :listing_id, presence: true

	belongs_to :listing, 
	class_name: "Listing",
	foreign_key: :listing_id,
	primary_key: :id  

end
