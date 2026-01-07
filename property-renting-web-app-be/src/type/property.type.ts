export type PropertyQuery = {
    page? : number | string,
    limit? : number | string,
    categoryid? : number | string,
    name? : string,
    sortby? : 'name' | 'price',
    order? : 'asc' | 'desc',
};
