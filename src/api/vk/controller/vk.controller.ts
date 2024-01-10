import {ApiController} from "@/api/base.controller";
import config from "@/router/config";
import {reactive, ref} from "vue";

export class VkController extends ApiController {
    private static BASE = config.VK_BASE_URL
    private static VER = config.VK_VER
    private static TOKEN = config.VK_SERVICE_KEY
    private static ID = import.meta.env.VITE_VK_ID

    private static query = {
        v: this.VER,
        access_token: this.TOKEN
    }

    static login(token, uuid) {
        // this.query['access_token'] = token
        let res = (async () => await this.post('auth.exchangeSilentAuthToken', {
            token,
            uuid
        },{}))()
        console.log(res)
    }

    static async search(q: string) {

    }

    private static createQuery(data) {
        // let res = `?v=${this.query.v}`
        let res = ''
        Object.entries(this.query).forEach(([key, value]) => {
            res += `&${key}=${value}`
        })
        Object.entries(data).forEach(([key, value]) => {
            res += `&${key}=${value}`
        })
        return res
    }

    private static async get(url, params) {
        return this._get(this.BASE + url + this.createQuery(params)).then(d => d)
    }

    private static async post(url, params, data) {
        return this._post(this.BASE + url + this.createQuery(params), data)
    }
}