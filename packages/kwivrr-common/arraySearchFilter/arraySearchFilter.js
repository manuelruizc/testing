function arraySearchFilter(data, searchTerm) {
    if (!data) return null;
    
    const newData = data.filter(o => {
        return Object.keys(o).some(k => {
            const value = String(o[k])
            return value.toLowerCase().includes(searchTerm.toLowerCase())
        });
    });
    
    return newData;
}

export default arraySearchFilter;
