class AddMaxGuestsToListings < ActiveRecord::Migration
  def change
    add_column :listings, :max_guests, :integer
  end
end
