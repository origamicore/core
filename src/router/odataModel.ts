export default class OdataModel
{
    $count:boolean;
    $skip:number;
    $top:number;
    $select:string;
    $filter:string;
    $orderby:string;
    public constructor(data:any ) { 
        if(!data) return
        this.$count= data.$count?.toString()=='true';
        if(data.$skip)try{this.$skip=parseInt(data.$skip)}catch(exp){}
        if(data.$top)try{this.$top=parseInt(data.$top)}catch(exp){}
        if(data.$select)this.$select=data.$select;
        if(data.$filter)this.$filter=data.$filter;
        if(data.$orderby)this.$orderby=data.$orderby;
    }
}