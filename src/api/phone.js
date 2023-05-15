import axios from "@/utils/http";

export function CallingPhone(data) {
    return axios({
        method: 'post',
        url: '/CallingPhone',
        data
    })
}