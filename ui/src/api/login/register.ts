import request from "../../utils/request";
import { registerForm } from "@/types/login/type";

export const register = (params: registerForm) => {
  return request.post("/register", params);
};
