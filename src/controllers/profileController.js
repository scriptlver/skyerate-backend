const Profile = require("../models/Profile");

async function getProfile(userId) {
  return await Profile.findOne({ user: userId })
    .populate("user")
    .populate("favorites.item")
    .populate("favoriteOfMonth")
    .populate("followers")
    .populate("following");
}

async function getFollowers(userId) {
  const profile = await Profile.findOne({ user: userId }).populate("followers");
  return profile.followers;
}

async function getFollowing(userId) {
  const profile = await Profile.findOne({ user: userId }).populate("following");
  return profile.following;
}

async function updateProfile(userId, input) {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    input,
    { new: true, upsert: true }
  );

  return profile;
}

async function addFavorite(userId, input) {
  const profile = await Profile.findOne({ user: userId });

  profile.favorites.push({
    item: input.itemId,
    itemType: input.itemType,
    addedAt: new Date(),
  });

  await profile.save();
  return profile;
}

async function removeFavorite(userId, itemId) {
  const profile = await Profile.findOne({ user: userId });

  profile.favorites = profile.favorites.filter(
    (fav) => fav.item.toString() !== itemId,
  );

  await profile.save();
  return profile;
}

async function setFavoriteOfMonth(userId, itemId) {
  const profile = await Profile.findOne({ user: userId });

  profile.favoriteOfMonth = itemId;

  await profile.save();
  return profile;
}

async function followUser(userId, followId) {
  const profile = await Profile.findOne({ user: userId });
  const targetProfile = await Profile.findOne({ user: followId });

  profile.following.push(followId);
  targetProfile.followers.push(userId);

  await profile.save();
  await targetProfile.save();

  return profile;
}

async function unfollowUser(userId, unfollowId) {
  const profile = await Profile.findOne({ user: userId });
  const targetProfile = await Profile.findOne({ user: unfollowId });

  profile.following = profile.following.filter(
    (id) => id.toString() !== unfollowId,
  );

  targetProfile.followers = targetProfile.followers.filter(
    (id) => id.toString() !== userId,
  );

  await profile.save();
  await targetProfile.save();

  return profile;
}

async function deleteProfile(userId) {
  await Profile.findOneAndDelete({ user: userId });
  return "Perfil excluído com sucesso";
}

module.exports = {
  getProfile,
  getFollowers,
  getFollowing,
  updateProfile,
  addFavorite,
  removeFavorite,
  setFavoriteOfMonth,
  followUser,
  unfollowUser,
  deleteProfile,
};
