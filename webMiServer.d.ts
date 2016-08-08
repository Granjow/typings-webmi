interface Status {

}

interface BackupArgs {
    filename : string;
    timeout : number;
    pages : number;
    sleep : number;
}


interface Request {
    postvalues : Object
}

interface BrowseArgs {
    /** See UaNode.BROWSEDIRECTION_* */
    direction : number;
    /** Reference type, for example UaNode.PROPERTY */
    reference : string;
    subtype : boolean;
    /** See UaNode.NODECLASS_* */
    nodeclass : number;
    maxresult : number;
    /** BASEVARIABLETYPE or FOLDERTYPE */
    typedefinition : string;
    /** Used in conjunction with typedefinition and nodeclass.
     *  If TRUE then all reachable nodes will be searched otherwise only direct referenced nodes. */
    recursive : boolean;
    exclude : string[];
}

interface BrowseResultItem {
    node : UaNode;
    reference : UaNode;
    isforward : boolean;
}

interface CreateArgs {
    nodeclass : number;
    parent : string;
    /** BASEVARIABLETYPE or FOLDERTYPE */
    typedefinition : number;
    reference? : string;
    modellingrule? : string;
    browsename? : string;
    browsenamens? : number;
    displaysname? : string;
    displaysnamelocale? : string;
    description? : string;

    /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
    datatype? : number;
    /** Required for NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE */
    value? : any;
    /** For NODECLASS_VARIABLE and NODECLASS_VARIABLETYPE; optional */
    valuerank? : number;
}

interface DatahistoryArgs {

}

interface DataHistory {
    status;
    values : Object[];
}

interface Database {
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

interface UaNode {

    /**
     * Adds a reference to a UaNode.
     * @param referenceTypeId Specifies the reference to add by its UaNodeID.
     * @param targetNodeId Specifies the target node by its UaNodeID.
     */
    addreference( referenceTypeId : string, targetNodeId : string ) : Status;
    /**
     * Deletes a reference to an UaNode.
     * @param referenceTypeId Specifies the reference to add by its UaNodeID.
     * @param targetNodeId Specifies the target node by its UaNodeID.
     */
    deletereference( referenceTypeId : string, targetNodeId : string ) : Status;

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
    exists() : boolean;

    /** Converts the node to a string. */
    tostring() : string;

    /** @param statusCode Defaults to this.status */
    statusTostring( statusCode? : number ) : string;

    /** @param nodeClass Defaults to this.nodeclass */
    nodeClassTostring( nodeClass? : number ) : string;

    datahistory( obj : DatahistoryArgs ) : DataHistory;
    good() : Status;
    bad() : Status;
    uncertain() : Status;
    equal( node1 : UaNode, node2 : UaNode );

    /** NodeID of the type definition, BASEVARIABLETYPE or FOLDERTYPE */
    typedefinition : string;
    /** Actual value of a variable node */
    value;
    /** Actual status of a variable node */
    status;
    servertime;
    sourcetime;
    /** Name part of the browse name */
    browsename : string;
    browsenamens : string;
    /** Text part of the display name */
    displayname : string;
    displaynamelocale : string;
    /** Node class enum. See UaNode.NODECLASS_### constants */
    nodeclass : string;
    /** The node ID of the node in XML string form, e.g. ns=1;s='AGENT.OBJECTS.a' */
    nodeid : string;
    /** The string part of the node ID, e.g.: 'AGENT.OBJECTS.a' */
    nodeaddr : string;
    /** The data type of the variable node. E.g.: UaNode.INT32, UaNode.BOOLEAN, etc. */
    datatype : string;
    /** The value rank of the variable node. -1=SCALAR, 0=ARRAY, 1--n=ARRAY_DIMENSION. You can use UaNode.VALUERANKSCALAR, UaNode.VALUERANKANYDIMENSIONS, etc. */
    valuerank : number;
}

/**
 * Browse Directions: See BROWSEDIRECTION_*
 * Node Classes: See NODECLASS_*
 * References: See (NON)HIERARCHICALREFERENCES, HAS*, AGGREGATES, ORGANIZES
 */
interface UaNodeStatic {
    new( nodeAddress : string ) : UaNode;


