export const updateObjectInArrau = (items,itemId,objPropName,newObjProps) => {
   return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
} 