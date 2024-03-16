

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


declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
  };


declare type TransformationFormProps = {
    action:"Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?:IImage | null;
    config?: Transformations | null;
}

declare type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};