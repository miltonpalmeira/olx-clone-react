export interface ILogin {
    name?: string;
    email: string;
    password: string;
    state?: string;
    token?: string;
}

export interface StateListItem {
    id: number;
    name: string;
}