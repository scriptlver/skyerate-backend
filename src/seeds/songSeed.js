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
        coverImage: "https://media.discordapp.net/attachments/1474174874594312438/1477399070535454740/images.jpg?ex=69a49e9b&is=69a34d1b&hm=1bc3f516f46873226cb4d3aa954f1ef4472a5f5ace0c296398e272d3b73db33b&=&format=webp",
        featuring: [],
        songwriters: ["The Voidz"],
        producers: ["Shawn Everett", "Andy Wallace", "Ben Baptie", "Alana da Fonseca"],
        externalLinks: [
          {
            platform: "spotify",
            url: "https://open.spotify.com/intl-pt/track/31u6rUeIEXGrYVoh10U7eu?si=ba1a1178ddb5444d",
          },
        ],
        externalId: "spotify-leave-it-in-my-dreams"
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