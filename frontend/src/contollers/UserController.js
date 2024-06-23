import { baseApiUrl } from "./constants";

export class UserController {
  /**
   * Resets password procedure step 1 sends mail to user if found matching user
   *
   * @returns {User} object of user with email and username.
   */
  // static resetPasswordRequest = async (
  //   user
  // )=> {
  //   const myHeaders = new Headers();
  //   var result = "fail";
  //   myHeaders.append("Content-Type", "application/json");
  //   var response = fetch(baseApiUrl + "/api/user/resetpasswordrequest", {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: JSON.stringify(user),
  //     redirect: "follow",
  //   });
  //   result = await (await response).text();
  //   return result;
  // };

  /**
   * Resets password procedure step 2 send password and code to change password
   *
   * @param UserResetPasswordStep2 - object with password
   * @param string - code from email
   *
   * @returns User - object of user with email and username.
   */
  // static resetPasswordFinish = async (
  //   user,
  //   code
  // ) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var result = "";
  //   var response = await fetch(
  //     baseApiUrl + "/api/user/resetpassword?Bearer-token=" + code,
  //     {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: JSON.stringify(user),
  //       redirect: "follow",
  //     }
  //   );
  //   result = await (await response).text();
  //   return result;
  // };

  /**
   * Creates new user in database user
   * cannot use Email that is already taken,
   * cannot use username that is already taken
   *
   * @param UserRegister - object with email username password and id of currency
   *
   * @returns User - object will return user. If failed to create will return "NULL-ed object"
   */
  static registerNewUser = async (user) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let usrObj = await fetch(baseApiUrl + "/register", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(user),
      redirect: "follow",
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        return JSON.parse(result);
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    return usrObj;
  };


  /**
   * Returns user if contains valid authenticated cookie
   *
   * @returns {User} object of user.
   */
  // static getUser = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   try {
  //     const response = await fetch(
  //       baseApiUrl +
  //         "/api/user/?Bearer-token=" +
  //         this.getCookie("Bearer-token"),
  //       {
  //         method: "POST",
  //         headers: myHeaders,
  //         redirect: "follow",
  //       }
  //     );
  //     const result = await response.text();
  //     // console.log(result);
  //     return JSON.parse(result);
  //   } catch (error) {
  //     console.error(error);
  //     throw "User not found!";
  //   }
  // };

  /**
   * Login to your account
   *
   *
   * @returns {string} message of succes or fail.
   */
  static login = async (inputUser ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(inputUser);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let res = await fetch(baseApiUrl + "/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // this.setCookie("Bearer-token", result);
        localStorage.setItem("token", result.token);
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return res;
  };

 //forgot-password
  static resetPassword = async (email) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let res = await fetch(baseApiUrl + "/forgot-password", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return JSON.parse(res);
  };

// change password
  static changePassword =  async (email, newPassword) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email, newPassword });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        let res = await fetch(baseApiUrl + "/change-password", requestOptions);
        let result = await res.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Failed to change password" };
    }
};

//logout user + delete token
  static logout =  () => {
    localStorage.removeItem("token");
    return true;
  };

  // /**
  //  * Delete user and its data
  //  *
  //  * @returns {string} message of succes or fail.
  //  */
  // static delete = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const requestOptions: any = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   let res = await fetch(baseApiUrl + "/api/user/delete", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       this.setCookie("Bearer-token", result);
  //       return result;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return "fail";
  //     });
  //   return res;
  // };

  // private static setCookie(cname: string, cvalue: string) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }

  // private static getCookie(name: string) {
  //   const cookieArray = document.cookie.split("; ");
  //   const nameEQ = name + "=";
  //   let cookieValue = null;

  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let c = cookieArray[i];
  //     while (c.charAt(0) === " ") c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) {
  //       cookieValue = c.substring(nameEQ.length, c.length);
  //       break;
  //     }
  //   }

  //   return cookieValue;
  // }

  
}
