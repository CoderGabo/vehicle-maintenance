export interface GananciaFiltersModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onApplyFilters: (filters: any) => void;
    onRemoveFilters: () => void;
}