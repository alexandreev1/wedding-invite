import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import { Armchair, TableProperties } from 'lucide-react';
import { useWeddingStore } from '../store/useWeddingStore';
import SittingPlan from '../components/SittingPlan';
import SurveyTable from '../components/SurveyTable';
import '../styles/AdminDashboard.less';

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState<string | null>('sittingPlan');
    const { fetchInvitations } = useWeddingStore();

    useEffect(() => {
        fetchInvitations();
    }, [fetchInvitations]);

    return (
        <Tabs value={selectedTab} onChange={setSelectedTab}>
            <Tabs.List>
                <Tabs.Tab value="sittingPlan" leftSection={<Armchair size={16} />}>
                    Рассадка
                </Tabs.Tab>
                <Tabs.Tab value="survey" leftSection={<TableProperties size={16} />}>
                    Опрос
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="sittingPlan">
                <SittingPlan />
            </Tabs.Panel>
            <Tabs.Panel value="survey">
                <SurveyTable />
            </Tabs.Panel>
        </Tabs>
    );
};

export default AdminDashboard;
