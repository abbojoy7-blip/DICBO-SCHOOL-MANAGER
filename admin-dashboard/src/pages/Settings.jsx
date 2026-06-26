import DemoPage from '../components/DemoPage';

const settingsSeed = [
  { id: 'set1', section: 'General', setting: 'School name', value: 'DICBO School', status: 'Configured' },
  { id: 'set2', section: 'Finance', setting: 'Currency', value: 'UGX', status: 'Configured' },
  { id: 'set3', section: 'Region', setting: 'Timezone', value: 'EAT', status: 'Configured' }
];

export default function Settings() {
  return (
    <DemoPage
      title="System settings"
      description="Adjust core organizational preferences and deployment details without leaving the admin workspace."
      storageKey="settings"
      seedData={settingsSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'section', label: 'Section' },
        { key: 'setting', label: 'Setting' },
        { key: 'value', label: 'Value' },
        { key: 'status', label: 'Status' }
      ]}
    />
  );
}
