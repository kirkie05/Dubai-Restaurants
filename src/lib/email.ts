import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation({
  email,
  customerName,
  restaurantName,
  date,
  time,
  guests,
}: {
  email: string;
  customerName: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
}) {
  try {
    await resend.emails.send({
      from: 'Dubai Restaurants <noreply@dubaidining.guide>',
      to: email,
      subject: `Booking Confirmed: ${restaurantName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc2626; font-style: italic;">Booking Confirmed</h1>
          <p>Hello ${customerName},</p>
          <p>Your reservation at <strong>${restaurantName}</strong> has been successfully confirmed.</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 5px 0;"><strong>Guests:</strong> ${guests}</p>
          </div>
          <p>We look forward to seeing you soon.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">© 2024 Dubai Restaurants Discover. All rights reserved.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send booking email:', error);
  }
}

export async function sendClaimNotification({
  email,
  restaurantName,
  ownerName,
}: {
  email: string;
  restaurantName: string;
  ownerName: string;
}) {
  try {
    await resend.emails.send({
      from: 'Dubai Restaurants <noreply@dubaidining.guide>',
      to: email,
      subject: `Claim Request Received: ${restaurantName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc2626; font-style: italic;">Claim Request Received</h1>
          <p>Hello ${ownerName},</p>
          <p>We have received your request to claim ownership of <strong>${restaurantName}</strong>.</p>
          <p>Our team is currently verifying your details. You will receive an update once the verification is complete.</p>
          <p>Thank you for joining our curated collection.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">© 2024 Dubai Restaurants Discover. All rights reserved.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send claim email:', error);
  }
}
