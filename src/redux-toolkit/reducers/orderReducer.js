import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'order/create',
    async (order, { getState }) => {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userInfo.token
            }
        }
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + 'orders', order, config)
            const payload = {
                data
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    })
export const getOrderDetails = createAsyncThunk(
    'order/details',
    async (id, { getState }) => {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userInfo.token
            }
        }
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + 'orders/' + id, config)
            const payload = {
                data
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    })

export const payOrder = createAsyncThunk(
    'order/pay',
    async (order, { getState }) => {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userInfo.token
            }
        }
        try {
            const { data } = await axios.put(process.env.REACT_APP_API_URL + 'orders/' + order.orderId + "/pay", order.paymentResult, config)
            const payload = {
                data
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    })

export const listMyOrders = createAsyncThunk('order/listMy',async (test, { getState }) => {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userInfo.token
            }
        }
        try {
            const {data} = await axios.get(process.env.REACT_APP_API_URL + 'orders/myorders', config)
            return data
        } catch (error) {
            console.log(error)
        }
    })
export const listOrders = createAsyncThunk('order/list',async (test, { getState }) => {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userInfo.token
            }
        }
        try {
            const {data} = await axios.get(process.env.REACT_APP_API_URL + 'orders/', config)
            return data
        } catch (error) {
            console.log(error)
        }
    })

    export const deliverOrder = createAsyncThunk(
        'order/deliver',
        async (order, { getState }) => {
            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userInfo.token
                }
            }
            try {
                const {data} = await axios.put(process.env.REACT_APP_API_URL + 'orders/' + order._id+ "/deliver",{}, config) 
                return data;
            } catch (error) {
                console.log(error)
            }
        })

export const orderCreateSlice = createSlice({
    name: "orderCreate",
    initialState: {
    },
    reducers: {
        resetOrderCreate: (state, { payload }) => {
            return {
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(createOrder.pending, (state) => {
                return { loading: true };
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                const { _id } = action.payload.data
                if (_id) {
                    return {
                        loading: false,
                        success: true,
                        order: action.payload.data
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                return {
                    loading: false,
                    error: "We encountered an error"
                }
            })
    },
});


export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: { loading: true, orderItems: [], shippingAddress: {} },
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getOrderDetails.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                const { _id } = action.payload.data
                if (_id) {
                    return {
                        loading: false,
                        order: action.payload.data
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
    },
});

export const orderPaySlice = createSlice({
    name: "orderPay",
    initialState: {},
    reducers: {
        resetOrderPay: (state, { payload }) => {
            return {
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(payOrder.pending, (state) => {
                return {
                    loading: true,
                };
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                const { _id } = action.payload.data
                if (_id) {
                    return {
                        loading: false,
                        success:true 
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
    },
});

export const orderListMySlice = createSlice({
    name: "orderListMy",
    initialState: {orders:[]},
    reducers: {
        resetListOrder: (state, { payload }) => {
            return {orders:[]}
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(listMyOrders.pending, (state) => {
                return {
                    loading: true,
                };
            })
            .addCase(listMyOrders.fulfilled, (state, action) => {
                if (action.payload.length >= 0) {
                    return {
                        loading: false,
                        orders:action.payload 
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
    },
});
export const orderListSlice = createSlice({
    name: "orderList",
    initialState: {orders:[]},
    reducers: {
        resetListOrder: (state, { payload }) => {
            return {orders:[]}
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(listOrders.pending, (state) => {
                return {
                    loading: true,
                };
            })
            .addCase(listOrders.fulfilled, (state, action) => {
                if (action.payload.length >= 0) {
                    return {
                        loading: false,
                        orders:action.payload 
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
    },
});
export const orderDeliverSlice = createSlice({
    name: "orderDeliver",
    initialState: {},
    reducers: {
        resetOrderDeliver: (state, { payload }) => {
            return {
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(deliverOrder.pending, (state) => {
                return {
                    loading: true,
                };
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                const { _id } = action.payload
                if (_id) {
                    return {
                        loading: false,
                        success:true 
                    };
                } else {
                    return {
                        loading: false,
                        error: action.payload
                    }
                }
            })
    },
});

export const { resetOrderPay } = orderPaySlice.actions;
export const { resetOrderDeliver } = orderDeliverSlice.actions;
export const { resetListOrder } = orderListMySlice.actions;
export const { resetOrderCreate } = orderCreateSlice.actions;