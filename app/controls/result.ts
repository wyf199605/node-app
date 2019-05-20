
interface IAppResultPara {
    code?: number;
    msg?: string;
    data?: any;
}

export class AppResult{
    public readonly code;
    public readonly msg;
    public readonly data;
    constructor(props: IAppResultPara = {}) {
        this.code = props.code || 200;
        this.msg = props.msg || '';
        this.data = props.data || null;
    }
}
