# create_table "listings", force: true do |t|
#   t.integer  "owner_id"
#   t.string   "title"
#   t.text     "description"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

class Listing < ActiveRecord::Base
  validates :name, :title, presence: true
  
  belongs_to: {
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  }
end
