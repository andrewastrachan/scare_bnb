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
  validates :status, :start_date, :end_date, :requester_id, :listing_id, presence: true
  before_validation :set_status 
  
  belongs_to :requester,
  class_name: "User",
  foreign_key: :requester_id,
  primary_key: :id
  
  belongs_to :listing,
  class_name: "Listing",
  foreign_key: :listing_id,
  primary_key: :id
  
  def set_status
    self.status = "PENDING"
  end
  
end
