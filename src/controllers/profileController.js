const Profile = require("../models/Profile");

async function getProfile(userId) {
  try {
    const profile = await Profile.findOne({ user: userId })
      .populate("user")
      .populate("favorites.item")
      .populate("favoriteOfMonth")
      .populate("followers")
      .populate("following");

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar perfil");
  }
}

async function getProfiles() {
  try {
    const profiles = await Profile.find()
      .populate("user")
      .populate("favorites.item")
      .populate("favoriteOfMonth")
      .populate("followers")
      .populate("following");

    return profiles;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar perfis");
  }
}

async function getFollowers(userId) {
  try {
    const profile = await Profile.findOne({ user: userId }).populate(
      "followers",
    );

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile.followers;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar seguidores");
  }
}

async function getFollowing(userId) {
  try {
    const profile = await Profile.findOne({ user: userId }).populate(
      "following",
    );

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    return profile.following;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar usuários seguidos");
  }
}

async function updateProfile(userId, input) {
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) throw new Error("Perfil não encontrado");

    if (input.username !== undefined) profile.username = input.username;
    if (input.bio !== undefined) profile.bio = input.bio;
    if (input.profileImage !== undefined)
      profile.profileImage = input.profileImage;

    const updatedProfile = await profile.save();
    return updatedProfile;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw new Error("Erro ao atualizar perfil: " + error.message);
  }
}

async function addFavorite(userId, input) {
  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    const alreadyFavorite = profile.favorites.some(
      (fav) => fav.item.toString() === input.itemId,
    );

    if (alreadyFavorite) {
      throw new Error("Item já está nos favoritos");
    }

    profile.favorites.push({
      item: input.itemId,
      itemType: input.itemType,
      addedAt: new Date(),
    });

    await profile.save();

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao adicionar favorito");
  }
}

async function removeFavorite(userId, itemId) {
  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    profile.favorites = profile.favorites.filter(
      (fav) => fav.item.toString() !== itemId,
    );

    await profile.save();

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao remover favorito");
  }
}

async function setFavoriteOfMonth(userId, itemId) {
  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    profile.favoriteOfMonth = itemId;

    await profile.save();

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao definir favorito do mês");
  }
}

async function followUser(userId, followId) {
  try {
    if (userId === followId) {
      throw new Error("Você não pode seguir a si mesmo");
    }

    const profile = await Profile.findOne({ user: userId });
    const targetProfile = await Profile.findOne({ user: followId });

    if (!profile || !targetProfile) {
      throw new Error("Perfil não encontrado");
    }

    const alreadyFollowing = profile.following.some(
      (id) => id.toString() === followId,
    );

    if (alreadyFollowing) {
      throw new Error("Você já segue esse usuário");
    }

    profile.following.push(followId);
    targetProfile.followers.push(userId);

    await profile.save();
    await targetProfile.save();

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao seguir usuário");
  }
}

async function unfollowUser(userId, unfollowId) {
  try {
    const profile = await Profile.findOne({ user: userId });
    const targetProfile = await Profile.findOne({ user: unfollowId });

    if (!profile || !targetProfile) {
      throw new Error("Perfil não encontrado");
    }

    profile.following = profile.following.filter(
      (id) => id.toString() !== unfollowId,
    );

    targetProfile.followers = targetProfile.followers.filter(
      (id) => id.toString() !== userId,
    );

    await profile.save();
    await targetProfile.save();

    return profile;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deixar de seguir usuário");
  }
}

async function deleteProfile(userId) {
  try {
    const deleted = await Profile.findOneAndDelete({ user: userId });

    if (!deleted) {
      throw new Error("Perfil não encontrado");
    }

    return "Perfil excluído com sucesso";
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao excluir perfil");
  }
}

module.exports = {
  getProfile,
  getProfiles,
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
