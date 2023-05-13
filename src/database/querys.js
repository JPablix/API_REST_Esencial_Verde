export const queries = {    
    getAllContainers: 'SELECT * FROM containers',
    getContainersByWaste: 'EXEC GetUnusedContainersForWasteType @wasteTypeId = @Id',
}