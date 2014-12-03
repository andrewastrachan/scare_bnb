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

require 'test_helper'

class ReservationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
