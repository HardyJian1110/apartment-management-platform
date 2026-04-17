import { post, get } from "../utils/http/request";

interface LoginData {
  username: string;
  passsword: string;
}

export function login(data: LoginData) {
  return post("/login", data);
}

export function getMenu() {
  return get("/menu");
}
