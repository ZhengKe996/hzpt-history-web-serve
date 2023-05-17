import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { QueryDto } from './dto/list-query.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}
  create(createListDto: CreateListDto) {
    return this.listRepository.insert(createListDto);
  }

  findAll(queryInfoDto: QueryDto) {
    if (queryInfoDto.category && queryInfoDto.grade) {
      return this.listRepository.find({
        where: { category: queryInfoDto.category, grade: queryInfoDto.grade },
      });
    } else if (queryInfoDto.category) {
      return this.listRepository.find({
        where: { category: queryInfoDto.category },
      });
    } else if (queryInfoDto.grade) {
      return this.listRepository.find({
        where: { grade: queryInfoDto.grade },
      });
    } else {
      return this.listRepository.find();
    }
  }

  findOne(id: number) {
    return this.listRepository.findOneBy({ id });
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  remove(id: number) {
    return this.listRepository.delete(id);
  }
}
