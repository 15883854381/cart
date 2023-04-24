import { showNotify } from "vant";

/**
 * 
 * @param {Array} userDaa 需要验证的字段 
 *  @param {Object} data 数据 
 * @returns  Boolean
 */
export function verification(userDaa, data) {
    // let userDaa = ["username", "phone_number", "sms"];
    let verification = userDaa.every((item) => {
        return data[item].trim() === "" ? false : true;
    });
    if (!verification) {
        showNotify({ type: "danger", message: "请填写完整信息" });
        return false;
    } else {
        return true;
    }
}