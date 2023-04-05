
export interface ILoginData {
  email: string;
  password: string;
  accessKey: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  accessKey: string;
}

export interface ICreateProfileData {
  name: string;
  email: string;
  companyName: string;
  companyProfile: string;
  workProfile: string;
  profileImage: string;
  pet: string;
  PR: string;
  hobbies: string;
}

export const validateMyLoginData = (login: ILoginData) => {
  if (!login.email) {
    return {
      fieldName: "email",
      message: "Please fill email field to login",
    };
  }

  if (!login.password) {
    return {
      fieldName: "password",
      message: "Please fill password field to login",
    };
  }
};
