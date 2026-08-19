import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key (stored in environment variables)
// You can get a free API key from https://resend.com
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, industry, selectedServices, message, budgetRange } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    // Format services list for the email
    const servicesList = Array.isArray(selectedServices) && selectedServices.length > 0
      ? selectedServices.join(', ')
      : 'None selected';

    // Construct the email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Website Inquiry - Softwire</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f5f6;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            background-color: #ffffff;
            border: 1px solid #e1e4e6;
            border-radius: 8px;
            overflow: hidden;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            background-color: #0f172a;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .logo span {
            color: #f97316; /* Cyber Orange */
          }
          .header-subtitle {
            color: #94a3b8;
            font-size: 14px;
            margin: 0;
          }
          .content {
            padding: 30px;
            color: #334155;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
            margin-top: 25px;
            margin-bottom: 15px;
          }
          .grid {
            display: table;
            width: 100%;
          }
          .grid-row {
            display: table-row;
          }
          .grid-label {
            display: table-cell;
            font-weight: bold;
            padding: 8px 0;
            width: 35%;
            color: #64748b;
          }
          .grid-value {
            display: table-cell;
            padding: 8px 0;
            color: #0f172a;
          }
          .badge {
            display: inline-block;
            background-color: #ffedd5;
            color: #ea580c;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            margin-right: 5px;
            margin-bottom: 5px;
          }
          .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #f97316;
            padding: 15px;
            border-radius: 0 4px 4px 0;
            font-style: italic;
            color: #475569;
            margin-top: 10px;
            line-height: 1.6;
          }
          .footer {
            background-color: #f8fafc;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
          .footer a {
            color: #f97316;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">SOFT<span>WIRE</span></div>
            <p class="header-subtitle">Intelligent Systems & Technology Integration Inquiry</p>
          </div>

          <!-- Content -->
          <div class="content">
            <p style="font-size: 15px; line-height: 1.5; margin-top: 0;">
              You have received a new estimation/inquiry request from your website <strong>softwire.info</strong>. Below are the details provided by the client:
            </p>

            <!-- Client Info Section -->
            <div class="section-title">Client Information</div>
            <div class="grid">
              <div class="grid-row">
                <div class="grid-label">Contact Name:</div>
                <div class="grid-value"><strong>${name}</strong></div>
              </div>
              <div class="grid-row">
                <div class="grid-label">Email Address:</div>
                <div class="grid-value"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></div>
              </div>
              <div class="grid-row">
                <div class="grid-label">Phone/WhatsApp:</div>
                <div class="grid-value"><a href="tel:${phone}" style="color: #f97316; text-decoration: none;">${phone}</a></div>
              </div>
              <div class="grid-row">
                <div class="grid-label">Industry/Sector:</div>
                <div class="grid-value">${industry || 'Not specified'}</div>
              </div>
            </div>

            <!-- Inquiry Details Section -->
            <div class="section-title">Inquiry Details</div>
            <div class="grid">
              <div class="grid-row">
                <div class="grid-label">Services Selected:</div>
                <div class="grid-value">
                  ${
                    Array.isArray(selectedServices) && selectedServices.length > 0
                      ? selectedServices.map(s => `<span class="badge">${s}</span>`).join('')
                      : '<span class="badge" style="background-color: #f1f5f9; color: #64748b;">General Inquiry</span>'
                  }
                </div>
              </div>
              ${budgetRange ? `
              <div class="grid-row">
                <div class="grid-label">Budget Scope:</div>
                <div class="grid-value">${budgetRange}</div>
              </div>
              ` : ''}
            </div>

            <!-- Message Section -->
            <div class="section-title">Additional Message & Scope Details</div>
            <div class="message-box">
              ${message ? message.replace(/\n/g, '<br>') : 'No additional message provided.'}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>This message was automatically generated by the Softwire Website lead engine.</p>
            <p>&copy; ${new Date().getFullYear()} <a href="https://softwire.info">Softwire</a>. Karachi, Pakistan.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Softwire Leads <leads@softwire.info>', // Must be a verified domain in Resend
      to: ['info@softwire.info'],
      reply_to: email, // Direct reply to the user who filled the form
      subject: `New IT Integration Inquiry: ${name} (${industry || 'Business'})`,
      html: emailHtml,
    });

    return NextResponse.json(
      { success: true, message: 'Inquiry successfully delivered.', id: data.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Resend API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
