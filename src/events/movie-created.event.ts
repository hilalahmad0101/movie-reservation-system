export class MovieCreatedEvent {
  constructor(public readonly movieId: number, public readonly title: string) {
  }
}
