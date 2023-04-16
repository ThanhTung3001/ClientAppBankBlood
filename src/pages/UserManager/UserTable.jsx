import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillPlusSquare } from "react-icons/ai";

export const UserTable = ({data}) => {
  return (
    (data.map((e, index) => {
        return (
            <Table.Row key={e.userName}>
                <Table.Cell>
                    {index + 1}
                </Table.Cell>
                <Table.Cell>{e.userName}</Table.Cell>
                <Table.Cell>{e.email}</Table.Cell>
                <Table.Cell>{e.roles.join(", ")}</Table.Cell>
                <Table.Cell>
                    <div className="flex justify-around">
                        <AiFillEye color='#7bc043' className='hover: cursor-pointer' onClick={() => handlerOpenView(e)} />
                        <AiFillEdit color='#3b7dd8' className='hover: cursor-pointer ' onClick={() => handlerOpenEdit(e)} />
                        <AiFillDelete color='#cc2a36' className='hover: cursor-pointer ' onClick={() => { setDataModalEdit(e); setShowModalDelete(true) }} />

                    </div>
                </Table.Cell>
            </Table.Row>
            
        )
    }))
  )
}
