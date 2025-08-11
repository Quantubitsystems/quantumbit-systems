import emailjs from '@emailjs/browser';
import { config } from './config';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  if (!config.emailjs.serviceId || !config.emailjs.templateId || !config.emailjs.publicKey) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  try {
    await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        to_name: config.business.name,
      },
      config.emailjs.publicKey
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send message. Please try again or contact us directly.');
  }
};