import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaileService {
    constructor(private mailerService: MailerService) {}
    
    async sendTextEmail(userEmail: string, subject: string, code: number) {
        try {
            await this.mailerService.sendMail({
                to: userEmail,
                subject,
                template: "index",
                context: {
                    code
                }
            });
        } catch (error) {
            console.error('Text email sending failed:', error);
            throw new Error(`Failed to send text email: ${error.message}`);
        }
    }
}