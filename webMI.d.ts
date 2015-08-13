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

        /**
         * Write one or more values to OPC UA nodes.
         * @param nodes Node address, as string or as array of strings.
         * @param values Values to write (single value or array of values)
         * @param {Function} fn Called when the value was written. On success, it is passed an empty object.
         * On error, it receives an object with an `error` property.
         * Note that, when writing booleans, numbers != 0 resolve to true.
         */
        write(nodes:String[], values:any[], fn?:Function);

        read(nodeId: String, fn: Function): NodeValue;

        subscribe(nodeId: String, fn: Function): Number;

        unsubscribe(subscriptionId: Number);
    }

    export interface WebMI {

        data: Data
    }

}

declare
var webMI:AtviseWebMI.WebMI;