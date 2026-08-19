import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, industry, services, notes } = body;

    // Validate inputs
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    // Build list of selected services in HTML format
    const servicesList = Array.isArray(services) && services.length > 0 
      ? services.map((s: string) => `<li>${s}</li>`).join('') 
      : '<li>No specific services selected</li>';

    // HTML Email Template matching Softwire's branding
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Softwire System Inquiry</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background-color: #0f172a; color: #f8fafc; padding: 30px; text-align: center; border-bottom: 4px solid #f97316; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 5px 0 0; color: #94a3b8; font-size: 14px; }
            .content { padding: 30px; }
            .section-title { font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #f97316; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px; margin-top: 0; margin-bottom: 15px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
            .field { background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #f1f5f9; }
            .field-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; margin-bottom: 4px; }
            .field-value { font-size: 14px; font-weight: 500; color: #0f172a; }
            .field-value a { color: #f97316; text-decoration: none; }
            .services-list { background: #f8fafc; padding: 15px 15px 15px 35px; border-radius: 6px; border: 1px solid #f1f5f9; margin-bottom: 25px; }
            .services-list li { margin-bottom: 6px; font-size: 14px; color: #0f172a; font-weight: 500; }
            .notes-box { background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #f1f5f9; font-size: 14px; line-height: 1.5; color: #334155; margin-bottom: 25px; white-space: pre-wrap; }
            .footer { background: #f1f5f9; text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #e4e4e7; }
            .footer p { margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>System Integration Inquiry</h1>
              <p>Softwire — Intelligent Systems & Technology Integration</p>
            </div>
            <div class="content">
              <h2 class="section-title">Client Information</h2>
              <div class="grid">
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone / WhatsApp</div>
                  <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Industry Sector</div>
                  <div class="field-value">${industry || 'Not Specified'}</div>
                </div>
              </div>

              <h2 class="section-title">Requested Integrations</h2>
              <ul class="services-list">
                ${servicesList}
              </ul>

              <h2 class="section-title">Project Scope Notes</h2>
              <div class="notes-box">
                ${notes ? notes : 'No additional notes provided.'}
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was securely generated via the Softwire website lead pipeline.</p>
              <p style="margin-top: 5px;">&copy; ${new Date().getFullYear()} Softwire Karachi. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    // Correcting TypeScript compilation errors:
    // 1. Used 'replyTo' instead of 'reply_to' to match newer Resend typings
    // 2. Destructured response to { data, error } to comply with Resend 2.0.0+ syntax
    const { data, error } = await resend.emails.send({
      from: 'Softwire Leads <onboarding@resend.dev>', // Replace with your verified sender domain when ready
      to: 'info@softwire.info',
      replyTo: email, 
      subject: `New Softwire Integration Inquiry from ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send lead email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead inquiry email sent successfully!', 
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (err: any) {
    console.error('Server Integration Endpoint Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
