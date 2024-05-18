import { AvatarModel } from "./avatar";
import { RoleModel } from "./role";

export interface UserModel extends AvatarModel {
    fullName : string;
    userName : string;
    email : string;
    password : string | null;
    association : string;
    isVertified : boolean;
    roleData : RoleModel;
    avatarData : AvatarModel;
}