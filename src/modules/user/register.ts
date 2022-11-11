import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entity/User';

@Resolver(User)
export class ResgisterResolver {
  @Query(() => String, { name: 'helloWorld' })
  hello() {
    return 'Hello world';
  }

  @FieldResolver()
  name(@Root() parent: User): string {
    return parent.firstName;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
