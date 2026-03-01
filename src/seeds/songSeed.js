require("dotenv").config();
const mongoose = require("mongoose");
const Song = require("../models/Song");

async function seedSongs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");

    await Song.deleteMany();
    console.log("Músicas antigas removidas");

    await Song.insertMany([
      {
        title: "Leave It In My Dreams",
        artist: "The Voidz",
        album: "Virtue",
        genre: ["rock", "alternativo"],
        duration: {
          minutes: 3,
          seconds: 59,
        },
        releaseDate: new Date("2018-03-30"),
        coverImage:
          "https://media.discordapp.net/attachments/1474174874594312438/1477399070535454740/images.jpg",
        featuring: [],
        songwriters: ["The Voidz"],
        producers: [
          "Shawn Everett",
          "Andy Wallace",
          "Ben Baptie",
          "Alana da Fonseca",
        ],
        externalLinks: [
          {
            platform: "spotify",
            url: "https://open.spotify.com/intl-pt/track/31u6rUeIEXGrYVoh10U7eu",
          },
        ],
        externalId: "spotify-leave-it-in-my-dreams",

        description:
          "Leave It In My Dreams é uma música da banda The Voidz, lançada em 2018 no álbum Virtue. A faixa mistura rock alternativo com elementos experimentais característicos do grupo.",
      },
    ]);

    console.log("Seed de músicas criado com sucesso");
    process.exit();
  } catch (err) {
    console.error("Erro ao rodar seed:", err);
    process.exit(1);
  }
}

seedSongs();