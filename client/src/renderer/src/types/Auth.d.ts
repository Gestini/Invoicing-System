interface ILogin {
    email: string
    password: string
  }

  interface IRegister {
    email: string
    password: string
  }

  interface IRegisterErrorAPI {
    message: string
    field: string
  }

  export interface IAuthState {
    userObject: object | undefined | null
    userEmail: string | null
    loading: boolean
    error: string | null | WritableDraft<IRegisterErrorAPI>
  }

  export interface IMessageAndEmail {
    message: string | null
    email: string | null
  }

  interface IVerifyCodeData {
    email: string | null
    code: string
  }
