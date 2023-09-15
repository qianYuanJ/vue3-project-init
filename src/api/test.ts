import api from "@config/requestConfig";


export function testRequest(params: Object) {
    return api('/web/ec/spu/list', params, 'POST', false)
}