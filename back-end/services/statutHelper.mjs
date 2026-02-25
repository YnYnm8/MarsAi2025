
// Status film
export const getStatusDetails = (status) => {
    let label = "";
    let classes = "";

    if (status === 'selected') {
        label = "SELECTED";
        classes = "bg-emerald-400 text-emerald-600 border-emerald-200";
    } else if (status === 'rejected') {
        label = "REJECTED";
        classes = "bg-red-100 text-rose-600 border-rose-200";
    } else if (status === 'pending') {
        label = "PENDING";
        classes = "bg-amber-100 text-amber-600 border-amber-200";
    } 
    return { label, classes };
};