import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(CreateListDto) {
  category?: string;
  grade?: string;
  categoryLogo?: string;

  classname?: string;
  description?: string;

  photo?: string;
  photoDownLink?: string;
  photoWidth?: number;
  photoHeight?: number;
  photoType?: string;

  panelimgurl?: string;
}
