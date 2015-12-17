declare module AtviseWebMI {

    export interface NodeValue {
        value: String;
        timestamp;
        status:Number;
        description:String;
        address:String;
    }

    export interface QueryFilter {
        type:Array<String>;
        address:Array<String>;
        timestamp:Array<String>;
        value:Array<String>;
        priority:Array<String>;
        username:Array<String>;
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
        write(nodes:String, values:any, fn?:Function);

        read(nodeId:String, fn:Function): NodeValue;
        read(nodeId:String[], fn:Function): NodeValue;

        subscribe(nodeId:String, fn:Function): Number;
        subscribeBlock(nodeIds: String[], alarmIds: String[], fn:Function);

        unsubscribe(subscriptionId:Number);

        /**
         * This function makes a query to the server and requests historical data. The parameter "filters" is used
         * to constrain the requested data. The result will be received in the callback function.
         */
        queryFilter(filters:QueryFilter, fn:Function);

        login(username:String, password:String, fn:Function);
        logout(fn:Function);

        /**
         * Pauses the data communication for all subscriptions in the current display (counterpart to webMI.data.resume).
         */
        pause();
    }

    export interface Alarm {
        accept(conditions:any[]);
        acceptDisplay();
        subscribe(conditionId, fn:Function);
        unsubscribe(conditionId);
    }

    export interface WebMI {

        data: Data;
        alarm: Alarm;
    }

}

declare var webMI:AtviseWebMI.WebMI;
