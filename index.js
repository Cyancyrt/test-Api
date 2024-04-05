const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./app/src/config/db.js");
const sequelizeStore = require("connect-session-sequelize");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const userRoute = require("./app/src/routes/userRoutes.js");
const dokterRoute = require("./app/src/routes/dokterRoutes.js");
const obatRoute = require("./app/src/routes/obatRoutes.js");
const penyakitRoutes = require("./app/src/routes/penyakitRoutes.js");
const konsumsiRoutes = require("./app/src/routes/konsumsiRoutes.js");
const loginRoutes = require("./app/src/routes/loginRoutes.js");
const postingRoutes = require("./app/src/routes/postRoutes.js");
const komentarRoutes = require("./app/src/routes/komenRoutes.js");
const kategoriRoutes = require("./app/src/routes/kategoriRoutes.js");
const bookingRoutes = require("./app/src/routes/bookingRoutes.js");
const RsRoutes = require("./app/src/routes/rumahSakitRoutes.js");
const bidanRoutes = require("./app/src/routes/bidanRoutes.js");
const { verifyToken } = require("./app/src/middleware/verifyToken.js");

dotenv.config();

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// /sinkronisasi ke database menggunakan sequelize
// (async () => {
//   try {
//     await db.sync({ alter: true });
//     console.log("Sinkronisasi berhasil");
//   } catch (error) {
//     console.error("Kesalahan saat menyinkronkan database:", error);
//   }
// })();

const app = express();

//konfigurasi header aplikasi dengan middleware CORS
app.use(
  cors({
    origin: ["vidzi.my.id"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const wibTimestamp = 60 * 60 * 24 + 7 * 60 * 60 * 1000;
app.use(
  session({
    key: "userId",
    secret: process.env.SCRT_TOKEN,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: wibTimestamp,
    },
  })
);

app.use(express.json());
app.use(cookieParser()); //Middleware express.json() untuk mem-parsing body dari request dengan content-type application/json

//Routing
app.get("/", (req, res) => {
  res.json("helloworld");
});
app.use("/", loginRoutes);
app.use("/user", userRoute);
app.use("/dokter", dokterRoute);
app.use("/obat", obatRoute);
app.use("/penyakit", penyakitRoutes);
app.use("/konsumsi", konsumsiRoutes);
app.use("/post", postingRoutes);
app.use("/komentar", komentarRoutes);
app.use("/kategori", kategoriRoutes);
app.use("/booking", verifyToken, bookingRoutes);
app.use("/bidan", bidanRoutes);
app.use("/rumah-sakit", RsRoutes);

//server express
try {
  app.listen(3000 || process.env.PORT, () => {
    console.log(`server berada pada port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
