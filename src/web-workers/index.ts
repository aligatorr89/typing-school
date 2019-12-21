import {  AnalyticsResultHelp } from '../app/shared/AnalyticsResult';
import IDB from '../app/shared/IndexedDb';
import * as IDBQueries from '../app/shared/TypingSchoolIndexedDbQueries';
import { IAppWorker } from '../app/shared/WebWorker';

const worker: IAppWorker = self as any;

worker.onmessage = (event) => {
  const eventData = event.data;
  IDB.instance.then(() => {
    switch (eventData.name) {
      case 'analytics':
        event.stopPropagation();
        const result = AnalyticsResultHelp.analyze(eventData.data, eventData.appSettings);
        return IDB.insertData('analytics', result).then((res) => {
          result.id = res;
          return worker.postMessage({...eventData, ...{data: result}});
        });
      case 'words':
        event.stopPropagation();
        IDB.insertData('words', {...eventData.data, ...eventData.appSettings});
        return worker.postMessage(eventData);
      case 'getLast100Rows':
        event.stopPropagation();
        return IDBQueries.getLast100Results(IDB.db, eventData.appSettings)
        .then((res) => worker.postMessage({...eventData, ...{data: res}}));
      case 'getRowById':
        event.stopPropagation();
        return IDBQueries.getRowById(IDB.db, eventData.appSettings, eventData.data.id)
        .then((res) => worker.postMessage({...eventData, ...{data: res}}));
      case 'getAllRows':
        event.stopPropagation();
        return IDBQueries.getAllData(IDB.db)
        .then((res) => worker.postMessage({...eventData, ...{data: res}}));
      case 'test':
        setTimeout(() => {
          worker.postMessage({...eventData});
        }, 10000);
      default: return;
    }
  });
};
