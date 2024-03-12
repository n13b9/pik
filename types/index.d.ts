

declare type CreateUserParams =  {

    clerkId:String;
    email:String;
    username:String;
    photo:String;
    firstName:String;
    lastName:String
}

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };