import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { fullName, email, phone, country, programme, message } = req.body;

    const data = await resend.emails.send({
      from: "Pathways Academy <muzamel.hamidzadah@gmail.com>",
      to: ["admissions@pathwaysacademy.nl"],
      subject: "New Student Enquiry",
      html: `
        <h2>New Student Enquiry</h2>

        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Programme:</strong> ${programme}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Email sending failed",
      details: error.message,
    });
  }
}
