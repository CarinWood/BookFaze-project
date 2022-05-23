import { FC } from 'react'
import './menu.css'
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

interface Props {
    foldDelete: (id: string) => void
    foldMenuFunc: () => void
    id: string
    showEditWindow: () => void
}

const Menu:FC<Props> = ({foldDelete, foldMenuFunc, id, showEditWindow}) => {

    const deleteFunc = () => {
        foldDelete(id)
        foldMenuFunc()
    }


  return (
    <div className='menu'>
        <p className='menu-delete' onClick={() => deleteFunc()}><BsTrash className='trash-icon'/> Delete </p>
        <p className='menu-edit' onClick={() => showEditWindow()}><AiOutlineEdit className='edit-icon'/>Edit</p>
    </div>
  )
}

export default Menu