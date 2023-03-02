"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mailjet = node_mailjet_1.default.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const sendEmail = (email, name) => mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
        {
            From: {
                Email: "essienemma300dev@gmail.com",
                Name: "Jarvis",
            },
            To: [
                {
                    Email: email,
                    Name: name,
                },
            ],
            Subject: "Signup Status",
            TextPart: `Dear ${name}, welcome to Node Ecommerce! Your sign up was successful, May the force be with you!`,
            HTMLPart: `<h3>Dear ${name}, welcome to <a href=\"https://www.mailjet.com/\">Node-Ecommerce</a>!</h3><br />May the force be with you!`,
        },
    ],
});
exports.sendEmail = sendEmail;
