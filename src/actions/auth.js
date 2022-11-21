import * as api from "../api";
import Notifications, { notify } from "react-notify-toast";

let myColor = { background: "#0E1717", text: "#FFFFFF" };

export const register = (formValues) => async (dispatch) => {
  try {
    dispatch({ type: "STARTLOADING" });

    const { data } = await api.register(formValues);

    dispatch({ type: "AUTH", data });
    dispatch({ type: "ENDLOADING" });
  } catch (error) {
    const data = error.response.data;
    notify.show(data.msg, "error", 3000, myColor);
  }
};

export const login = (loginFormValues) => async (dispatch) => {
  try {
    dispatch({ type: "STARTLOADING" });
    const { data } = await api.login(loginFormValues);

    dispatch({ type: "LOGIN", data });
    dispatch({ type: "ENDLOADING" });
  } catch (error) {
    const data = error.response.data;
    notify.show(data.msg, "error", 3000, myColor);
  }
};
