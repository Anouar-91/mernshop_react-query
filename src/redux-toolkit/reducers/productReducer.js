import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk("product/list", async (params, { getState }) => {
  try {
    const keyword = params.keyword ? params.keyword : '';
    const pageNumber = params.pageNumber ? params.pageNumber : ""
    const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products?keyword='+keyword+"&pageNumber="+params.pageNumber)
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const deleteProduct = createAsyncThunk("product/delete", async (id, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.delete(process.env.REACT_APP_API_URL + 'products/' + id, config)
    
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const detailProduct = createAsyncThunk("product/detail", async (id, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products/' + id)
    
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const createProduct = createAsyncThunk("product/create", async (test, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
          'Content-Type': 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.post(process.env.REACT_APP_API_URL + 'products/',{} ,config)
    
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const updateProduct = createAsyncThunk("product/update", async (product, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
          'Content-Type': 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.put(process.env.REACT_APP_API_URL + 'products/'+product._id,{product}, config)
    
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const createProductReview = createAsyncThunk("product/createReview", async (product, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    console.log(product.review)

    const {data} = await axios.post(process.env.REACT_APP_API_URL + 'products/'+product.id+"/reviews",product.review, config)
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const listTopProducts = createAsyncThunk("product/top", async (params, { getState }) => {
  try {
    const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products/top')
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})


export const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
    loading:true
  },
  reducers: {
    setProductData: (state, { payload }) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        return { loading: true };
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        if (action.payload.products instanceof Array) {
          return {
            loading: false,
            products: action.payload.products,
            pages: action.payload.pages,
            page:action.payload.page
          }
        } else {
          return {
            loading: false,
            products: [],
            error: action.payload
          }
        }
      })
  },
});

export const { setProductData } = productsListSlice.actions;

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: {reviews : []}, loading:true
  },
  reducers: {
    getDetail: (state, { payload }) => {
      state.product = payload;
    },
    resetProductDetail: (state, {payload}) => {
      return {
        product: {reviews : []}, loading:true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(detailProduct.pending, (state) => {
        return {                 loading:true, ...state };
      })
      .addCase(detailProduct.fulfilled, (state, action) => {

        if (action.payload._id) {
          return {
            loading:false, 
            product: action.payload
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});



export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {loading:true},
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        return { loading: true };
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {

        if (action.payload.message == "product removed") {
          return {
            loading:false, 
            success: true
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});

export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {loading:true},
  reducers: {
    resetProductCreate: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        return { loading: true };
      })
      .addCase(createProduct.fulfilled, (state, action) => {

        if (action.payload._id) {
          return {
            loading:false, 
            success: true,
            product: action.payload
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});
export const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {product:{}},
  reducers: {
    resetProductUpdate: (state, { payload }) => {
      return {product:{}}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        return { loading: true };
      })
      .addCase(updateProduct.fulfilled, (state, action) => {

        if (action.payload._id) {
          return {
            loading:false, 
            success: true,
            product: action.payload
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});
export const productCreateReviewSlice = createSlice({
  name: "productCreateReview",
  initialState: {},
  reducers: {
    resetProductCreateReview: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductReview.pending, (state) => {
        return { loading: true };
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        if (action.payload.message === "Review added") {
          return {
            loading:false, 
            success: true,
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});


export const productTopRateSlice = createSlice({
  name: "productTop",
  initialState: {
    products:[]
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(listTopProducts.pending, (state) => {
        return {
          loading:true,
          products:[]
      };
      })
      .addCase(listTopProducts.fulfilled, (state, action) => {
        if (action.payload instanceof Array) {
          return {
            loading:false, 
            products: action.payload,
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});

export const { getDetail } = productDetailSlice.actions;
export const {resetProductCreate} = productCreateSlice.actions
export const {resetProductUpdate} = productUpdateSlice.actions
export const {resetProductDetail} = productDetailSlice.actions
export const {resetProductCreateReview} = productCreateReviewSlice.actions
/* import { createAction, createReducer } from '@reduxjs/toolkit'

export const setProductData = createAction('product/setProductData')

const initialState = { products: [] }

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProductData, (state, {payload}) => {
      state.products = payload;
    })

})

export default productReducer; */