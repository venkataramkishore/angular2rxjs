export const URLConfig = {
    DEV_HOST_URL: `http://localhost:8080/ABFUsers`,
    PROD_HOST_URL: `http://sogeti-abf-sogeti-abf.openshift.sogeticloudservices.com`,
    LOGIN_URL: `/login/authenticate`,
    REGISTER_URL: `/register/create`,
    CONTRACT: {
        ALL: `/contract/all`,
        ALL_ACTIVE: `/contract/active`,
        UPDATE: `/contract/update`,
        DELETE: `/contract/delete/P_C`,
        CREATE: `/contract/create`,
        FIND_BY_ID: `/resourcetype/find/P_C`
    },
    RESOURCE_TYPE: {
        ALL: `/resourcetype/all`,
        ALL_ACTIVE: `/resourcetype/active`,
        UPDATE: `/resourcetype/update`,
        DELETE: `/resourcetype/delete/P_RT`,
        CREATE: `/resourcetype/create`,
        FIND_BY_ID: `/resourcetype/find/P_RT`
    },
    BUSINESS_LINE: {
        ALL: `/businessline/all`,
        ALL_ACTIVE: `/businessline/active`,
        UPDATE: `/businessline/update`,
        DELETE: `/businessline/delete/P_BL`,
        CREATE: `/businessline/create`,
        FIND_BY_ID: `/businessline/find/P_BL`,
        RESOURCE_TYPE: `/businessline/resourceType/P_RT`,
        RESOURCE_TYPE_SKILL: `/businessline/resourceType/P_RT/skill/P_SK`
    },
    SKILL: {
        ALL: `/skill/all`,
        ALL_ACTIVE: `/skill/active`,
        UPDATE: `/skill/update`,
        DELETE: `/skill/delete/P_SK`,
        CREATE: `/skill/create`,
        FIND_BY_ID: `/skill/find/P_SK`
    },
    ROLE: {
        ALL: `/role/all`,
        ALL_ACTIVE: `/role/active`,
        UPDATE: `/role/update`,
        DELETE: `/role/delete/P_RO`,
        CREATE: `/role/create`,
        FIND_BY_ID: `/role/find/P_RO`
    },
    GRADE: {
        ALL: `/grade/all`,
        ALL_ACTIVE: `/grade/active`,
        UPDATE: `/grade/update`,
        DELETE: `/grade/delete/P_G`,
        CREATE: `/grade/create`,
        FIND_BY_ID: `/grade/find/P_G`
    },
    BAND: {
        ALL: `/band/all`,
        ALL_ACTIVE: `/band/active`,
        UPDATE: `/band/update`,
        DELETE: `/band/delete/P_B`,
        CREATE: `/band/create`,
        FIND_BY_ID: `/band/find/P_B`
    },
    STATUS: {
        ALL: `/status/all`,
        ALL_ACTIVE: `/status/all`,
        UPDATE: `/status/update`,
        DELETE: `/status/delete/P_ST`,
        CREATE: `/status/create`,
        FIND_BY_ID: `/status/find/P_ST`
    },
    FIXED_HOURS: {
        ALL: `/fixedCost/all`,
        ALL_ACTIVE: `/fixedCost/active`,
        UPDATE: `/fixedCost/update`,
        DELETE: `/fixedCost/delete/P_FC`,
        CREATE: `/fixedCost/create`,
        FIND_BY_ID: `/fixedCost/find/P_FC`,
        CONTRACT_FIXED_HOURS: `/fixedContract/contract/find/P_FC`
    },
    ONSHORE_PRICE: {
        ALL: `/onshorePrice/all`,
        ALL_ACTIVE: `/onshorePrice/active`,
        UPDATE: `/onshorePrice/update`,
        DELETE: `/onshorePrice/delete/`,
        CREATE: `/onshorePrice/create`,
        FIND_BY_ID: `/onshorePrice/find/P_ON_P`,
        FIND_PRICE: `/onshorePrice/find/P_BL/P_RO/P_G`
    },
    OFFSHORE_PRICE: {
        ALL: `/offshorePrice/all`,
        ALL_ACTIVE: `/offshorePrice/active`,
        UPDATE: `/offshorePrice/update`,
        DELETE: `/offshorePrice/delete/P_OFFP`,
        CREATE: `/offshorePrice/create`,
        FIND_BY_ID: `/offshorePrice/find/P_OFFP`,
        FIND_PRICE: `/offshorePrice/find/P_BL/P_B/P_ST`
    },
    USER_ROLE: {
        ALL: `/resourcetype/all`,
        ALL_ACTIVE: `/resourcetype/active`,
        UPDATE: `/resourcetype/update`,
        DELETE: `/resourcetype/delete/P_UR`,
        CREATE: `/resourcetype/create`,
        FIND_BY_ID: `/resourcetype/find/P_UR`
    },
    STAY_TYPE: {
        ALL: `/stayType/all`,
        ALL_ACTIVE: `/stayType/active`,
        UPDATE: `/stayType/update`,
        DELETE: `/stayType/delete/P_UR`,
        CREATE: `/stayType/create`,
        FIND_BY_ID: `/stayType/find/P_UR`
    }
};
