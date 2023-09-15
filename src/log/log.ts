export  class Colors
{
    static Read='\x1b[31m';
    static Green='\x1b[32m';
    static Yellow='\x1b[33m';
    static Blue='\x1b[34m';
    static White='\x1b[37m';
}
export default function Log(text:string,color:string=Colors.White){
    console.log(color+"%s\x1b[0m",text);
}