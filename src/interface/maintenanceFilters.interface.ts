export interface MaintenanceFiltersModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onApplyFilters: (filters: any) => void;
    onRemoveFilters: () => void;
}