import {create} from 'zustand'
import { PostType } from '../types/post.type';
import { AlarmType } from '../types/alarm.type';

export type State = {
    alarms: AlarmType[];
};

export type Actions = {
    setAlarms: (alarms: AlarmType[]) => void 
};

export type UseAlarmsType = State & Actions;


export const usePost = create<UseAlarmsType>()((set) => ({
    alarms: [],
    setAlarms: (alarms) => {
        set((state) => ({
            alarms: alarms,
        }))
    },
}));