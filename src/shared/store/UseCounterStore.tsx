import { create } from "zustand"

type CounterStore = {
    counter: number
    increment: ()=> void
    duplicate: ()=> void
    rest: ()=> void
    divide: ()=> void
}

export const UseCounterStore = create<CounterStore>((set)=>({
    counter: 0,
    increment: () => set((state)=> ({ counter: state.counter + 1})),
    duplicate: () => set((state)=> ({counter: state.counter * 2})),
    rest: () => set((state)=> ({counter: state.counter - 1})),
    divide: () => set((state)=> {
        if(state.counter == 0) {
            return{ counter: 0}
        }else{
            return{counter: state.counter / 2}
        }
    })
}))

