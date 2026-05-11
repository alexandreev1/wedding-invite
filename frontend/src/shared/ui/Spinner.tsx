import { useWeddingStore } from "../../store/useWeddingStore";

export const FullScreenLoader = () => {
    const isLoading = useWeddingStore((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-900/10 backdrop-blur-[2px] transition-all">
            <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl shadow-xl border border-stone-100">
                {/* Анимированное кольцо */}
                <div className="w-10 h-10 border-4 border-stone-200 border-t-yellow-500 rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Синхронизация...
                </span>
            </div>
        </div>
    );
};
