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

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
