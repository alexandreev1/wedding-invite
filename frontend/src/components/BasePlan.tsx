import { memo } from 'react';
import { clsx } from 'clsx';
import { TABLES } from '../shared/constants';
import { Table } from './Table';
import { useWeddingStore } from '../store/useWeddingStore';
import '../styles/BasePlan.less';

function BasePlan({ editing = false }: { editing: boolean }) {
    const { seatedGuests } = useWeddingStore();

    return (
        <div className={clsx('BasePlan', editing && 'BasePlan__editMode')}>
            <div className="BasePlan__mainTable rounded-md border border-slate-300 bg-white flex items-center justify-center">
                <span className="text-xs font-light tracking-[0.2em] text-slate-700 uppercase">
                    Президиум
                </span>
            </div>
            <div className="flex w-full justify-center">
                <div className="flex BasePlan__tables">
                    {TABLES.map((table) => (
                        <Table
                            key={table.id}
                            table={table}
                            seatedGuests={seatedGuests?.filter((g) => g.tableId === table.id) || []}
                            editing={editing}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(BasePlan);
