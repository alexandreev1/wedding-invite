import { create } from 'zustand';
import type { IGuestFormResult } from '../types/wedding';
import { getInitialGuestFormData } from '../shared/utils';
import type { GUEST_FORM_ITEMS } from '../shared/constants';

interface SurveyStore {
    formData: IGuestFormResult;
    isDirty: boolean;

    initForm: (initialData: IGuestFormResult) => void;

    // Для полей верхнего уровня (например, радио-кнопок)
    updateBaseField: <K extends keyof IGuestFormResult>(key: K, value: IGuestFormResult[K]) => void;

    // Для вложенных полей внутри checkbox-групп
    updateNestedField: <
        G extends GUEST_FORM_ITEMS.BUFFET | GUEST_FORM_ITEMS.BANQUET,
        K extends keyof IGuestFormResult[G],
    >(
        group: G,
        key: K,
        value: IGuestFormResult[G][K],
    ) => void;

    resetForm: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
    formData: getInitialGuestFormData(),
    isDirty: false,

    initForm: (initialData) =>
        set({
            formData: initialData,
            isDirty: false,
        }),

    updateBaseField: (key, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [key]: value,
            },
            isDirty: true,
        })),

    updateNestedField: (group, key, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [group]: {
                    ...state.formData[group],
                    [key]: value,
                },
            },
            isDirty: true,
        })),

    resetForm: () =>
        set({
            formData: getInitialGuestFormData(),
            isDirty: false,
        }),
}));
