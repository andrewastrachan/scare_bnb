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
#



class Listing < ActiveRecord::Base
  validates :owner_id, :description, :title, :address, :price, :room_type, :max_guests, presence: true
  geocoded_by :address 
  after_validation :geocode         
  
  has_many :reservations,
  class_name: "Reservation",
  foreign_key: :listing_id,
  primary_key: :id
  
  belongs_to :user,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
    
end
