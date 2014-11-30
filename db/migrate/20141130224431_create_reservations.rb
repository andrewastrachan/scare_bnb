class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.string :status, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :requester_id
      t.integer :listing_id

      t.timestamps
    end
  end
end
