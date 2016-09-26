declare module AtviseWebMI {

    export interface NodeValue {
        value : string;
        timestamp;
        status : number;
        description : string;
        address : string;
    }

    export interface QueryFilter {
        type : Array<string>;
        address : Array<string>;
        timestamp : Array<string>;
        value : Array<string>;
        priority : Array<string>;
        username : Array<string>;
    }

    export interface Data {
        call( name : string, params : Object, fn? : Function );

        /**
         * Write one or more values to OPC UA nodes.
         * @param nodes Node address, as string or as array of strings.
         * @param values Values to write (single value or array of values)
         * @param {Function} fn Called when the value was written. On success, it is passed an empty object.
         * On error, it receives an object with an `error` property.
         * Note that, when writing booleans, numbers != 0 resolve to true.
         */
        write( nodes : string[], values : any[], fn? : Function );
        write( nodes : string, values : any, fn? : Function );

        /**
         * Read the value of the given node
         * @param nodeId
         * @param fn Callback function
         */
        read( nodeId : string, fn : Function ) : NodeValue;
        read( nodeId : string[], fn : Function ) : NodeValue;

        subscribe( nodeId : string, fn : Function ) : number;
        subscribeBlock( nodeIds : string[], alarmIds : string[], fn : Function );

        unsubscribe( subscriptionId : number );

        /**
         * This function makes a query to the server and requests historical data. The parameter "filters" is used
         * to constrain the requested data. The result will be received in the callback function.
         */
        queryFilter( filters : QueryFilter, fn : Function );

        login( username : string, password : string, fn : Function );
        logout( fn : Function );

        /**
         * Pauses the data communication for all subscriptions in the current display (counterpart to webMI.data.resume).
         */
        pause();
    }

    export interface Alarm {
        accept( conditions : any[] );
        acceptDisplay();
        subscribe( conditionId, fn : Function );
        unsubscribe( conditionId );
    }

    export interface WebMI {

        data : Data;
        alarm : Alarm;
    }

}

declare var webMI : AtviseWebMI.WebMI;
