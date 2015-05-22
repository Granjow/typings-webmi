declare module AtviseWebMI {

    export interface NodeValue {
        value: String;
        timestamp;
        status:Number;
        description:String;
        address:String;
    }

    export interface Data {
        call(name:String, params:Object, fn?:Function);

        write(nodes:String[], values:any[], fn?:Function);

        read(nodeId: String, fn: Function): NodeValue;

        subscribe(nodeId: String, fn: Function): Number;

        unscubscribe(subscriptionId: Number);
    }

    export interface WebMI {

        data: Data
    }

}

declare
var webMI:AtviseWebMI.WebMI;