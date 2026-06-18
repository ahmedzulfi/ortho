import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL || 'appointments@orthodonticsalign.com';

  if (!host || !port || !user || !pass) {
    console.warn('\n==================================================');
    console.warn('WARNING: SMTP credentials are not fully defined in .env.');
    console.warn(`[Mock Email Sent]`);
    console.warn(`To: ${to}`);
    console.warn(`From: ${fromEmail}`);
    console.warn(`Subject: ${subject}`);
    console.warn('==================================================\n');
    return { success: true, mock: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: port === '465', // true for 465, false for 587 or other ports
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    });

    console.log(`Email successfully sent to ${to} via SMTP. MessageId: ${info.messageId}`);
    return { success: true, data: info };
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    return { success: false, error };
  }
}

/**
 * Generates the HTML template for an appointment receipt confirmation.
 */
export function getReceiptEmailHtml(name: string, service: string, date?: string, time?: string) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A';
  return `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0D1B15; background-color: #FFFFFF; border: 1px solid #ECECEC; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0D1B15; font-family: 'Bricolage Grotesque', sans-serif; margin: 0 0 8px 0;">Orthodontics Align</h2>
        <p style="color: #595E5C; font-size: 16px; margin: 0;">Appointment Request Received</p>
      </div>
      <div style="line-height: 1.6; font-size: 15px;">
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for requesting an appointment with us. We have successfully received your request, and our clinical team is currently reviewing it.</p>
        
        <div style="background-color: #F6F7FF; border-left: 4px solid #D1FC71; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #0D1B15;">Requested Details:</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 4px 0; color: #595E5C; width: 120px;"><strong>Service:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #595E5C;"><strong>Pref. Date:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #595E5C;"><strong>Pref. Time:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${time || 'N/A'}</td>
            </tr>
          </table>
        </div>
        
        <p>No further action is required from your side on our website. Please wait for a follow-up email confirming your exact booking details.</p>
        <p>If you have any urgent questions, please feel free to reach out to us at <a href="mailto:support@orthodonticsalign.com" style="color: #0D1B15; text-decoration: underline;">support@orthodonticsalign.com</a>.</p>
      </div>
      <div style="border-t: 1px solid #ECECEC; padding-top: 20px; margin-top: 24px; font-size: 12px; color: #AAAAAA; text-align: center;">
        <p>© 2026 Orthodontics Align. All rights reserved.</p>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML template for a confirmed appointment.
 */
export function getConfirmationEmailHtml(name: string, service: string, date?: string, time?: string, notes?: string) {
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A';
  return `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0D1B15; background-color: #FFFFFF; border: 1px solid #ECECEC; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0D1B15; font-family: 'Bricolage Grotesque', sans-serif; margin: 0 0 8px 0;">Orthodontics Align</h2>
        <div style="display: inline-block; background-color: #D1FC71; color: #0D1B15; font-weight: bold; padding: 6px 16px; border-radius: 20px; font-size: 14px; margin-top: 5px;">
          ✓ Appointment Confirmed
        </div>
      </div>
      <div style="line-height: 1.6; font-size: 15px;">
        <p>Dear <strong>${name}</strong>,</p>
        <p>We are pleased to inform you that your appointment request has been **confirmed**! We look forward to seeing you at our clinic.</p>
        
        <div style="background-color: #F6F7FF; border-left: 4px solid #0D1B15; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #0D1B15;">Confirmed Details:</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 4px 0; color: #595E5C; width: 120px;"><strong>Service:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #595E5C;"><strong>Date:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #595E5C;"><strong>Time:</strong></td>
              <td style="padding: 4px 0; color: #0D1B15;">${time || 'N/A'}</td>
            </tr>
          </table>
        </div>

        ${notes ? `
        <div style="background-color: #F9F9F7; border: 1px solid #ECECEC; padding: 12px; margin: 15px 0; border-radius: 6px; font-size: 14px; color: #595E5C;">
          <strong>Clinical Notes & Instructions:</strong><br/>
          ${notes}
        </div>
        ` : ''}
        
        <p>If you need to reschedule or cancel this appointment, please let us know as soon as possible by replying to this email or calling us.</p>
      </div>
      <div style="border-t: 1px solid #ECECEC; padding-top: 20px; margin-top: 24px; font-size: 12px; color: #AAAAAA; text-align: center;">
        <p>© 2026 Orthodontics Align. All rights reserved.</p>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML template for a cancelled/rejected appointment request.
 */
export function getCancellationEmailHtml(name: string, service: string, notes?: string) {
  return `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0D1B15; background-color: #FFFFFF; border: 1px solid #ECECEC; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0D1B15; font-family: 'Bricolage Grotesque', sans-serif; margin: 0 0 8px 0;">Orthodontics Align</h2>
        <div style="display: inline-block; background-color: #FADBD8; color: #C0392B; font-weight: bold; padding: 6px 16px; border-radius: 20px; font-size: 14px; margin-top: 5px;">
          ✕ Appointment Cancelled
        </div>
      </div>
      <div style="line-height: 1.6; font-size: 15px;">
        <p>Dear <strong>${name}</strong>,</p>
        <p>We are writing to let you know that we are unable to accommodate your appointment request for <strong>${service}</strong> at this time, and it has been cancelled/declined.</p>
        
        ${notes ? `
        <div style="background-color: #F9F9F7; border: 1px solid #ECECEC; padding: 12px; margin: 15px 0; border-radius: 6px; font-size: 14px; color: #595E5C;">
          <strong>Message from our team:</strong><br/>
          ${notes}
        </div>
        ` : ''}
        
        <p>If you'd like to book a different service or check other availabilities, please feel free to visit our website and submit a new request, or contact our support team.</p>
      </div>
      <div style="border-t: 1px solid #ECECEC; padding-top: 20px; margin-top: 24px; font-size: 12px; color: #AAAAAA; text-align: center;">
        <p>© 2026 Orthodontics Align. All rights reserved.</p>
      </div>
    </div>
  `;
}
