import Log, { Colors } from "../../log/log";
import ConfigContainer, { OriConfigModel, OriConfigPropsModel } from "./ConfigContainer";
import { PropTypes } from "./PropTypes";

interface Type<T> {
    new (...args: any[]): T;
  }
export default function OriConfig(fields: {
    title: string, 
    npm?:string
    description?:string
    isRoot?:boolean
  }) {
    return function <T>(target: Type<T>) {
        var myclass=new target();
        ConfigContainer.addConfig(new OriConfigModel(fields),target.name,fields.isRoot)
    };
}
export function OriConfigProps(fields?: { 
    title?:string
    description?:string
    isRequired?:boolean 
    type?:PropTypes
    propType?:any
})
{
    return function(target: Object, propertyKey: string) { 
        var t = Reflect.getMetadata("design:type", target, propertyKey); 
        if(!t)console.log('type warning');
        if(t.name=='Array')
        {
            if(!fields.propType)
            {
                Log('You must add the property type when using an array -> '+propertyKey,Colors.Read)
                Log('Exp : @OriConfigProps({propType:your-property-type}) ',Colors.Green)
                throw ''
            }
            fields.type=fields.propType.name
        } 
        ConfigContainer.addProps(new OriConfigPropsModel(fields),propertyKey)
    }

}