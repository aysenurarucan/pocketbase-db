import PocketBase from "pocketbase";
import { Capacitor } from "@capacitor/core";

const HOST = Capacitor.isNativePlatform() ? "10.0.2.2" : "127.0.0.1";

export const pb = new PocketBase(`http://${HOST}:8090`);
