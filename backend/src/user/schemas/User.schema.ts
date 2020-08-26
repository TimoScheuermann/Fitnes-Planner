import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Provider } from 'src/auth/auth.service';

@Schema()
export class User extends Document {
  @Prop()
  givenName: string;

  @Prop()
  familyName: string;

  @Prop()
  avatar: string;

  @Prop()
  provider: Provider;

  @Prop()
  thirdPartyId: number | string;

  @Prop()
  group: string;

  @Prop()
  date: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
