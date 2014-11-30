class AddRoomTypeToListings < ActiveRecord::Migration
  def change
    add_column :listings, :room_type, :string
  end
end
