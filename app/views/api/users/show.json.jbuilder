
json.(@user, :id, :name)
json.gravatar_url @user.gravatar_url
if current_user && @user.id == current_user.id
	json.logged_in true
end