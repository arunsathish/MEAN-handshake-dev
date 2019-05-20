export interface Feed {
    id?: string;
    groupId?: string;
    feedType: string;
    feedTitle: string;
    feedDesc: string;
    feedCategory: string;
    feedCreator?: string;
    feedCreatedOn?: Date;
    feedUpdatedOn?: Date;
}