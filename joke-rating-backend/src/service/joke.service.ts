import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Joke } from "src/database/joke.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JokesService {
    constructor(
        @InjectRepository(Joke)
        private readonly jokesRepository: Repository<Joke>,
      ) {}

  async getAllJokes(): Promise<Joke[]> {
    const joke = await this.jokesRepository.find();
    
    if (!joke) {
      // Trường hợp không có truyện cười nào trong cơ sở dữ liệu
      throw new Error('No jokes available.');
    }

    return joke;
  }

  async voteForJoke(id: number, voteType: 'like' | 'dislike') {
    // Kiểm tra xem truyện cười có tồn tại không
    const joke = await this.jokesRepository.findOne({where: {id}})
    if (!joke) {
      throw new Error('Joke not found.');
    }

    // Ghi phiếu bầu cho truyện cười
    if (voteType === 'like') {
      joke.likes += 1;
    } else if (voteType === 'dislike') {
      joke.dislikes += 1;
    }

    // Cập nhật thông tin truyện cười trong cơ sở dữ liệu
    await this.jokesRepository.save(joke);
  }
}
