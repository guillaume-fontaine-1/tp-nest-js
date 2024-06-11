import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['author', 'comments'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOneBy({id : id});
  }

  async create(post: Post, author: User): Promise<Post> {
    post.author = author;
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: Partial<Post>): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
