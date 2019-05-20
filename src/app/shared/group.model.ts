export interface Group {
    _id?: string;
    groupName: string;
    groupCode?: string;
    creator: string;
    createdOn: Date;
    members?: [{ userId: string, isAdmin: boolean }];
}
