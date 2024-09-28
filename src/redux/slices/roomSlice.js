import { createSlice } from '@reduxjs/toolkit';
import data from '../../../public/db.json'

const initialState = {
    rooms: data.rooms_by_serial_no[0].rooms || [],
    filteredRoom: {}
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        filterRooms: (state, action) => {
            // console.log(state.rooms[0], action);
            // const temp = [];
            // temp.find()
            // const filteredRoom = state.rooms.find((room) => room.room_type_code == action.payload);
            const filteredRoom = state.rooms.find((room) => room.room_type_code == action.payload);

            // console.log(filteredRoom, action.payload);
            // if (filteredRoom) {
            state.filteredRoom = filteredRoom;
            // }
        }
    }
});
export const { filterRooms } = roomSlice.actions;
export default roomSlice.reducer;