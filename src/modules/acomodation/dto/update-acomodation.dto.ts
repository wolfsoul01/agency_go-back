import { PartialType } from '@nestjs/mapped-types';
import { CreateAcomodationDto } from './create-acomodation.dto';

export class UpdateAcomodationDto extends PartialType(CreateAcomodationDto) {}
