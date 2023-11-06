import axios from "axios";

const backendUrl = "http://127.0.0.1:10100";


/**
 * Draw API
 */
export class DrawApi {

    /**
     * Get movement list by category id
     */
    static async draw({style, prompt}: { style: number; prompt: string }) {
        try {
            const url = `${backendUrl}/api/v1/admin/draw`;
            const response = await axios.post(url, {
                style,
                prompt
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
