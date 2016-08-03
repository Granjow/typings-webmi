declare module AtviseServerMi {

    export interface Request {
        postvalues : Object
    }

    export interface Status {

    }

    export interface BrowseArgs {
        /** See UaNode.BROWSEDIRECTION_* */
        direction : Number;
        /** Reference type, for example UaNode.PROPERTY */
        reference : String;
        subtype : Boolean;
        /** See UaNode.NODECLASS_* */
        nodeclass : Number;
        maxresult : Number;
        typedefinition : String;
        /** Used in conjunction with typedefinition and nodeclass.
         *  If TRUE then all reachable nodes will be searched otherwise only direct referenced nodes. */
        recursive : Boolean;
        exclude : String[];
    }

    export interface BrowseResultItem {
        node : UaNode;
        reference : UaNode;
        isforward : Boolean;
    }

    export interface CreateArgs {
        nodeclass : Number;
        parent : String;
        typedefinition : String;
        reference? : String;
        modellingrule? : String;
        browsename? : String;
        browsenamens? : Number;
        displaysname? : String;
        displaysnamelocale? : String;
        description? : String;

        /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
        datatype? : String;
        /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
        value? : any;
        /** For NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE; optional */
        valuerank? : Number;
    }

    export interface DatahistoryArgs {

    }

    export interface DataHistory {
        status;
        values : Object[];
    }

    export interface UaNode {
        /**
         * Adds a reference to a UaNode.
         * @param referenceTypeId Specifies the reference to add by its UaNodeID.
         * @param targetNodeId Specifies the target node by its UaNodeID.
         */
        addreference( referenceTypeId : String, targetNodeId : String ) : Status;
        /**
         * Deletes a reference to an UaNode.
         * @param referenceTypeId Specifies the reference to add by its UaNodeID.
         * @param targetNodeId Specifies the target node by its UaNodeID.
         */
        deletereference( referenceTypeId : String, targetNodeId : String ) : Status;

        /**
         * Assigns value/status/sourcetime properties to UaNode specified by the UaNodeID.
         * The UaNode must be of the nodeclass UaNode.NODECLASS_VARIABLE.
         */
        assign( obj ) : Status;

        /** Browse the UaNode specified by the input object. */
        browse( params? : BrowseArgs ) : BrowseResultItem[];

        /**
         * Creates a UaNode specified by the UaNodeID
         */
        create( obj : CreateArgs ) : Status;

        /** Removes the UaNode. Returns the status of the operation. */
        remove() : Status;

        /** Returns true if the UaNode exists in the address space, false otherwise. */
        exists() : Boolean;

        /** Converts the node to a string. */
        toString() : String;

        /** @param statusCode Defaults to this.status */
        statusToString( statusCode? : Number ) : String;

        /** @param nodeClass Defaults to this.nodeclass */
        nodeClassToString( nodeClass? : Number ) : String;

        datahistory( obj : DatahistoryArgs ) : DataHistory;
        good() : Status;
        bad() : Status;
        uncertain() : Status;
        equal( node1 : UaNode, node2 : UaNode );

        /** NodeID of the type definition */
        typedefinition : String;

        value;
        status;
        servertime;
        sourcetime;
        browsename : String;
        browsenamens : String;
        displayname : String;
        displaynamelocale : String;
        /** Node class enum. See UaNode.NODECLASS_### constants */
        nodeclass : String;
        nodeid : String;
        nodeaddr : String;
        datatype : String;
        valuerank : Number;


        /* Browse Directions */

        BROWSEDIRECTION_FORWARD : Number;
        BROWSEDIRECTION_INVERSE : Number;
        BROWSEDIRECTION_BOTH : Number;



        /* Node Classes */

        NODECLASS_UNSPECIFIED : Number;
        /** For example directories */
        NODECLASS_OBJECT : Number;
        /** For example displays */
        NODECLASS_VARIABLE : Number;
        NODECLASS_METHOD : Number;
        NODECLASS_OBJECTTYPE : Number;
        NODECLASS_VARIABLETYPE : Number;
        NODECLASS_REFERENCETYPE : Number;
        NODECLASS_DATATYPE : Number;
        NODECLASS_VIEW : Number;

        /* Reference Types */

        /** Reference type */
        NONHIERARCHICALREFERENCES : Number;
        /** Reference type */
        HIERARCHICALREFERENCES : Number;
        /** Reference type */
        HASCHILD : Number;
        /** Reference type */
        ORGANIZES : Number;
        /** Reference type */
        HASEVENTSOURCE : Number;
        /** Reference type */
        HASTYPEDEFINITION : Number;
        /** Reference type */
        HASEVENTHISTORY : Number;
        /** Reference type */
        AGGREGATES : Number;
        /** Reference type */
        HASSUBTYPE : Number;
        /** Reference type */
        HASPROPERTY : Number;
        /** Reference type */
        HASCOMPONENT : Number;
        /** Reference type */
        HASNOTIFIER : Number;
        /** Reference type */
        HASCONDITION : Number;


        /* Modelling Rules */

        MODELLINGRULE_MANDATORY : Number;
        MODELLINGRULE_MANDATORYSHARED : Number;


        /* Data Types */

        /** Data Type */
        BOOLEAN : Number;
        /** Data Type */
        INT16 : Number;
        /** Data Type */
        UINT16 : Number;
        /** Data Type */
        INT32 : Number;
        /** Data Type */
        UINT32 : Number;
        /** Data Type */
        FLOAT : Number;
        /** Data Type */
        DOUBLE : Number;
        /** Data Type */
        STRING : Number;
        /** Data Type */
        DATETIME : Number;


        /* Type Definitions */

        BASEVARIABLETYPE : String;
        FOLDERTYPE : String;


        /* Value Ranks */

        VALUERANK_SCALARORONEDIMENSION : Number;
        VALUERANK_SCALARORANYDIMENSIONS : Number;
        VALUERANK_SCALAR : Number;
        VALUERANK_ANYDIMENSIONS : Number;
        VALUERANK_ONEDIMENSION : Number;


        /* Aggregate Functions */

        AGGREGATEFUNCTION_AVERAGE : Number;
        AGGREGATEFUNCTION_TIMEAVERAGE : Number;
        AGGREGATEFUNCTION_TOTAL : Number;
        AGGREGATEFUNCTION_MINIMUM : Number;
        AGGREGATEFUNCTION_MAXIMUM : Number;
        AGGREGATEFUNCTION_COUNT : Number;


    }

    var UaNode : {
        new( address : String ) : UaNode;
    };

    export interface BackupArgs {
        filename : String;
        timeout : Number;
        pages : Number;
        sleep : Number;
    }

    export interface Database {
        /**
         * Performs a live backup of the database.
         *
         * This functions creates a nodes.db backup of the currently active database.
         * By default, backup is stored to "<ProjectDir>/nodes_STARTTIME.db". Filename
         * can be assigned with an absolute path or relative to the project directory.
         * Default parameters should be ok for most cases.
         * Backup status/progress can be viewed in ModuleStatistics.DATABASE.BackupStatus and
         * ModuleStatistics.DATABASE.BackupProgress.
         *
         * @param options Optional:
         * <ul>
         * <li>filename OPTIONAL_STRING_DEFAULT="";
         * Specifies the filename where to save the database copy. If empty, default is used.</li>
         * <li>timeout OPTIONAL_INT_DEFAULT=300;
         * Specifies the timeout, in seconds, for database backup.</li>
         * <li>pages OPTIONAL_INT_DEFAULT=10000;
         * Specifies the amount of pages being copied to the new database in each iteration.</li>
         * <li>sleep OPTIONAL_INT_DEFAULT=40;
         * Specifies the interval, in milliseconds, to wait between two iterations.</li>
         * </ul>
         */
        backup( options : BackupArgs );

        setConfig( name : string, value : any );

        getConfig( name : string ) : any;
    }

    export interface server {
        database : Database;
    }

}

declare var request : AtviseServerMi.Request;

declare var UaNode : AtviseServerMi.UaNode;

declare function call( script : String, params : Object ) : any;

declare var server : AtviseServerMi.server;