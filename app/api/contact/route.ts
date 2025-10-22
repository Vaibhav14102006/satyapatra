import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if email credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Email configuration missing, storing message locally...')
      
      // For development: log the message (in production, you'd store in database)
      console.log('=== CONTACT FORM SUBMISSION ===')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      console.log('Timestamp:', new Date().toISOString())
      console.log('==============================')
      
      // Return success response even without sending email
      return NextResponse.json(
        { 
          message: 'Message received successfully. Email service is not configured in development mode.',
          success: true 
        },
        { status: 200 }
      )
    }

    // Create transporter using Gmail SMTP (only if credentials exist)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'vaibhavsinghrajawat483@gmail.com',
      subject: `New Contact Form Message from ${name} - SatyaPatra`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #00bfff, #8b5cf6); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">SatyaPatra Contact Form</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">New message received</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #00bfff; padding-bottom: 10px;">Sender Information</h3>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">Message</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #00bfff;">
                <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </div>
          
          <div style="padding: 15px 20px; background: #e8f4f8; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from the SatyaPatra contact form at ${new Date().toLocaleString()}
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
      replyTo: email, // Allow direct reply to sender
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send auto-reply to sender
    const autoReplyOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting SatyaPatra - Message Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #00bfff, #8b5cf6); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">SatyaPatra (सत्यपत्र)</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Email Security & Verification Platform</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #333; margin-top: 0;">Hello ${name},</h3>
              <p style="line-height: 1.6; color: #333;">
                Thank you for reaching out to us! We have successfully received your message and appreciate you taking the time to contact the SatyaPatra team.
              </p>
              
              <div style="background: #e8f4f8; padding: 15px; border-radius: 5px; border-left: 4px solid #00bfff; margin: 15px 0;">
                <p style="margin: 0; font-weight: bold; color: #00bfff;">Your message:</p>
                <p style="margin: 10px 0 0 0; color: #333; font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
              </div>
              
              <p style="line-height: 1.6; color: #333;">
                Our team will review your message and get back to you within 24-48 hours. If your inquiry is urgent, please feel free to contact us directly at:
              </p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; text-align: center; margin: 15px 0;">
                <p style="margin: 0; color: #333;"><strong>📧 vaibhavsinghrajawat483@gmail.com</strong></p>
                <p style="margin: 5px 0 0 0; color: #333;"><strong>📱 +91 75097 02917</strong></p>
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h4 style="color: #8b5cf6; margin-top: 0;">About SatyaPatra</h4>
              <p style="line-height: 1.6; color: #333; margin: 0;">
                SatyaPatra is your trusted email security platform, helping individuals and organizations identify and prevent phishing attacks, malicious emails, and security threats.
              </p>
            </div>
          </div>
          
          <div style="padding: 15px 20px; background: #e8f4f8; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>Vaibhav Singh Rajawat</strong><br>
              Lead Developer, SatyaPatra Team
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    }

    // Send email
    try {
      await transporter.sendMail(mailOptions)

      // Send auto-reply to sender
      await transporter.sendMail(autoReplyOptions)

      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      
      // Log the message even if email sending fails
      console.log('=== CONTACT FORM SUBMISSION (Email failed) ===')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Message:', message)
      console.log('Timestamp:', new Date().toISOString())
      console.log('Email Error:', emailError)
      console.log('===============================================')
      
      return NextResponse.json(
        { 
          message: 'Message received but email delivery failed. Please try again later or contact us directly.',
          warning: true
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}