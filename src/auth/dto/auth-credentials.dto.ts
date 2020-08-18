import {
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
