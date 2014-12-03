# == Schema Information
#
# Table name: listings
#
#  id          :integer          not null, primary key
#  owner_id    :integer
#  title       :string(255)
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#  address     :string(255)
#  latitude    :float
#  longitude   :float
#  price       :integer
#  room_type   :string(255)
#  max_guests  :integer
#

class Listing < ActiveRecord::Base
  validates :owner_id, :description, :title, :address, :price, :room_type, :max_guests, presence: true
  geocoded_by :address 
  after_validation :geocode 
  after_validation :reverse_geocode

  reverse_geocoded_by :latitude, :longitude do |obj,results|
    if geo = results.first
      obj.city = geo.city
      obj.state = geo.state
    end
  end

  has_many :images, 
  class_name: "Image",
  foreign_key: :listing_id,
  primary_key: :id       
  
  has_many :reservations,
  class_name: "Reservation",
  foreign_key: :listing_id,
  primary_key: :id
  
  belongs_to :user,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
    
end
