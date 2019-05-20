export interface Resource {
    _id?: string;
    resourceTitle: string;
    resourceDesc: string;
    resourceCreator: string;
    resourceCreatedOn: Date;
    resourceUpdatedOn?: Date;
}