import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  name: string;
  email: string;
  bio: string;
  password: string;
  __v: number;
}

interface InitialUserStateProps {
  user?: UserData;
  token?: string;
}

interface SetUserInfoPayload {
  data: {
    user: UserData;
  };
  token: string;
}

const initialState: InitialUserStateProps = {
  user: undefined,
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<SetUserInfoPayload>) => {
      state.user = action.payload.data.user;
      state.token = action.payload.token;
    },
    logOut: () => initialState,
  },
});
export const { setUserInfo, logOut } = userSlice.actions;
export default userSlice.reducer;

// A good practice to export these functions here for useSelector
export const getUserDetails = (state: { user: InitialUserStateProps }) =>
  state.user.user;
export const getToken = (state: { user: InitialUserStateProps }) =>
  state.user.token;
