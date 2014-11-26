# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string(255)      not null
#  image_url       :string(255)
#  bio             :text
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :name, :email, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 5, allow_nil: true}
  validates :email, uniqueness: true
  
  attr_reader :password
  after_initialize :ensure_session_token
  
  #image logic?
  
  belongs_to: {
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  }
  
  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    
    return nil if user.nil?
    user.is_password?(user_params[:password]) ? user : nil
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
  
  protected
  
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
