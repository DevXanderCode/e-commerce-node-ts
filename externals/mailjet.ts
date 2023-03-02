import Mailjet from "node-mailjet";
import * as dotenv from "dotenv";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!
);

export const sendEmail = (
  email: string,
  name: string,
  Subject?: string,
  HTMLPart?: string,
  TextPart?: string
) =>
  mailjet.post("send", { version: "v3.1" }).request({
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
        Subject: Subject || "Signup Status",
        TextPart:
          TextPart ||
          `Dear ${name}, welcome to Node Ecommerce! Your sign up was successful, May the force be with you!`,
        HTMLPart:
          HTMLPart ||
          `<h3>Dear ${name}, welcome to <a href=\"https://www.mailjet.com/\">Node-Ecommerce</a>!</h3><br />May the force be with you!`,
      },
    ],
  });
