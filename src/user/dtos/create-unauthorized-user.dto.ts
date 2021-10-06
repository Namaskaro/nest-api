import { CoreOutput } from 'src/common/dtos/output.dto';

export class CreateUnauthorizedUserInput {}

export class CreateUnauthorizedUserOutput extends CoreOutput {
  userAccessKey: string;
}
