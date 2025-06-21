import { Module } from '@nestjs/common';
import { MaileService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                auth: {
                    user: "dilnozmamanova@gmail.com",
                    pass: "yhxfefczbhsmhrjr"
                }
            },
            defaults: {
                from: "Najot talim <dilnozmamanova@gmail.com>"
            },
            template: {
                dir: join(process.cwd(), "src", "templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        })
    ],
    providers: [MaileService],
    exports: [MaileService]
})
export class MaileModule {}
