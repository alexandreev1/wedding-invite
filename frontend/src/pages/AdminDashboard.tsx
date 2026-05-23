import { useEffect, useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { useWeddingStore } from '../store/useWeddingStore';
import SittingPlan from '../components/SittingPlan';
import SurveyTable from '../components/SurveyTable';
import '../styles/AdminDashboard.less';

const AdminDashboard = () => {
    const [segmentedControlValue, setSegmentedControlValue] = useState('sittingPlan');
    const { fetchInvitations } = useWeddingStore();

    useEffect(() => {
        fetchInvitations();
    }, [fetchInvitations]);

    return (
        <div className="AdminDashboard">
            <SegmentedControl
                className="AdminDashboard__segmentedControl"
                value={segmentedControlValue}
                onChange={setSegmentedControlValue}
                data={[
                    { label: 'Рассадка', value: 'sittingPlan' },
                    { label: 'Опрос', value: 'survey' },
                ]}
            />
            {segmentedControlValue === 'sittingPlan' && <SittingPlan />}
            {segmentedControlValue === 'survey' && <SurveyTable />}
        </div>
    );
};

export default AdminDashboard;