    /* Browse Directions */

    BROWSEDIRECTION_FORWARD : number;
    BROWSEDIRECTION_INVERSE : number;
    BROWSEDIRECTION_BOTH : number;



    /* Node Classes */

    NODECLASS_UNSPECIFIED : number;
    /** For example directories */
    NODECLASS_OBJECT : number;
    /** For example displays */
    NODECLASS_VARIABLE : number;
    NODECLASS_METHOD : number;
    NODECLASS_OBJECTTYPE : number;
    NODECLASS_VARIABLETYPE : number;
    NODECLASS_REFERENCETYPE : number;
    NODECLASS_DATATYPE : number;
    NODECLASS_VIEW : number;

    /* Reference Types */

    /** Reference type */
    NONHIERARCHICALREFERENCES : number;
    /** Reference type */
    HIERARCHICALREFERENCES : number;
    /** Reference type */
    HASCHILD : number;
    /** Reference type */
    ORGANIZES : number;
    /** Reference type */
    HASEVENTSOURCE : number;
    /** Reference type */
    HASTYPEDEFINITION : number;
    /** Reference type */
    HASEVENTHISTORY : number;
    /** Reference type */
    AGGREGATES : number;
    /** Reference type */
    HASSUBTYPE : number;
    /** Reference type */
    HASPROPERTY : number;
    /** Reference type */
    HASCOMPONENT : number;
    /** Reference type */
    HASNOTIFIER : number;
    /** Reference type */
    HASCONDITION : number;


    /* Modelling Rules */

    MODELLINGRULE_MANDATORY : number;
    MODELLINGRULE_MANDATORYSHARED : number;


    /* Data Types */

    /** Data Type */
    BOOLEAN : number;
    SBYTE : number;
    BYTE : number;
    /** Data Type */
    INT16 : number;
    /** Data Type */
    UINT16 : number;
    /** Data Type */
    INT32 : number;
    /** Data Type */
    UINT32 : number;
    INT64 : number;
    UINT64 : number;
    /** Data Type */
    FLOAT : number;
    /** Data Type */
    DOUBLE : number;
    /** Data Type */
    STRING : number;
    BYTESTRING : number;
    XMLELEMENT : number;
    /** Data Type */
    DATETIME : number;


    /* Type Definitions */

    BASEVARIABLETYPE : string;
    FOLDERTYPE : string;


    /* Value Ranks */

    VALUERANK_SCALARORONEDIMENSION : number;
    VALUERANK_SCALARORANYDIMENSIONS : number;
    VALUERANK_SCALAR : number;
    VALUERANK_ANYDIMENSIONS : number;
    VALUERANK_ONEDIMENSION : number;


    /* Aggregate Functions */

    AGGREGATEFUNCTION_AVERAGE : number;
    AGGREGATEFUNCTION_TIMEAVERAGE : number;
    AGGREGATEFUNCTION_TOTAL : number;
    AGGREGATEFUNCTION_MINIMUM : number;
    AGGREGATEFUNCTION_MAXIMUM : number;
    AGGREGATEFUNCTION_COUNT : number;
}

interface Server {
    database : Database
}

/**
 * Parameter types for webMI server-side scripts
 */
declare namespace ScriptParameters {
    interface Alarm {
    }
    interface Boolean {
    }
    interface Http {
    }
    interface HttpIp {
    }
    interface HttpRequest {
        query : string;
        content : string;
        getvalues : Object;
        postvalues : Object;
    }
    interface HttpResponse {
    }
    interface Interval {
    }
    interface Node {
    }
    interface Number {
    }
    interface Once {
    }
    interface Startup {
    }
    interface Shutdown {
    }
    interface String {
    }
    interface Timer {
    }
}
declare function call( script : string, params : Object ) : any;

declare var server : Server;

declare var UaNode : UaNodeStatic;
