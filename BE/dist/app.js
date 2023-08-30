"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const userRoute_1 = require("./routes/userRoute");
const database_1 = require("./middlewares/database");
const postRoute_1 = require("./routes/postRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const file = fs_1.default.readFileSync('./docs/openApi.yaml', 'utf8');
const swaggerDocument = yaml_1.default.parse(file);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    console.log(err, `<=================== error ==================`);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});
if (swaggerDocument) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
app.use(database_1.attachDB);
app.use('/api/v1', userRoute_1.userRoute);
app.use('/api/v1', postRoute_1.postRoute);
app.use((err, req, res, next) => {
    console.log(err, `<=================== error ==================`);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors
    });
});
app.listen(port, () => {
    console.log('Server is running on port', port);
});
exports.default = app;
