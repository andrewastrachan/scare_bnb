class AddCityStateToListing < ActiveRecord::Migration
  def change
  	add_column :listings, :city, :string 
  	add_column :listings, :state, :string 

  end
end
