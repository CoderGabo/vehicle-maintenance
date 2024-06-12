export interface BaseFiltersModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onApplyFilters: (filters: any) => void;
    children?: React.ReactNode;
    allowedYears: number[];
    resetFilters: () => void;
    onRemoveFilters: () => void;
}