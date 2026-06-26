import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const routes = [
  { id: 'tr1', name: 'North Loop', stops: '5', status: 'Active' },
  { id: 'tr2', name: 'West Route', stops: '4', status: 'Delayed' }
];

const vehicles = [
  { id: 'tv1', plate: 'UBB 123A', driver: 'Tom Driver', status: 'Ready' }
];

const drivers = [
  { id: 'td1', name: 'Tom Driver', phone: '+256778000999', status: 'On duty' }
];

const assignments = [
  { id: 'ta1', student: 'John Doe', route: 'North Loop', pickup: '06:45', status: 'Assigned' }
];

const statusSeed = [
  { id: 'ts1', route: 'North Loop', vehicle: 'UBB 123A', status: 'On time' }
];

export default function TransportPortal(){
  return (
    <div>
      <RolePortalDashboard title="Transport Portal" subtitle="Manage transport routes, vehicle deployment, drivers, student assignments, and daily status in one transport command center." badge="● Transport workspace • Demo mode" stats={[{label:'Routes',value:'4',delta:'2 active'},{label:'Vehicles',value:'6',delta:'1 spare'},{label:'Drivers',value:'5',delta:'4 on shift'},{label:'Assignments',value:'38',delta:'2 pending'}]} chartData={[{name:'Mon',value:90},{name:'Tue',value:92},{name:'Wed',value:88},{name:'Thu',value:94},{name:'Fri',value:91}]} recent={[{title:'Route update',detail:'North Loop running on time',date:'Today'},{title:'Vehicle due',detail:'Vehicle UBB 123A checked',date:'Yesterday'}]} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="Routes" description="Manage school transport routes" storageKey="transport-routes" seedData={routes} columns={[{key:'name',label:'Route'},{key:'stops',label:'Stops'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Vehicles" description="Track available buses and vans" storageKey="transport-vehicles" seedData={vehicles} columns={[{key:'plate',label:'Plate'},{key:'driver',label:'Driver'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Drivers" description="Driver assignments and availability" storageKey="transport-drivers" seedData={drivers} columns={[{key:'name',label:'Driver'},{key:'phone',label:'Phone'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Student Assignments" description="Route and pickup assignment status" storageKey="transport-assignments" seedData={assignments} columns={[{key:'student',label:'Student'},{key:'route',label:'Route'},{key:'pickup',label:'Pickup'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Daily Transport Status" description="Live operational summary" storageKey="transport-status" seedData={statusSeed} columns={[{key:'route',label:'Route'},{key:'vehicle',label:'Vehicle'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
