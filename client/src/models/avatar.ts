import { AbstractModel } from '.';

export interface AvatarModel extends AbstractModel {
  publicId: string;
  url: string;
  code: string;
}
