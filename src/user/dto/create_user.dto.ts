import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6) // Assuming a minimum password length
  user_password: string;
}

export default CreateUserDto;
