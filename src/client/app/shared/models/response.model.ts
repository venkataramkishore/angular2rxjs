import { AppConstant } from '../util/abf2.const';

export class ResponseData {

    constructor(
        public successResponse:any,
        public failureResponse:string,
        public status:string = AppConstant.SUCCESS
    ) {
        this.failureResponse = failureResponse;
        this.successResponse = successResponse;
        this.status = status;
    }
}
