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
    /**
     * See UaNode.BROWSEDIRECTION_*
     * Defaults to forward.
     */
    direction? : number;

    /**
     * Reference type, for example UaNode.PROPERTY
     * Defaults to UaNode.HIERARCHICALREFERENCES.
     */
    reference? : string;

    /**
     * Specifies if subtypes of the reference type are included in browse.
     * Defaults to true.
     */
    subtype? : boolean;

    /**
     * Only return nodes of this node class. See UaNode.NODECLASS_*
     * Defaults to UaNode.NODECLASS_UNSPECIFIED
     */
    nodeclass? : number;

    /**
     * Specifies the maximum number of the results to return.
     * If recursive is TRUE then it is set to 0. 0 means no limit.
     * Defaults to 0.
     */
    maxresult? : number;

    /**
     * Only return nodes with this type definition (e.g. ObjectTypes.PROJECT.MyObjectType).
     *
     * IMPORTANT NOTE: According to the documentation, the default value is null. This is not correct. As soon as the
     * key exists (e.g. {typedefinition: null} or even {typedefinition: undefined}), its value is used for matching
     * the type definition. If null or undefined is used, NO RESULT AT ALL WILL BE RETURNED.
     *
     * See also UaNode.BASEVARIABLETYPE or UaNode.FOLDERTYPE
     */
    typedefinition? : string;

    /**
     * Used in conjunction with typedefinition and nodeclass.
     * If TRUE then all reachable nodes will be searched otherwise only direct referenced nodes.
     * Defaults to false.
     */
    recursive? : boolean;

    /**
     * If recursive is True then do not browse on branch of Objects and Variables with the specified types.
     * Defaults to []
     */
    exclude? : string[];
}

interface BrowseResultItem {
    node : UaNode;
    reference : UaNode;
    isforward : boolean;
}

interface CreateArgs {

    /** Node class, e.g. UaNode.NODECLASS_VARIABLE */
    nodeclass : number;

    /**
     * Type definition. Can be one of the pre-defined types (UaNode.BASEVARIABLETYPE or UaNode.FOLDERTYPE),
     * or a node ID of an existing Atvise or custom object type. For example, VariableTypes.ATVISE.Display for displays,
     * or ObjectTypes.PROJECT.MyOwnObjectType for a custom type.
     */
    typedefinition : number;

    /** Node ID of the parent node */
    parent : string;

    /**
     * Type of the reference to the parent node. Defaults to UaNode.HASCOMPONENT.
     */
    reference? : string;

    /**
     * Describes if instances of this node should be shared amongst each other. Defaults to NULL.
     * When a parent is an Object Type, creating an instance of it does the following to this node:
     * – NULL: Node is not created in the instance
     * – UaNode.MODELLINGRULE_MANDATORY: Node is created in the instance as well
     * – UaNode.MODELLINGRULE_MANDATORYSHARED: Node is created in the instance and shared amongst all instances,
     * i.e. it is created as reference to the OT's node. All instances see the same value.
     */
    modellingrule? : string;

    /** Defaults to last part of the node ID (after the last dot). */
    browsename? : string;

    browsenamens? : number;

    /** Custom human-readable display name for this node. Defaults to last part of the node ID. */
    displaysname? : string;

    displaysnamelocale? : string;

    /** Description */
    description? : string;
}

/**
 * For node classes Variable and VariableType, value and datatype are mandatory.
 */
interface CreateVarArgs extends CreateArgs {
    /** Data type of the variable, e.g. UaNode.INT32 */
    datatype : string;
    /** Value of the variable */
    value : any;
    /** Dimension of the variable, defaults to UaNode.VALUERANK_SCALAR */
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
     * Creates a UaNode specified by the UaNodeID.
     *
     * Possible return values:
     * Node created: 0
     * Node exists and was not created: 0
     * Node created, but value did not match data type: 0
     */
    create( obj : CreateArgs|CreateVarArgs ) : number;

    /**
     * Removes the UaNode. Returns the status of the operation.
     *
     * Returns 0 on success, or another number when the node could not be deleted,
     * e.g. because it did not exist.
     */
    remove() : number;

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
