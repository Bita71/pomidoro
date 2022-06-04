 const formatDate = (date: number = Date.now()) => new Date(date).toISOString().slice(0, 10);

 export default formatDate