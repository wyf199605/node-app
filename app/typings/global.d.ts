
interface obj<T = any> {
    [name: string]: T;
}

interface CustomFile{
    path: string | Buffer;
    name: string;
    type: string;
}
