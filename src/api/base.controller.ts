import axios, {AxiosError} from 'axios'
import config from "@/router/config";

export class ApiController {
    protected static async _post(url, data) {
        return await this.doAxiosPost(url, data)
    }

    protected static async _get(url: string) {
        return await this.doAxiosGet(url)
    }

    private static async doAxiosPost<T>(url: string, data: object): Promise<T> {
        try {
            const post = await axios.post<T>(url, data)
            return post.data
        } catch (error) {
            throw await this.onError(error)
        }
    }

    private static async doAxiosGet<T>(url: string): Promise<T> {
        try {
            const post = await axios.get<T>(url)
            return post.data
        } catch (error) {
            throw await this.onError(error)
        }
    }

    private static async onError(error: unknown) {
        console.error(error)
        return error
    }
}