import {ApiController} from "@/api/base.controller";
import config from "@/router/config";
import {reactive, ref} from "vue";
export class VkController extends ApiController {
    private static BASE = config.VK_BASE_URL
    private static VER = config.VK_VER
    private static TOKEN = config.VK_SERVICE_KEY

    private static query = {
        v: this.VER,
        access_token: this.TOKEN,
    }

    static async search(q: string) {

    }

    private static createQuery(data) {
        let res = `?v=${this.query.v}&access_token=${this.query.access_token}`
        Object.entries(data).forEach(([key, value]) => {
            res += `&${key}=${value}`
        })
        return res
    }

    private static async get(url) {
        return this._get(this.BASE + url).then(d => d)
    }

    private static async post(url, data) {
        return this._post(this.BASE + url + this.createQuery(data), data)
    }


}