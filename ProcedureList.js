class ProcedureList{
    constructor(
        procedureName,
        procedureId,
        procedureOrderId,
        totalSequeceCount,
        sequenceIdList,
        sequnenceList,
        cautionType
    ){
        this.procedureName = procedureName,
        this.procedureId = procedureId,
        this.procedureOrderId = procedureOrderId,
        this.totalSequeceCount = totalSequeceCount,
        this.sequenceIdList = sequenceIdList,
        this.sequnenceList = sequnenceList,
        this.cautionType = cautionType
    }
}
module.exports = ProcedureList;