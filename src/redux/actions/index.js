export const GET_USER_PROFILE_LIST = "GET_USER_PROFILE_LIST"; //GET - fetches the user list https://striveschool-api.herokuapp.com/api/profile/
export const GET_USER_PROFILE_API = "GET_USER_PROFILE_API"; //GET - Retrieves the API owner's profile https://striveschool-api.herokuapp.com/api/profile/me
export const GET_USER_PROFILE_ID = "GET_USER_PROFILE_ID"; //GET - Retrieves a specifit profile with ID https://striveschool-api.herokuapp.com/api/profile/{userId}
export const PUT_USER_PROFILE_UPDATE = "PUT_USER_PROFILE_UPDATE"; //PUT - Update the current user's profile https://striveschool-api.herokuapp.com/api/profile/
export const GET_USER_LOADING = "GET_USER_LOADING"; //For loaders & spinners
export const GET_USER_ERROR = "GET_USER_ERROR"; //For error messages
export const GET_SEARCH_RESULT = "GET_SEARCH_RESULT";
export const GET_ALL_PROFILE = "GET_ALL_PROFILE";
export const GET_EXPERIENCE = "GET_EXPERIENCE";
export const GET_SPECIFIC_PROFILE = "GET_SPECIFIC_PROFILE";
export const GET_EXPERIENCE_WITH_EXP_ID = "GET_EXPERIENCE_WITH_EXP_ID";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const POST_USER_EXPERIENCE = "POST_USER_EXPERIENCE";
export const POST_THE_POST = "POST_THE_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_WITH_ID = "GET_POSTS_WITH_ID";
export const PUT_USER_EXPERIENCE_UPDATE = "PUT_USER_EXPERIENCE_UPDATE";
export const PUT_POSTS = "PUT_POSTS";
export const POST_PROFILE_PIC = "POST_PROFILE_PIC";
export const POST_IMAGE_TO_EXP = "POST_IMAGE_TO_EXP";
export const POST_IMAGE_TO_POST = "POST_IMAGE_TO_POST";
export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";
export const TOGGLE_SHOW = "TOGGLE_SHOW";

//PROFILE
export const getUserProfileApi = (userId = '6418663bed18214ac7e041e4') => {
  return async (dispatch, getState) => {
    const baseEndpoint =
      process.env.REACT_APP_BE_URL + `/users/${userId}`;
    try {
      let resp = await fetch(baseEndpoint);
      if (resp.ok) {
        dispatch({
          type: GET_USER_LOADING,
          payload: true,
        });
        let data = await resp.json();
        dispatch({
          type: GET_USER_PROFILE_API,
          payload: data,
        });
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_USER_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_USER_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_USER_ERROR,
        payload: true,
      });
    }
  };
};

export const putUserProfileApi = (userId) => {
  const nameInput = document.getElementById("change-name");
  const surnameInput = document.getElementById("change-surname");
  const emailInput = document.getElementById("change-email");
  const titleInput = document.getElementById("change-title");
  const areaInput = document.getElementById("change-area");
  const usernameInput = document.getElementById("change-username");
  const bioInput = document.getElementById("change-bio");
  const editedData = {
    name: nameInput.value ? nameInput.value : nameInput.placeholder,
    surname: surnameInput.value ? surnameInput.value : surnameInput.placeholder,
    email: emailInput.value ? emailInput.value : emailInput.placeholder,
    title: titleInput.value ? titleInput.value : titleInput.placeholder,
    area: areaInput.value ? areaInput.value : areaInput.placeholder,
    username: usernameInput.value
      ? usernameInput.value
      : usernameInput.placeholder,
    bio: bioInput.value ? bioInput.value : bioInput.placeholder,
  };

  const optionsPUT = {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(editedData),
  };

  return async (dispatch, getState) => {
    const baseEndpoint =
      process.env.REACT_APP_BE_URL + `/users/${userId}`;

    try {
      let resp = await fetch(baseEndpoint, optionsPUT);
      if (resp.ok) {
        dispatch({
          type: GET_USER_LOADING,
          payload: true,
        });
        let data = await resp.json();
        dispatch({
          type: PUT_USER_PROFILE_UPDATE,
          payload: data,
        });
        dispatch(getUserProfileApi(userId));
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_USER_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_USER_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_USER_ERROR,
        payload: true,
      });
    }
  };
};

export const getUserbyId = (query) => {
  return async (dispatch, getState) => {
    const baseEndpoint = process.env.REACT_APP_BE_URL + `/users/` + query;
    try {
      let resp = await fetch(baseEndpoint);
      if (resp.ok) {
        dispatch({
          type: GET_USER_LOADING,
          payload: true,
        });
        let data = await resp.json();
        dispatch({
          type: GET_USER_PROFILE_API,
          payload: data,
        });
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: GET_USER_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_USER_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_USER_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_USER_ERROR,
        payload: true,
      });
    }
  };
};

