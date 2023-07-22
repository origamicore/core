import OrigamiCore from "../";
import config from "./config";
import SampleIndex from "./module";
import Model2 from "./module/models/model2";
import SampleRoute from "./module/models/sampleRoute";
import TestModel from "./module/models/testModel";
export default class SampleProject
{
    constructor()
    {
        this.init();
    }
    async init()
    {
        var model=new Model2({gender:'male'}); 
        console.log('>>model',model.$oriExtraData.isValid()); 
        console.log('>>model',model.toJSON());
        model.$oriExtraData.clearByTag('readonly');
        console.log('>>model',model.toJSON());
        
        var origamicore = new OrigamiCore(config);
        await origamicore.start()
        var list:TestModel[]=[
            new TestModel({fname:'fname1',lname:'lname1'}),
            new TestModel({fname:'fname2',lname:'lname2'}),
        ];
        console.log('>>',JSON.parse(JSON.stringify(list)) );
        
        var data=await SampleRoute.RunTestService('vahid1xx','hoss',[{xx:'dd'},{xx:'dd'}]);
        console.log(data);
        
        data=await SampleRoute.RunTestService('','hoss','dd');
        console.log(data);

        data=await SampleRoute.RunTestService1('vahid1xx','hoss','dd');
        console.log(data);
        

    }
}
new SampleProject();