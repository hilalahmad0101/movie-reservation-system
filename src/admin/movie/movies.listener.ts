import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MovieCreatedEvent } from '../../events/movie-created.event';

@Injectable()
export class MoviesListener {
  @OnEvent('movie.created', { async: true }) // 👈 runs in background
  handleMovieCreated(event: MovieCreatedEvent) {
    // For now: just log (simulate sending to 1M users via queue)
    console.log(`🎬 Movie created: ${event.title} (id: ${event.movieId})`);
  }
}