//SEARCH
export const getAllProfileActionAsync = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + `/users`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: GET_ALL_PROFILE,
          payload: data,
        });
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSearchResultActionAsync = (data, search) => {
  return {
    type: GET_SEARCH_RESULT,
    payload: data.filter(
      (el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.surname.toLowerCase().includes(search.toLowerCase())
    ),
  };
};

//SPECIFIC PROFILE
export const getSpecificProfileAction = (query) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/users/` + query
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: GET_SPECIFIC_PROFILE,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//EXPERIENCE
export const getExperienceAction = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/users/${userId}/experiences`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_EXPERIENCE,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getExperienceWithExpIdAction = (userId, expId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/users/${userId}/experiences/${expId}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_EXPERIENCE_WITH_EXP_ID,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postUserExperience = (userId, expId, file) => {
  const roleInput = document.getElementById("experience-role");
  const companyInput = document.getElementById("experience-company");
  const startdateInput = document.getElementById("experience-startdate");
  const enddateInput = document.getElementById("experience-enddate");
  const descriptionInput = document.getElementById("experience-description");
  const areaInput = document.getElementById("experience-area");
  const editedData = {
    role: roleInput.value,
    company: companyInput.value,
    startDate: startdateInput.value,
    endDate: enddateInput.value,
    description: descriptionInput.value,
    area: areaInput.value,
    user: userId,
  };
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        process.env.REACT_APP_BE_URL + `/users/${userId}/experiences`,
        {
          method: "POST",
          body: JSON.stringify(editedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: GET_POSTS_WITH_ID,
          payload: data.id,
        });
        dispatch(getUserProfileApi(userId));
        dispatch(handleUploadActionExp(data._id, expId, file));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

function handleUploadActionExp(userId, expId, file) {
  const baseURL =
    process.env.REACT_APP_BE_URL +
    `/users/${userId}/experiences/${expId}/image`;
  const formData = new FormData();
  formData.append("expImg", file);
  fetch(baseURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("You've uploaded your profile pic!", result);
    })
    .catch((error) => {
      console.error("Problem uploading the image :(", error);
    });
}

export const deleteSpecificExperienceAction = (userId, expId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/users/${userId}/experiences/${expId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: DELETE_EXPERIENCE,
          payload: data,
        });
        dispatch(getUserProfileApi(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const putUserExperience = (userId, expId) => {
  const roleInput = document.getElementById("put-experience-role");
  const companyInput = document.getElementById("put-experience-company");
  const startdateInput = document.getElementById("put-experience-startdate");
  const enddateInput = document.getElementById("put-experience-enddate");
  const descriptionInput = document.getElementById(
    "put-experience-description"
  );
  const areaInput = document.getElementById("put-experience-area");
  const editedData = {
    user: userId,
    role: roleInput.value ? roleInput.value : roleInput.placeholder,
    company: companyInput.value ? companyInput.value : companyInput.placeholder,
    startDate: startdateInput.value
      ? startdateInput.value
      : startdateInput.placeholder,
    endDate: enddateInput.value ? enddateInput.value : enddateInput.placeholder,
    description: descriptionInput.value
      ? descriptionInput.value
      : descriptionInput.placeholder,
    area: areaInput.value ? areaInput.value : areaInput.placeholder,
  };
  return async (dispatch, getState) => {
    try {
      let res = fetch(
        process.env.REACT_APP_BE_URL + `/users/${userId}/experiences/${expId}`,
        {
          method: "PUT",
          body: JSON.stringify(editedData),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      if (res.ok) {
        dispatch({
          type: PUT_USER_EXPERIENCE_UPDATE,
          payload: editedData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//POSTS
export const sendPostAsyncAction = (editedData, file, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(process.env.REACT_APP_BE_URL + `/posts`, {
        method: "POST",
        body: JSON.stringify(editedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: GET_POSTS_WITH_ID,
          payload: data.id,
        });
        dispatch(handleUploadAction(data._id, file));
        dispatch(getUserProfileApi(userId))
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostAction = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(process.env.REACT_APP_BE_URL + `/posts`);
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_POSTS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostWithIdAction = (postID) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/posts/${postID}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: GET_POSTS_WITH_ID,
          payload: data.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const putPostAction = (postID) => {
  const newsFeed = document.getElementById("feeds-data-edited");
  const editedData = {
    text: newsFeed.value ? newsFeed.value : newsFeed.placeholder,
  };

  return async (dispatch, getState) => {
    try {
      let res = fetch(process.env.REACT_APP_BE_URL + `/posts/${postID}`, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (res.ok) {
        dispatch({
          type: PUT_POSTS,
          payload: editedData,
        });
        dispatch(getPostWithIdAction());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePostAction = (postID) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_URL + `/posts/${postID}`,
        {
          method: "DELETE",
          headers: {},
        }
      );
      if (response.ok) {
        dispatch(getPostAction());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Photo

export const postExpImageAction = (userId, experienceId) => {
  const expImage = {};
  return async (dispatch, getState) => {
    try {
      let res = fetch(
        process.env.REACT_APP_BE_URL +
        `/users/${userId}/experiences/${experienceId}/image`,
        {
          method: "POST",
          body: JSON.stringify(expImage),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("sending");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPostImageAction = (postID) => {
  const postImage = {};
  return async (dispatch, getState) => {
    try {
      let res = fetch(process.env.REACT_APP_BE_URL + `/posts/${postID}/image`, {
        method: "POST",
        body: JSON.stringify(postImage),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("sending");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Favourite
export const likeAction = (singlePost) => {
  return {
    type: LIKE,
    payload: singlePost,
  };
};

export const unlikeAction = (singlePost) => {
  return {
    type: UNLIKE,
    payload: singlePost,
  };
};

export function handleUploadAction(postID, file) {
  const baseURL = process.env.REACT_APP_BE_URL + `/posts/${postID}/image`;
  const formData = new FormData();
  formData.append("post", file);
  fetch(baseURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("You've uploaded your picture!", result);
    })
    .catch((error) => {
      console.error("Problem uploading the image :(", error);
    });
}

export const toggleShow = () => {
  return {
    type: TOGGLE_SHOW,
  };
};
