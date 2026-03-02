export const getStatusDetails = (statusOrId) => {
    // On force la conversion en nombre si c'est possible pour éviter les conflits string/number
    const value = !isNaN(statusOrId) ? Number(statusOrId) : statusOrId;

    switch (value) {
        case 2:
        case 'selected':
            return { 
                label: "SELECTED", 
                classes: "bg-emerald-400 text-emerald-600 border-emerald-200",
                id: 2 
            };
        case 3:
        case 'rejected':
            return { 
                label: "REJECTED", 
                classes: "bg-red-100 text-rose-600 border-rose-200",
                id: 3
            };
        case 4:
        case 'pending':
            return { 
                label: "PENDING", 
                classes: "bg-amber-100 text-amber-600 border-amber-200",
                id: 4
            };
        default:
            return { 
                label: "SUBMITTED", 
                classes: "bg-blue-50 text-blue-600 border-blue-200",
                id: 1 
            };
    }
};