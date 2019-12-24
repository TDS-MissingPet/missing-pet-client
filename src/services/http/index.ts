import axios from "axios";
import Cookie from "js-cookie";

import { MISSING_PET_USER_COOKIE } from "../../shared/constants";

const user = Cookie.getJSON(MISSING_PET_USER_COOKIE);
const token = (user && user.accessToken) || undefined;

export const httpClient = axios.create({
  baseURL: "https://missing-pet.azurewebsites.net",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined
  }
});