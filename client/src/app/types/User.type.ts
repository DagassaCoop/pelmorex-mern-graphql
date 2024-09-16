export enum EUserStatus {
  "free",
  "paid"
}

export type TUser = {
  id: string
  username: string
  email: string
  password: string
  status: EUserStatus
}

export type TNewUser = Omit<TUser, "id" | "status"> & { status: string }

export type TUserJwtToken = {
  token: string
}

export type TUserWithToken = {
  user: TUser
  userJwtToken: TUserJwtToken
}