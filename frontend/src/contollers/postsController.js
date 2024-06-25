import { baseApiUrl } from "./constants";

export class PostsController {
  /**
   * Get list of posts
   *
   *
   * @returns {string} message of succes or fail.
   */
  static getList = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let res = await fetch(baseApiUrl + "/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return res;
  };

  //dodaj post
  static addPost = async (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    let res = await fetch(baseApiUrl + "/post", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return res;
  };

  static addComment = async (content, postId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ content: content }),
      redirect: "follow",
    };

    let res = await fetch(
      baseApiUrl + `/post/${postId}/comment`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return res;
  };

  /**
   * Delete post
   * @param {string} id
   * @returns {string} status message of succes or fail.
   * */
  static deletePost = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ postId: id }),
      redirect: "follow",
    };

    let res = await fetch(baseApiUrl + "/deletePost", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        return "fail";
      });
    return res;
  };
}
