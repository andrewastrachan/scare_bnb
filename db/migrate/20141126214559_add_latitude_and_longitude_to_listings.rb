class AddLatitudeAndLongitudeToListings < ActiveRecord::Migration
  def change
    remove_column :listings, :lat
    remove_column :listings, :long
    add_column :listings, :latitude, :float
    add_column :listings, :longitude, :float
  end
end
