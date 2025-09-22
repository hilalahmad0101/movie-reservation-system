import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MovieCreatedEvent } from '../../events/movie-created.event';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesListener {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailerService: MailerService,
  ) {}

  @OnEvent('movie.created', { async: true }) // 👈 runs in background
  async handleMovieCreated(event: MovieCreatedEvent) {
    const users = await this.userRepo.find();

    for (const user of users) {
      // fire-and-forget mail tasks
      this.mailerService
        .sendMail({
          to: user.email,
          subject: `New Movie Added: ${event.title}`,
          template: './movie-created', // e.g., movie-created.hbs
          context: {
            name: user.name,
            title: event.title,
          },
        })
        .catch((err) => console.error(`Failed mail to ${user.email}`, err));
    }
  }
}
