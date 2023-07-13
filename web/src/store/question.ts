import {create} from 'zustand'

export type Actions = {
    setQuestion: (question: string) => void 
};

export type UseQuestionType = {question: string} & Actions;

export const useQuestion = create<UseQuestionType>()((set) => ({
    question: "이런 거 저런 거",
    setQuestion: (question: string) => {
        set((state) => ({
            question: question,
        }))
    },
}));