export interface ServiceFiltersModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onApplyFilters: (filters: any) => void;
    onRemoveFilters: () => void;
}