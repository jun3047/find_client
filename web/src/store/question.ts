import {create} from 'zustand'

export type Actions = {
    setQuestion: (question: string) => void 
};

export type UseQuestionType = {question: string} & Actions;

export const useQuestion = create<UseQuestionType>()((set) => ({
    question: "?로 질문을 선택해봐요!",
    setQuestion: (question: string) => {

        alert(`${question}이라는 질문이 왔어요`)

        set((state) => ({
            question: question,
        }))
    },
}));