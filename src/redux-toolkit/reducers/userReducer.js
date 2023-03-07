import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetListOrder } from "./orderReducer";

export const logout = createAsyncThunk("user/logout", async (auth, { getState, dispatch }) => {

  try {
    localStorage.removeItem('userInfo');
    dispatch(resetUserDetail())
    dispatch(resetListOrder())
    dispatch(resetUserList())
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
});

export const login = createAsyncThunk("user/login", async (auth) => {
  const { email, password } = auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const { data } = await axios.post(process.env.REACT_APP_API_URL + 'users/login', {
      email, password
    }, config)
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
});

export const register = createAsyncThunk("user/register", async (auth, thunkAPI) => {
  const { name, email, password } = auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const { data } = await axios.post(process.env.REACT_APP_API_URL + 'users/register', {
      name, email, password
    }, config)
    thunkAPI.dispatch(login({ email, password }))
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const getUserDetails = createAsyncThunk("user/profile", async (id, { getState }) => {
  try {
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token
      }
    }
    const { data } = await axios.get(process.env.REACT_APP_API_URL + 'users/' + id, config)

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const updateUserProfile = createAsyncThunk("user/profile/update", async (user, { getState, dispatch }) => {
  try {
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token
      }
    }

    const { data } = await axios.put(process.env.REACT_APP_API_URL + 'users/profile', user, config)
    try {
      dispatch(userLoginSlice.actions.update(data));

    } catch (error) {
      console.log(error)
    }
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const updateUser = createAsyncThunk("user/update", async (user, { getState, dispatch }) => {
  try {
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token
      }
    }
    const {data} = await axios.put(process.env.REACT_APP_API_URL + 'users/'+user._id,user, config)

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const listUsers = createAsyncThunk("user/list", async (test, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.get(process.env.REACT_APP_API_URL + 'users', config)

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const deleteUser = createAsyncThunk("user/delete", async (id, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.delete(process.env.REACT_APP_API_URL + 'users/'+id, config)

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    userInfo: userInfoFromStorage
  },
  reducers: {
    update: (state, { payload }) => {
      return {
        userInfo: { ...state.userInfo, ...payload }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return { loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        const { _id } = action.payload
        if (_id) {
          localStorage.setItem("userInfo", JSON.stringify(action.payload))
          return { loading: false, userInfo: action.payload };
        } else {
          return { error: action.payload }
        }
      })
      .addCase(logout.pending, (state, action) => {
        return {}
      })
      .addCase(logout.fulfilled, (state, action) => {
        return {}
      })

  },
});


export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    userInfo: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        return { loading: true };
      })
      .addCase(register.fulfilled, (state, action) => {
        const { _id } = action.payload
        if (_id) {
          localStorage.setItem("userInfo", JSON.stringify(action.payload))
          return { loading: false, userInfo: action.payload };
        } else {
          return { error: action.payload }
        }
      })
  },
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {}
  },
  reducers: {
    resetUserDetail: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        const { _id } = action.payload
        if (_id) {
          return { loading: false, user: action.payload };
        } else {
          return { loading: false, error: action.payload }
        }
      })
  },
});

export const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    user: {}
  },
  reducers: {
    reset: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        return { loading: true };
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { _id } = action.payload
        if (_id) {
          return { loading: false, user: action.payload, success: true };
        } else {
          return { loading: false, error: action.payload }
        }
      })
  },
});
export const userListSlice = createSlice({
  name: "userList",
  initialState: {users: [],loading:true},
  reducers: {
    resetUserList: (state, { payload }) => {
      return {users: [],loading:true}
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        return { loading: true };
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        if (typeof action.payload != "string") {
          return { loading: false, users:action.payload};
        } else {
          return { loading: false, error: action.payload }
        }
      })
  },
});

export const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        return { loading: true };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
          return{loading: false, success:true}
      })
  },
});

export const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {user:{}},
  reducers: {
    resetUpdateUser: (state, { payload }) => {
      return {user:{}}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        return { loading: true };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { _id } = action.payload
        
        if(_id){
          return {loading: false, success:true}
        }else{
          return {loading: false, error: action.payload}
        }
      })
  },
});


export const { update } = userLoginSlice.actions;
export const { reset } = userUpdateProfileSlice.actions;
export const { resetUserDetail } = userDetailsSlice.actions;
export const { resetUserList } = userListSlice.actions;
export const { resetUpdateUser } = userUpdateSlice.actions;