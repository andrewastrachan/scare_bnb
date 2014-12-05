# == Schema Information
#
# Table name: reservations
#
#  id           :integer          not null, primary key
#  status       :string(255)      not null
#  start_date   :date             not null
#  end_date     :date             not null
#  requester_id :integer
#  listing_id   :integer
#  created_at   :datetime
#  updated_at   :datetime
#

class Reservation < ActiveRecord::Base
  validates :start_date, :end_date, :requester_id, :listing_id, presence: true
  before_create :set_status 
  
  belongs_to :requester,
  class_name: "User",
  foreign_key: :requester_id,
  primary_key: :id
  
  belongs_to :listing,
  class_name: "Listing",
  foreign_key: :listing_id,
  primary_key: :id

  has_one :user, through: :listing
  
  def set_status
    self.status = "PENDING"
  end
  
end
