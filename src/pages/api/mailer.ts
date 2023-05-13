import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function mailer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.seznam.cz",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: req.body.from,
      text: req.body.message,
    });

    return res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
