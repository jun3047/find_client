import {create} from 'zustand'
import { AlarmType } from '../types/alarm.type';

export type State = {
    alarms: AlarmType[];
};

export type Actions = {
    setAlarms: (alarms: AlarmType[]) => void 
};

export type UseAlarmsType = State & Actions;


export const useAlarms = create<UseAlarmsType>()((set) => ({
    alarms: [],
    setAlarms: (alarms) => {
        console.log('setAlarms');
        console.log(alarms);
        
        set((state) => ({
            alarms: alarms,
        }))
    },
}));