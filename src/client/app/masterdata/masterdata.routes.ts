import { Routes } from '@angular/router';
import { ResourceTypeRoutes, BandRoutes, BusinessLineRoutes, GradeRoutes,
        OffshorePriceRoutes, OnshorePriceRoutes, RoleRoutes, SkillRoutes,
        StatusRoutes, UserRoleRoutes} from './index';

export const MasterDataRoutes: Routes = [
    ...ResourceTypeRoutes,
    ...BandRoutes,
    ...BusinessLineRoutes,
    ...GradeRoutes,
    ...OffshorePriceRoutes,
    ...OnshorePriceRoutes,
    ...RoleRoutes,
    ...SkillRoutes,
    ...StatusRoutes,
    ...UserRoleRoutes
    /*{
        path: 'resourcetypes',
        loadChildren: '/app/masterdata/resourcetype/resourcetype.module#ResourceTypeModule'
    },
    {
        path: 'grades',
        loadChildren: '/app/masterdata/grade/grade.module#GradeModule'
    },{
        path: 'roles',
        loadChildren: '/app/masterdata/role/roles.module#RoleModule'
    },{
        path: 'skills',
        loadChildren: '/app/masterdata/skill/skill.module#SkillModule'
    },{
        path: 'businesslines',
        loadChildren: '/app/masterdata/businessline/businessline.module#BusinessLineModule'
    },{
        path: 'bands',
        loadChildren: '/app/masterdata/band/band.module#BandModule'
    },{
        path: 'offshoreprices',
        loadChildren: '/app/masterdata/offshoreprices/offshoreprices.module#OffshorePriceModule'
    },{
        path: 'onshoreprices',
        loadChildren: '/app/masterdata/onshoreprice/onshoreprice.module#OnshorePriceModule'
    },{
        path: 'status',
        loadChildren: '/app/masterdata/status/status.module#StatusModule'
    },{
        path: 'stay',
        loadChildren: '/app/masterdata/staytype/stay.module#StayModule'
    },{
        path: 'userroles',
        loadChildren: '/app/masterdata/userrole/userrole.module#UserRoleModule'
    }*/
];
