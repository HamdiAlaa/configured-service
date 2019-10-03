import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import * as _config from "./config";
import {provider} from './cluster'

let services_conf = require('../config/services_info.json');
let _message:any;

if(services_conf.service_number>0){
    for (let index = 0; index < services_conf.service_number; index++) {
        //Chart
        const service = new k8s.helm.v2.Chart(
            services_conf.services[index].release_name,
            {   
                repo: services_conf.services[index].repo,
                chart: services_conf.services[index].chart,
                version: services_conf.services[index].version,
                // values:{
                //     service:{
                //         type:"ClusterIP"
                //     }
                // }
            },
            { providers: { kubernetes: provider}}
        );
    
    }//End for
    _message = "Your service(s) has been deployed succefuly";
}//End if
else{
    _message = "Please, make sure that you have selected at least a service to deply !!"
}

export const message = _message;
// export let serviceIP = apache
//     .getResourceProperty("v1/Service", "apache-apache", "status")
//     .apply(status => status.loadBalancer.ingress[0].ip);
//export const porvider = provider;