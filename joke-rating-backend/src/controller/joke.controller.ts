import { Controller, Get, Param, Post } from "@nestjs/common";
import { JokesService } from "src/service/joke.service";

@Controller('jokes')
export class JokesController {
    constructor(private readonly jokesService: JokesService) {}

  @Get('/all')
  getAllJoke() {
    return this.jokesService.getAllJokes();
  }

  @Post(':id/like')
  likeJoke(@Param('id') id: number) {
    return this.jokesService.voteForJoke(id, 'like');
  }

  @Post(':id/dislike')
  dislikeJoke(@Param('id') id: number) {
    return this.jokesService.voteForJoke(id, 'dislike');
  }
}