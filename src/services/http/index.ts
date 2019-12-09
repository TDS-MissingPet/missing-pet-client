import axios from "axios";
import Cookie from "js-cookie";

import { MISSING_PET_USER_COOKIE } from "../../shared/constants";

const tempToken = 'eDuWLvY9mgVULy-UER-CWg_v5KoT59mQHO6SXdswKrP5ulv7vYvGRzjADPs4AvSKMBF2Go2KlkM9aqHromV9PAwqRbKSzbrW7PBs-jm_8GzJmhY6V4oO2etGwI0L4StliQzWnKvN2MTfhi5fANrPo2xogpCsly9fTPry2mWGFRxJFl-bThUBzCjwZsAhYYT-r7hXrURN-UBKVzwsz3Ii3tz6-OV2yrEwJ0F78svCwoO3t7ub05EE7oA--NxbiEQZ-kiGMjBxcaiHK63tZBU7tiDBROZsrmPvIKYojuMliwRR9tumEH-rRYnx0hmk6bPbmjG_0G0duLIGfswVZqPcj-BPGk-_5mqhlDePt65eNqxjXpZ8GFOWKB05wuAa-rH7ojo8gB0HsDZQxqFfa0Z94WrL7eHqQo4_G1iCK36aPpsebhiBp4uONJL8fuXxyltZQ-ck09SiVq8YXaEQ7ZRvsEY2SIQ2R4nDObB6zwM-Y9o';
const user = Cookie.getJSON(MISSING_PET_USER_COOKIE);
const token = tempToken || (user && user.accessToken) || undefined;

export const httpClient = axios.create({
  baseURL: "https://missing-pet.azurewebsites.net",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined
  }
});