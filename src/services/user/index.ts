import { AxiosInstance, AxiosError } from "axios";
import Cookie from "js-cookie";
import flatten from "lodash/flatten";

import { User } from "../../stores/user";
import { httpClient } from "../http";
import { Account } from "./types";

export class UserService {
  private readonly _http: AxiosInstance = httpClient;
  private _user?: User;

  constructor() {
    this._user = Cookie.getJSON("user_user");
  }

  get user() {
    return this._user;
  }

  async createAccount(payload: Account) {
    try {
      const apiBody = {
        Email: payload.email,
        Password: payload.password,
        ConfirmPassword: payload.password,
        FirstName: payload.firstName,
        UserName: payload.userName,
        LastName: payload.lastName,
        PhoneNumber: payload.phoneNumber
      };
      await this._http.post("/api/account", apiBody);
      this._user = payload;
      return this._user;
    } catch (e) {
      const res = (e as AxiosError).response;
      const normalizedErrorMessage = res
        ? flatten(Object.values(res.data.ModelState)).join("\n")
        : "Something went wrong, please try again later";
      throw new Error(normalizedErrorMessage);
    }
  }
}

export default new UserService();
