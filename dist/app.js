"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("./routes");
const response_generator_1 = require("./utils/response-generator");
const auth_1 = require("./modules/services/auth"); // ✅ Corrected import
const env_config_1 = __importDefault(require("./config/env.config"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 🛡️ Setup session (required for passport)
app.use((0, express_session_1.default)({
    secret: env_config_1.default.GOOGLE_CLIENT_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));
// 🛡️ Initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 🧠 Initialize Auth to register Google strategy
new auth_1.Auth(); // ✅ Register strategies
// 🔀 Setup routes
(0, routes_1.combineRouters)(app);
// 🛠️ Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    response_generator_1.ResponseGenerator.send(res, response_generator_1.ResponseGenerator.error('Internal server error', 500));
});
// 🚀 Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
