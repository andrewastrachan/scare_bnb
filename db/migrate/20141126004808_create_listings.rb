class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :owner_id
      t.string :title
      t.text :description
      
      t.timestamps
    end
  end
end
