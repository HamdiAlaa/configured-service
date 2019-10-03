import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import * as _config from "./config";



const provider = new k8s.Provider('myProvider',{
    kubeconfig:_config.kubeConfigContent,
    cluster:"kubernetes",
    context:"kubernetes-admin@kubernetes",

});

const apache = new k8s.helm.v2.Chart(
    "apache-release",
    {   
        repo: _config.repo,
        chart: _config.chart,
        version: _config.version,
        // values:{
        //     service:{
        //         type:"ClusterIP"
        //     }
        // }
    },
    { providers: { kubernetes: provider}}
);
// export let serviceIP = apache
//     .getResourceProperty("v1/Service", "apache-apache", "status")
//     .apply(status => status.loadBalancer.ingress[0].ip);
export const porvider = provider;