import moment = require("moment");
const fs = require('fs');
const path = require('path');

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');

export class ApiService {
  
  public readJsonFile = (path) => new Promise((resolve,reject) => fs.readFile(path, 'utf8', (err, data) => {
    if(data){
      resolve(JSON.parse(data))
    }else{
      reject(err)
    }
  }));

  public writeJsonFile = (path, id ,data) => new Promise( async (resolve,reject) => {
    const { admitterNote, status} = data
    const absences = await this.readJsonFile(path);
    absences['payload'].find( (dt, index) => {
      if(dt.id === parseInt(id)){
        dt.admitterNote = admitterNote;
        if(status === 'approve'){
          dt.confirmedAt = moment().toISOString()
        }else{
          dt.rejectedAt = moment().toISOString()
        }
      }
    });
    fs.writeFile(path, JSON.stringify(absences), 'utf8', (err) => {
      if (err)
        reject(err);
      else {
        resolve(absences);
      }
    })
  });

  public transformDate (absences, members) {
    const data = absences.payload.map( (data, index ) => {
      const memeberInformation = members.payload.find(o => o.userId === data.userId);
      const numberOfDaysOff = moment(data.endDate).diff(moment(data.startDate),'days');
      data.status = data.confirmedAt ? 'Confirmed' : ( data.rejectedAt ? 'Rejected' : 'Requested');
      data.numberOfDays = numberOfDaysOff > 0 ? numberOfDaysOff : 1;
      return { ...data, ...{ name : memeberInformation.name, image : memeberInformation.image, userId : memeberInformation.userId }}
    });
    return data
  }

  public async getAll(): Promise<any> {
    const absences = await this.readJsonFile('D:/WorkSpace/nestjs/frontend-coding-challenge/backend/src/json_files/absences.json');
    const members = await this.readJsonFile('D:/WorkSpace/nestjs/frontend-coding-challenge/backend/src/json_files/members.json');
    const transformedDate = await this.transformDate(absences,members);
    return transformedDate;
  }

  public updateById =  (id, reqUser) => new Promise( async (resolve) => {
    const updatedRecords = await this.writeJsonFile('D:/WorkSpace/nestjs/frontend-coding-challenge/backend/src/json_files/absences.json',id,reqUser)
    resolve(updatedRecords);
  })

  public async filter(reqUser : any): Promise<any> {
    const data = await this.getAll();
    const filteredRecords= data.filter( (dt,index) => {
      if(reqUser.type === 'all'){
        return (new Date(dt.startDate) >= new Date(reqUser.startDate) && new Date(dt.endDate) <= new Date(reqUser.endDate))
      }
      return ( (new Date(dt.startDate) >= new Date(reqUser.startDate) && new Date(dt.endDate) <= new Date(reqUser.endDate)) && dt.type === reqUser.type)
    });

    return filteredRecords;
  }   
}
