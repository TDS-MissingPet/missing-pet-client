import { AxiosInstance, AxiosError } from "axios";
import Cookie from "js-cookie";
import flatten from "lodash/flatten";
import qs from "querystring";

import { User } from "../../stores/user";
import { httpClient } from "../http";
import { Account } from "./types";
import { MISSING_PET_USER_COOKIE } from "../../shared/constants";

export class UserService {
  private readonly _http: AxiosInstance = httpClient;
  private _user?: User;

  constructor() {
    this._user = Cookie.getJSON(MISSING_PET_USER_COOKIE);
  }

  get user() {
    return this._user;
  }

  reset() {
    Cookie.remove(MISSING_PET_USER_COOKIE);
    this._user = undefined;
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
      const res = await this._http.post<number>("/api/account", apiBody);
      this._user = { ...payload, id: res.data };
      return this._user;
    } catch (e) {
      const res = (e as AxiosError).response;
      const normalizedErrorMessage = res
        ? flatten(Object.values(res.data.ModelState)).join("\n")
        : "Something went wrong, please try again later";
      throw new Error(normalizedErrorMessage);
    }
  }

  async authorize(payload: Pick<Account, "userName" | "password">) {
    try {
      const apiBody = {
        grant_type: "password",
        username: payload.userName,
        password: payload.password
      };
      const res = await this._http.post<{
        access_token: string;
        userName: string;
      }>("/token", qs.stringify(apiBody), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      this.storeUser(res.data);

      return res.data.access_token;
    } catch (e) {
      const res = (e as AxiosError).response;
      const normalizedErrorMessage =
        (res && res.data && res.data.error_description) ||
        "Something went wrong, please try again later";
      throw new Error(normalizedErrorMessage);
    }
  }

  private storeUser(data: { access_token: string; userName: string }) {
    const user = this._user || ({} as Partial<User>);
    user.accessToken = data.access_token;
    user.userName = user.userName || data.userName;
    Cookie.set(MISSING_PET_USER_COOKIE, JSON.stringify(user));
  }
}

export default new UserService();
