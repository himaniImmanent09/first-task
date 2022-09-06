import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { deleteDataAPI } from '../Api/Api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
};


export default function DeleteComponent(data) {
    let id = data.data

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = (id) => {

        deleteDataAPI(`delete/${id}`)
        handleClose()
    }

    return (
        <div>
            <button className='btn btn-danger' onClick={handleOpen}>Delete</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-modify shadow rounded' style={style}>
                    <h4 className='m-3'>
                        Are you sure you want to delete..?
                    </h4>
                    <button onClick={() => handleDelete(id)} className='btn btn-danger ms-3 mb-3'>Yes</button>
                    <button onClick={handleClose} className='btn btn-primary ms-3 mb-3'>No</button>

                </div>
            </Modal>
        </div>
    );
}
