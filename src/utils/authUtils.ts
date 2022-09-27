interface IAuthLoginErrors {
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
}

export function getAuthErrors(
  email: string,
  password: string
): IAuthLoginErrors {
  if (email === "" && password === "") {
    return {
      email: {
        error: email === "" ? true : false,
        message: email === "" ? "Email is required" : "",
      },
      password: {
        error: password === "" ? true : false,
        message: password === "" ? "Password is required" : "",
      },
    };
  } else if (email === "") {
    return {
      email: {
        error: true,
        message: "Email is required",
      },
      password: {
        error: false,
        message: "",
      },
    };
  } else if (password === "") {
    return {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: true,
        message: "Password is required",
      },
    };
  } else {
    return {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
    };
  }
}
