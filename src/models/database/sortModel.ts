export default class SortModel
{
    name:string;
    type:'asc'|'desc';
    constructor(
        fields?: {
            name?: string
            type?: 'asc'|'desc'
    }){
        Object.assign(this,fields)
    }
}