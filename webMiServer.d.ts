declare module AtviseServerMi {

    export interface Request {
        postvalues: Object
    }

    export interface Status {

    }

    export interface BrowseArgs {
        direction: Number;
        reference: String;
        subtype: Boolean;
        nodeclass: Number;
        maxresult: Number;
        typedefinition: String;
        /** Used in conjunction with typedefinition and nodeclass.
         *  If TRUE then all reachable nodes will be searched otherwise only direct referenced nodes. */
        recursive: Boolean;
        exclude: String[];
    }

    export interface BrowseResultItem {
        node: UaNode;
        reference: UaNode;
        isforward: Boolean;
    }

    export interface CreateArgs {
        nodeclass: Number;
        parent: String;
        typedefinition: String;
        reference: String;
        modellingrule: String;
        browsename: String;
        browsenamens: Number;
        displaysname: String;
        displaysnamelocale: String;
        description: String;

        /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
        datatype: String;
        /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
        value: any;
        /** For NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE; optional */
        valuerank: Number;
    }

    export interface UaNode {
        /**
         * Adds a reference to a UaNode.
         * @param referenceTypeId Specifies the reference to add by its UaNodeID.
         * @param targetNodeId Specifies the target node by its UaNodeID.
         */
        addreference(referenceTypeId:String, targetNodeId:String): Status;
        /**
         * Deletes a reference to an UaNode.
         * @param referenceTypeId Specifies the reference to add by its UaNodeID.
         * @param targetNodeId Specifies the target node by its UaNodeID.
         */
        deletereference(referenceTypeId:String, targetNodeId:String): Status;

        /**
         * Assigns value/status/sourcetime properties to UaNode specified by the UaNodeID.
         * The UaNode must be of the nodeclass UaNode.NODECLASS_VARIABLE.
         */
        assign(obj): Status;

        /** Browse the UaNode specified by the input object. */
        browse(params?:BrowseArgs): BrowseResultItem[];

        /**
         * Creates a UaNode specified by the UaNodeID
         */
        create(obj:CreateArgs): Status;

        /** Removes the UaNode. Returns the status of the operation. */
        remove(): Status;

        /** Returns true if the UaNode exists in the address space, false otherwise. */
        exists(): Boolean;

        /** NodeID of the type definition */
        typedefinition: String;

        value;
        status;
        servertime;
        sourcetime;
        browsename: String;
        browsenamens: String;
        displayname: String;
        displaynamelocale: String;
        /** Node class enum. See UaNode.NODECLASS_### constants */
        nodeclass: String;
        nodeid: String;
        nodeaddr: String;
        datatype: String;
        valuerank: Number;

        /** For example displays */
        NODECLASS_VARIABLE: Number;
        NODECLASS_VARIABLEYPE: Number;
        /** For example directories */
        NODECLASS_OBJECT: Number;
        NODECLASS_OBJECTTYPE: Number;
        NODECLASS_VIEW: Number;

    }

    var UaNode:{
        new(address:String): UaNode;
    }

}

declare
var request:AtviseServerMi.Request;

declare
var UaNode:AtviseServerMi.UaNode;

declare
function call(script:String, params:Object):any;