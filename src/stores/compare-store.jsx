import { create } from "zustand";



const useCompareStore = create((set,get)=>({
    items : [],
    isOpen : false,
    addItem: (newItem) => {
        const {items} = useCompareStore.getState()
        if(items.length < 3){
            const filterArr = items.filter(item=>item.room.id === newItem.room.id)
            if(filterArr.length === 0){
                set({items : [...items, newItem] , isOpen : true})
            }
        }
    },
    clearItem : ()=>{
        set({items : []})
    },
    deleteItem : (index)=>{
        const {items} = useCompareStore.getState()
        if(items.length > 0){
            const newArr = [...items]
            newArr.splice(index,1)
            set({items : newArr})
        }
    },
    setOpen : (bool)=>{
        set({isOpen : bool})
    }
}))


export default useCompareStore