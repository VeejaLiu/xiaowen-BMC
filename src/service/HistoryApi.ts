import axios from "axios";
import {backendUrl} from "./config.ts";




/**
 * History API
 */
export class HistoryApi {

    /**
     * Get movement list by category id
     */
    static async getHistory() {
        try {
            const url = `${backendUrl}/api/v1/admin/history`;
            const response = await axios.get(url);
            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
