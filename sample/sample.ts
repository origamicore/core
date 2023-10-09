import OrigamiCore, { Router } from "../";
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
        var model=new Model2({_id:'21',gender:'male',firstName:'vahid',lastName:'hossaini'}); 
        console.log('>>model',model.isValid()); 
        console.log('>>model',model.toJSON());
        console.log('>>model',model.fullName);
        model.clearByTag('readonly');
        console.log('>>model',model.toJSON());
        
        var origamicore = new OrigamiCore(config);
        await origamicore.start()
        var list:TestModel[]=[
            new TestModel({fname:'fname1',lname:'lname1'}),
            new TestModel({fname:'fname2',lname:'lname2'}),
        ];
        console.log('>>',JSON.parse(JSON.stringify(list)) );
        
        var data:any={}
        data=await SampleRoute.RunTestService('vahid1xx','hoss',[{xx:'dd'},{xx:'dd'}]);
        console.log(data);
        try{
            data=await SampleRoute.RunTestService('','hoss','dd');

        }catch(exp){
            console.log('Exception : '+exp); 
        }

        data=await SampleRoute.RunTestService1('vahid1xx','hoss','dd');
        console.log(data);
        data=await SampleRoute.RunEventService((eventData)=>{
            console.log(eventData);
        })
        console.log(data);
        for(let domain of Router.getDomains())
        {
            let services=Router.getExternalServices(domain);
            for(let service of services)
            {
                let serviceData=  Router.getRouteData(domain,service)
                console.log('serviceData>>>',serviceData);
            } 
        } 
        let getTest=await SampleRoute.RunGetTest();
        console.log(getTest);
        setTimeout(async()=>{
            await origamicore.restart()
            await origamicore.stop()
        },5000)   
    }
}
new SampleProject();