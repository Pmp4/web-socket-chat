import httpCommon from "./http-common";

const chattView = () => {
    return httpCommon.get(`/chatt/`);
}

export default {chattView};