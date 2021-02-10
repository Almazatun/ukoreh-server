"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var Posts_1 = __importDefault(require("./routes/Posts"));
var Users_1 = __importDefault(require("./routes/Users"));
var app = express_1.default();
var config = { useNewUrlParser: true, useUnifiedTopology: true };
var MONGODB = process.env.MONGODB || "mongodb://localhost/moon";
mongoose_1.default.connect(MONGODB, config);
var db = mongoose_1.default.connection;
db.once("open", function () {
    console.log("Connected to MongoDB database...");
}).on("error", function (err) {
    console.log(err);
});
app.use(body_parser_1.default.json());
var HOST = process.env.HOST || "http://localhost:9006";
app.use(cors_1.default({
    credentials: true,
    origin: HOST,
}));
app.use("/posts", Posts_1.default);
app.use("/users", Users_1.default);
app.get("/start", function (_, res) { return res.send("SUCCESS 🔥"); });
var PORT = process.env.PORT || 9111;
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
//# sourceMappingURL=app.js.map