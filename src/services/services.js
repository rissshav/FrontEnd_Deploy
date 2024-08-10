import {
  del,
  get,
  getWithExportFile,
  post,
  postAsForm,
  put,
  putAsForm,
} from "helpers/api_helper";

const getToken = () => {
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return token;

}

export const adminLogin = (data) => {
  return post("/admin/login", data);
};

export const adminDashboardListing = (search, page, floor, activeCard) => {
  // let obj = JSON.parse(localStorage.getItem("authUser"));
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return get(`/admin/getPictures?pageNumber=${page}&search=${search}&hall=${floor}&wall=${activeCard}`,
    {
      headers: { Authorization: token },
    }
  );
};

export const deleteuser = (data) => {
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return post("/admin/deluser", data,
    {
      headers: { Authorization: token },
    }
  );
};

export const modelslistingimages = (search, page) => {
  // let obj = JSON.parse(localStorage.getItem("authUser"));
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return get(`/admin/getmodels?page=${page}&search=${search}`,
    {
      headers: { Authorization: token },
    }
  );
};

export const getmodelinfobyid = (id) => {
  // let obj = JSON.parse(localStorage.getItem("authUser"));
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return get(`/admin/getmodelinfobyid?id=${id}`,
    {
      headers: { Authorization: token },
    }
  );
};

export const getusersmodels = (searchList,page,userid) => {
  // let obj = JSON.parse(localStorage.getItem("authUser"));
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return get(`/user/models?userid=${userid}`,
    {
      headers: { Authorization: token },
    }
  );
};

export const viewAnItem = (id) => {
  const token = getToken();
  return get(`/admin/getSinglePhoto?photo_id=${id}`,
    {
      headers: { Authorization: token }
    }
  )
}

export const addAnItem = (data) => {
  const token = getToken();
  console.log(token,"token")
  return postAsForm("/admin/addphoto",
    data,
    {
      headers: { 
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    }
  )
}

export const addUser = (data) => {
  console.log(data,"data")
  const token = getToken();
  console.log(token,"token")
  return postAsForm("/admin/adduser",
    data, 
    {
      headers: { 
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    }
  )
  // return post("/admin/adduser", data,{
  //       headers: { 
  //         Authorization: token,
  //         'content-type': 'multipart/form-data'
  //       }
  //     });
}

export const edituser = (data) => {
  console.log(data,"data")
  const token = getToken();
  console.log(token,"token")
  return postAsForm("/admin/edituser",
    data, 
    {
      headers: { 
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    }
  )
  // return post("/admin/adduser", data,{
  //       headers: { 
  //         Authorization: token,
  //         'content-type': 'multipart/form-data'
  //       }
  //     });
}

export const modelslist = (data) => {
  const token = getToken();
  console.log(token,"token")
  return get(`/admin/getmodels?limit=10000`,
    {
      headers: { Authorization: token },
    }
  );
}

export const getuserdetails = (data) => {
  const token = getToken();
  console.log(token,"token")
  return get(`/admin/finduserbyid?userid=${data.userid}`,
    {
      headers: { Authorization: token },
    }
  );
}

export const addModel = (data) => {
  const token = getToken();
  console.log(token,"token")
  return postAsForm("/admin/addmodel",
    data, 
    {
      headers: { 
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    }
  )
}

export const viewusers = (searchList, pagenumber,pagelimit, floor, activeCard) => {
  // let obj = JSON.parse(localStorage.getItem("authUser"));
  const localData = JSON.parse(localStorage.getItem("authUser"));
  const token = localData?.token;
  return get(`/admin/getusers?page=${pagenumber}&search=${searchList}&limit=${pagelimit}`,
    {
      headers: { Authorization: token },
    }
  );
};

export const editAnItem = (data) => {
  const token = getToken();
  return putAsForm("/admin/updatephoto",
    data,
    {
      headers: {
        Authorization: token,
        'content-type': 'multipart/form-data'
      },
    }
  )
}

// export const changePassword = (data) => {
//   const token = getToken()
//   return post("/admin/changePassword",
    
//       data
//     ,
//     {
//       headers:{Authorization : token}
//     }
//   )
// }

export const changePassword = (data) => {
  const token = getToken()
  return post("/admin/changePassword",
    
      data
    ,
    {
      headers:{Authorization : token}
    }
  )
}

