import DemoPage from '../components/DemoPage';

const inventorySeed = [
  { id: 'inv1', item: 'Projector', quantity: '4', status: 'In stock' },
  { id: 'inv2', item: 'Whiteboards', quantity: '2', status: 'Low stock' },
  { id: 'inv3', item: 'Laptops', quantity: '12', status: 'In stock' }
];

export default function Inventory() {
  return (
    <DemoPage
      title="Inventory & assets"
      description="Track campus resources, stock counts, and replenishment needs with one operational view."
      storageKey="inventory"
      seedData={inventorySeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'item', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'In stock' ? 'badge badge-success' : 'badge badge-warning'}>{value}</span> }
      ]}
    />
  );
}
