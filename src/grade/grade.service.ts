import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}
  create(createGradeDto: CreateGradeDto) {
    return this.gradeRepository.insert(createGradeDto);
  }

  findAll() {
    return this.gradeRepository.find();
  }

  findOne(id: number) {
    return this.gradeRepository.findBy({ id });
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return this.gradeRepository.update(id, updateGradeDto);
  }

  remove(id: number) {
    return this.gradeRepository.delete({ id });
  }
}
